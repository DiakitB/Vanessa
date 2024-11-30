const express = require("express");
const recipeController = require("../controllers/recipeController");
const ingredientController = require("../controllers/ingredientController");
const unitController = require("../controllers/unitController");
const router = express.Router();

router.get("/", recipeController.index);
//create routes for the following: getRecipe, createRecipe_get, createRecipe_post, updateRecipe_get, updateRecipe_post, deleteRecipe
router.get("/recipes", recipeController.recipes);
router.get("/recipe/:id", recipeController.getRecipe);
router.get("/create", recipeController.createRecipe_get);
router.post("/create", recipeController.createRecipe_post);
router.get("/update/:id", recipeController.updateRecipe_get);
router.post("/update/:id", recipeController.updateRecipe_post);
router.get("/cart/:id", recipeController.addRecipeToBookmarks);
// create a route for bookmarking a recipeecipe);


router.get("/all-recipes", recipeController.getAllRecipes);
router.get("/search", recipeController.searchRecipe);

//create routes for the following: getAllIngredients, getIngredient, createIngredient_get, createIngredient_post, updateIngredient_get, updateIngredient_post, deleteIngredient
router.get("/ingredients", ingredientController.getAllIngredients);
router.get("/ingredient/:id", ingredientController.getIngredient);
router.get("/createIngredient", ingredientController.createIngredient_get);
router.post("/createIngredient", ingredientController.createIngredient_post);
router.get("/updateIngredient/:id", ingredientController.updateIngredient_get);
router.post(
  "/updateIngredient/:id",
  ingredientController.updateIngredient_post
);
router.get("/deleteIngredient/:id", ingredientController.deleteIngredient);

//create routes for the following: getAllUnits, getUnit, createUnit_get, createUnit_post, updateUnit_get, updateUnit_post, deleteUnit
router.get("/units", unitController.getAllUnits);
router.get("/unit/:id", unitController.getUnit);
router.get("/createUnit", unitController.createUnit_get);
router.post("/createUnit", unitController.createUnit_post);
router.get("/updateUnit/:id", unitController.updateUnit_get);
router.post("/updateUnit/:id", unitController.updateUnit_post);
router.get("/deleteUnit/:id", unitController.deleteUnit);

module.exports = router;
