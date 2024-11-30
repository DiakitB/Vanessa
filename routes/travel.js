
const router = require('express').Router();
const travelController = require('../controllers/travelItem');

router.get('/items', travelController.getAllItems);



module.exports = router;