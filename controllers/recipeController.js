const asyncHandler = require("express-async-handler");
const Recipe = require("../models/recipeModel");
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const Bookmark = require("../models/bookmarkModel");
const aws = require('aws-sdk');
const { body, validationResult } = require("express-validator");
const multer = require('multer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: './config.env' });

exports.index = asyncHandler(async (req, res) => {
  res.render("index");
});

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

exports.getRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render("show", { recipe: recipe });
});

exports.createRecipe_get = asyncHandler(async (req, res) => {
  res.render("recipeForm");
});

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
    bucket: process.env.AWS_BUCKET_NAME, // Ensure this is set correctly
    // acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
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
    // console.log('Request Body:', req.body);
    // console.log('Uploaded File:', req.file);
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

    // Prepend the new recipe to the beginning of the array
    const recipes = await Recipe.find();
    recipes.unshift(recipe);
    await Recipe.deleteMany();
    await Recipe.insertMany(recipes);

    res.redirect('/kitchen/all-recipes');
  }),
];

exports.editRecipe_get = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).send('Recipe not found');
  }
  res.render('recipeForm', { recipe });
});

exports.editRecipe_post = async (req, res) => {
  console.log('Request Method:', req.method);
  console.log('Request Headers:', req.headers);
  console.log('THIS IS REQUEST BODY', req.body);

  const updatedRecipe = {
    title: req.body.title,
    image: req.file ? req.file.path : req.body.existingImage,
    instructions: req.body.instructions,
    servings: req.body.servings,
    ingredients: Array.isArray(req.body.ingredients) ? req.body.ingredients.map((ingredient, index) => ({
      ingredient,
      unit: req.body.units[index]
    })) : []
  };

  try {
    await Recipe.findByIdAndUpdate(req.params.id, updatedRecipe);
    req.flash('success', 'Recipe updated successfully');
    res.redirect('/kitchen/all-recipes');
  } catch (err) {
    req.flash('error', 'Error updating recipe');
    res.redirect(`/recipes/${req.params.id}/edit`);
  }
};

exports.deleteRecipe = asyncHandler(async (req, res) => {
  try {
    const recipeId = req.params.id;
    console.log('Deleting recipe with ID:', recipeId);
    const recipe = await Recipe.findByIdAndDelete(recipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found.' });
    }
    res.status(200).json({ success: true, message: 'Recipe deleted successfully!' });
  } catch (err) {
    console.error('Error deleting recipe:', err);
    res.status(500).json({ success: false, message: 'An error occurred while deleting the recipe.' });
  }
});

exports.getAllRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find();
  res.render("recipes", { recipes: recipes });
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