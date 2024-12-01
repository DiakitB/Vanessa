const express = require("express");
const recipeController = require("../controllers/recipeController");

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



module.exports = router;
