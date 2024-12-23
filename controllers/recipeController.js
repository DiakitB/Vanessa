const asyncHandler = require("express-async-handler");
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// const { Upload } = require("@aws-sdk/lib-storage");
const Recipe = require("../models/recipeModel");
const multerS3 = require('multer-s3');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const Bookmark = require("../models/bookmarkModel");
const aws = require('aws-sdk');
const { body, validationResult } = require("express-validator");
const multer = require('multer');



// create a storage object that store file in pyblic/data/uploads
 











exports.index = asyncHandler(async (req, res) => {

 

  res.render("index");
});

// exports.index = asyncHandler(async (req, res) => {
//   res.render("index");
// });
// create a search function that takes a search query and return a list of recipes that title contains the search query
exports.searchRecipe = asyncHandler(async (req, res) => {
  const search = req.query.search;
 
  const recipes = await Recipe.find({ title: { $regex: search, $options: "i" } });
  if (!recipes) {
    res.send("no recipes found");
  }
  res.render("recipes", { recipes: recipes });
});






exports.recipes = asyncHandler(async (req, res) => {

  
  
  res.render("recipesView");
});

///create a function that takes a recipe and bookmaks it



exports.getRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
 
  res.render("show", { recipe: recipe });
});

exports.createRecipe_get = asyncHandler(async (req, res) => {


  res.render("recipeForm");
});

// //////////////
// const { body, validationResult } = require('express-validator');
// const asyncHandler = require('express-async-handler');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { S3Client } = require('@aws-sdk/client-s3');
// const Recipe = require('./models/Recipe'); // Adjust the path as needed

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Create a multer instance with S3 storage
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

exports.createRecipe_post = [
  // File upload middleware
  upload.single('image'),

  // Validation middleware
  body('title')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Title is required'),
  body('ingredients')
    .isArray({ min: 1 })
    .withMessage('Ingredients are required'),
  body('instructions')
    .isArray({ min: 1 })
    .withMessage('Instructions are required'),
  body('servings')
    .trim()
    .isNumeric()
    .withMessage('Servings are required'),
  body('units')
    .isArray()
    .withMessage('Units must be an array'),

  // Middleware to log request body and file
  (req, res, next) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    next();
  },

  // Main handler
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Handle validation errors
      console.log('Validation Errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const image = req.file ? req.file.location : null; // Get the S3 URL of the uploaded image
    const { title, ingredients, units, instructions, servings } = req.body;

    // Ensure units array length matches ingredients array length
    if (units.length !== ingredients.length) {
      return res.status(400).json({ errors: [{ msg: 'Units array length must match ingredients array length' }] });
    }

    // Create a function that takes two arrays and merges them into one array of objects
    const ingredient = ingredients.map((ingredient, index) => {
      return { ingredient: ingredient, unit: units[index] };
    });

    const recipe = new Recipe({
      title,
      image,
      ingredients: ingredient,
      instructions,
      servings,
    });

    await recipe.save();
    res.redirect('/');
  }),
];

exports.updateRecipe_get = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render("update", { recipe: recipe });
});

exports.updateRecipe_post = asyncHandler(async (req, res) => {
  await Recipe.findByIdAndUpdate(req.params.id, req.body);
});

exports.updateRecipe_get = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render("update", { recipe: recipe });
});

exports.updateRecipe_post = asyncHandler(async (req, res) => {
  await Recipe.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

exports.deleteRecipe = asyncHandler(async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.redirect("/");
});


exports.getAllRecipes = asyncHandler(async (req, res) => {
  
   const recipes = await Recipe.find();
  //  console.log(recipes);
   // loop over the recipes and console.log image
    recipes.forEach((recipe) => {
      console.log(recipe.image);
    });
   res.render("recipes", { recipes: recipes });


});

exports.vanessaRouter = asyncHandler(async (req, res) => {

  res.render("vanessa");
});

exports.addRecipeToBookmarks = asyncHandler(async (req, res) => {

  const recipe = await Recipe.findById(req.params.id);
  const bookmarks = await Bookmark.find();
  const [bookmark] = bookmarks;

   // check if the recipe is already bookmarked
  const isBookmarked = bookmark.bookmarked.find((bookmarked) => bookmarked._id == req.params.id);
  if (isBookmarked) {
    return res.json({ success: false, message: 'Recipe already bookmarked' });
  }
  const bookMarkedRecipe = [...bookmark.bookmarked, recipe];
  bookmark.bookmarked = bookMarkedRecipe;
  
  await bookmark.save();
  
  res.json({ success: true, message: 'Recipe has been bookmarked successfully' });
});
// create a function that will take all the bookmarked recipes, group the ingredients by name and sum the quantity



// Configure AWS S3







