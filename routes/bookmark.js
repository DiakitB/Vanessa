const express = require('express');

const router = express.Router();

const bookmarkController = require('../controllers/bookmarkController');

router.get('/bookmarks', bookmarkController.getAllBookmarks);
router.get('/bookmarks/:id', bookmarkController.getOneBookmark);
router.get('/deleted/:id', bookmarkController.deleteBookmark);
router.get('/groceryList', bookmarkController.createGroceryList);
 





module.exports = router;