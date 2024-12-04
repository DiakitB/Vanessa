const asyncHandler = require("express-async-handler");

const Recipe = require("../models/recipeModel");

const Bookmark = require("../models/bookmarkModel");

const { body, validationResult } = require("express-validator");
const multer = require('multer');



// create a storage object that store file in pyblic/data/uploads
 const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/data/uploads');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
 });

console.log(storage);

const upload = multer({ storage: storage });








exports.index = asyncHandler(async (req, res) => {

 

  res.render("index");
});


// create a search function that takes a search query and return a list of recipes that title contains the search query
exports.searchRecipe = asyncHandler(async (req, res) => {
  const search = req.query.search;
  console.log(search);
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

//////////////
//////////////
exports.createRecipe_post = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name is required"),
  body("image")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("image is required"),
  body("ingredients")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Ingredients are required"),

  body("instructions")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("instructions are required"),
  body("servings").trim().isNumeric().withMessage("Servings are required"),

  upload.single('image'), (req, res, next) => {
  

 
  next();
 }
  ,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
   
  const image = req.file.originalname;
    const { title,  ingredients, units,  instructions, servings } =req.body;
   

    
    ///CREAT A FUNCTION THAT TAKES TWO ARRAYS AND MERGE THEM INTO ONE ARRAY OF OBJECTS
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
    res.redirect("/");
  }),
];


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
  res.render("recipes", { recipes: recipes });
});

exports.vanessaRouter = asyncHandler(async (req, res) => {

  res.render("vanessa");
});

exports.addRecipeToBookmarks = asyncHandler(async (req, res) => {
 console.log("add recipe to bookmarks");
  const recipe = await Recipe.findById(req.params.id);
 const bookmarks = await Bookmark.find();
//  console.log(typeof bookmarks);
//   console.log(bookmarks);
  const [bookmark] = bookmarks;
// check if the recipe is already in bookmark array if it is do not add it again and alert the user that the recipe is already in the bookmarks and redirect to /kitchen/recipe/:id
  const found = bookmark.bookmarked.find((ele) => ele._id == req.params.id);
  console.log(found);
  if (found) {
    req.flash('info', 'Flash Message Added');
    res.redirect(`/kitchen/recipe/${req.params.id}`);
    return;
  }
  
  const bookMarkedRecipe = [...bookmark.bookmarked, recipe];
  bookmark.bookmarked = bookMarkedRecipe;
  await bookmark.save();
  
 
  res.redirect(`/kitchen/recipe/${req.params.id}`);
});
