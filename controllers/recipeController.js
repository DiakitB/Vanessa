const asyncHandler = require("express-async-handler");

const Recipe = require("../models/recipeModel");
const ingredient = require("../models/ingredientModel");
const unit = require("../models/unitModel");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find();

  res.render("index", { recipes: recipes });
});

//create controllers for the following: getRecipe, createRecipe_get, createRecipe_post, updateRecipe_get, updateRecipe_post, deleteRecipe
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

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const { title, image, ingredient, unit, category, instructions, servings } =
      req.body;
    function zipArrays(keysArray, valuesArray) {
      return Object.fromEntries(
        keysArray.map((value, index) => [value, valuesArray[index]])
      );
    }
    const ingredients = zipArrays(unit, ingredient);
    const recipe = new Recipe({
      title,
      image,
      ingredients,
      category,
      instructions,
      servings,
    });
    console.log(recipe);
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

/// create a function that takes 2 arrays and returns an object with the first array as keys and the second array as values
