const Bookmark = require('../models/bookmarkModel');
const asyncHandler = require('express-async-handler');

// create controllers for bookmark : get all, get by id, create, update, delete

// get all bookmarks


exports.getAllBookmarks = asyncHandler(async (req, res) => {
    const bookmarks = await Bookmark.find();
    const [bookmark] = bookmarks;
    const recipes = bookmark.bookmarked;
    
  
    
    
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
  console.log(req.params)
  const bookmarks = await Bookmark.find();
  const [bookmark] = bookmarks;

  const recipes = bookmark.bookmarked;

  const recipe = recipes.find((recipe) => recipe._id == req.params.id);

  const index = recipes.indexOf(recipe);
  recipes.splice(index, 1);
  await bookmark.save();
  res.redirect('/recipes/bookmarks');
});


// exports.deleteBookmark = asyncHandler(async (req, res) => {
//   const bookmarks = await Bookmark.find();
//   const [bookmark] = bookmarks;
//   const recipes = bookmark.bookmarked;
//   const recipe = recipes.find((recipe) => recipe._id == req.params.id);
//   const index = recipes.indexOf(recipe);
//   recipes.splice(index, 1);
//   await bookmark.save();
//   res.redirect('/bookmarks');
// });