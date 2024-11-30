const asyncHandler = require("express-async-handler");

const Recipe = require("../models/recipeModel");
const ingredient = require("../models/ingredientModel");
const unit = require("../models/unitModel");
const { body, validationResult } = require("express-validator");
const multer = require('multer');
const upload = multer({dest: '/public/images/'});
exports.index = asyncHandler(async (req, res) => {
 console.log("index route");
 

  res.render("index");
});




//create controllers for the following: getRecipe, createRecipe_get, createRecipe_post, updateRecipe_get, updateRecipe_post, deleteRecipe
exports.getAllRecipes = asyncHandler(async (req, res) => {

  const recipes = await Recipe.find();
  console.log(recipes);
  res.render("recipesView", { recipes: recipes });
});

exports.getRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render("show", { recipe: recipe });
});

exports.createRecipe_get = asyncHandler(async (req, res) => {
  const ingredients = await ingredient.find();
  const units = await unit.find();

  res.render("recipeForm", { ingredients: ingredients, units: units });
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
  body("category")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("category are required"),
  body("instructions")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("instructions are required"),
  body("servings").trim().isNumeric().withMessage("Servings are required"),

   upload.single('image'), (req, res, next) => {
   
    if (!req.file) {
      console.log("No image received");
      return res.send({
        success: false
      });
  
    } else {
      console.log('image received');
      return next();
    }
  },

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
  console.log(req.file);
  const image = req.file.filename;
    const { title,  ingredients, unit, category, instructions, servings } =req.body;

    
    function zipArrays(keysArray, valuesArray) {
      console.log(keysArray, valuesArray);
    }
    const ingredient = zipArrays(unit, ingredients);
    
    const recipe = new Recipe({
      title,
      image,
      ingredients: ingredient,
      category,
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

/// create a function that takes a string , loop over it and mask all the odd numbers with a "*"
// function maskOddNumbers(str) {
//   let result = "";
//   for (let i = 0; i < str.length; i++) {
//     if (parseInt(str[i]) % 2 !== 0) {
//       result += "*";
//     } else {
//       result += str[i];
//     }
//   }
//   return result;
// }
