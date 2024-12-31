const express = require("express");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const recipeController = require("../controllers/recipeController");

const router = express.Router();

// Route to display the home page
router.get("/", recipeController.index);

// Route to display all recipes
router.get("/recipes", recipeController.recipes);

// Route to display a single recipe
router.get("/recipe/:id", recipeController.getRecipe);
router.delete("/recipe/:id", recipeController.deleteRecipe);
// Route to display the form to create a new recipe
router.get("/create", recipeController.createRecipe_get);

// Route to handle the form submission and create a new recipe
router.post("/create", recipeController.createRecipe_post);

// Route to display the form with the recipe information for editing
router.get('/recipes/:id/edit', recipeController.editRecipe_get);

// Route to handle the form submission and update the recipe
router.put('/recipes/:id', upload.single('image'), recipeController.editRecipe_post);

// Route to add a recipe to bookmarks
router.get("/cart/:id", recipeController.addRecipeToBookmarks);

// Route to display all recipes in the kitchen
router.get("/all-recipes", recipeController.getAllRecipes);

// Route to search for a recipe
router.get("/search", recipeController.searchRecipe);

module.exports = router;