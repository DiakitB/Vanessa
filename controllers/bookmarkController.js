const Bookmark = require('../models/bookmarkModel');
const asyncHandler = require('express-async-handler');

// create controllers for bookmark : get all, get by id, create, update, delete

// get all bookmarks


exports.getAllBookmarks = asyncHandler(async (req, res) => {
    const bookmarks = await Bookmark.find();
    const [bookmark] = bookmarks;
    const recipes = bookmark.bookmarked;

    
    const groceryList = recipes.reduce((acc, recipe) => {
      recipe.ingredients.forEach(ingredient => {
        const existingIngredient = acc.find(item => item.ingredient === ingredient.ingredient);
        if (existingIngredient) {
          existingIngredient.quantity += ingredient.quantity;
        } else {
          acc.push({ ...ingredient });
        }
      });
      return acc;
    }, []);
    
 
    
    res.render("bookmarkView", { recipes: recipes });
  });
// get one bookmark
exports.getOneBookmark = asyncHandler(async (req, res) => {
    
    const bookmarks = await Bookmark.find();
    const [bookmark] = bookmarks;
    const recipes = bookmark.bookmarked;
    const recipe = recipes.find((recipe) => recipe._id == req.params.id);
    res.render('bookmarkDetail', {  recipe: recipe });
});

// delete one bookmark


exports.deleteBookmark = asyncHandler(async (req, res) => {

  const bookmarks = await Bookmark.find();
  const [bookmark] = bookmarks;

  const recipes = bookmark.bookmarked;

  const recipe = recipes.find((recipe) => recipe._id == req.params.id);

  const index = recipes.indexOf(recipe);
  recipes.splice(index, 1);
  await bookmark.save();
  res.redirect('/recipes/bookmarks');
});

// create a function that will loop over the bookmarks array and group the ingredients by name and sum the quantity and unit. Create a grocery list from the grouped ingredients.
const convertToGrams = (quantity, unit) => {
  const conversionTable = {
    cup: 236.588,
    tbsp: 14.7868, // 1 cup = 16 tbsp
    tsp: 4.92892,  // 1 cup = 48 tsp
    oz: 28.3495,   // 1 oz = 28.3495 grams
    ml: 1,         // 1 ml = 1 gram (approx for water)
    liter: 1000,   // 1 liter = 1000 grams (approx for water)
    gram: 1,       // 1 gram = 1 gram
    kg: 1000,      // 1 kg = 1000 grams
    pound: 453.592, // 1 pound = 453.592 grams
    gousse: 1,     // Assuming 1 gousse = 1 gram (approx)
    slice: 1,      // Assuming 1 slice = 1 gram (approx)
    large: 1,      // Assuming 1 large = 1 gram (approx)
    boite: 1,      // Assuming 1 boite = 1 gram (approx)
    tranche: 1     // Assuming 1 tranche = 1 gram (approx)
  };

  const conversionFactor = conversionTable[unit];
  if (conversionFactor === undefined) {
    console.warn(`Unknown unit: ${unit}`);
    return NaN;
  }

  return quantity * conversionFactor;
};

exports.createGroceryList = asyncHandler(async (req, res) => {
  const bookmarks = await Bookmark.find();
  const [bookmark] = bookmarks;
  const recipes = bookmark.bookmarked;
  const groceryList = recipes.reduce((acc, bookmark) => {
    bookmark.ingredients.forEach(ingredient => {
      const quantity = parseFloat(ingredient.unit.split(' ')[0].replace('½', '0.5').replace('¼', '0.25').replace('¾', '0.75'));
      const unit = ingredient.unit.split(' ').slice(1).join(' ');
      if (isNaN(quantity)) {
        console.warn(`Invalid quantity: ${ingredient.unit}`);
        return;
      }

      const quantityInGrams = convertToGrams(quantity, unit);
      if (isNaN(quantityInGrams)) {
        console.warn(`Failed to convert quantity: ${quantity} ${unit}`);
        return;
      }

      const existingIngredient = acc.find(item => item.ingredient === ingredient.ingredient.trim());
      if (existingIngredient) {
        existingIngredient.quantity += quantityInGrams;
      } else {
        acc.push({ ingredient: ingredient.ingredient.trim(), quantity: quantityInGrams, unit: 'gram' });
      }
    });
    return acc;
  }, []);

  // Round up the quantities to the nearest integer
  groceryList.forEach(item => {
    item.quantity = Math.ceil(item.quantity);
  });

  

  res.render("groceryListView", { totalRecipes: recipes.length, groceryList: groceryList });
});

console.log(convertToGrams(1, 'cup')); // 236.588