var express = require('express');
var router = express.Router();
const family = require('../controllers/family');
// careate routes for family
router.get('/family', family.getFiles);
router.get("/subfiles", family.getAAFiles);
router.get("/subfiles/:id", family.getOneFile);
router.post("/subfiles/:id", family.makePayment);
router.get('/create', family.create_getFile);
router.post('/create', family.create_postFile);


module.exports = router;

