
const router = require('express').Router();
const travelController = require('../controllers/travelItem');

router.get('/items', travelController.getAllItems);
router.get ('/create', travelController.create_getItem);
router.post('/create', travelController.create_postItem);
// router.get('/view', travelController.viewItem);



module.exports = router;

;