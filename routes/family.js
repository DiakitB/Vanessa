const  express = require('express');
const  router = express.Router();
const family = require('../controllers/family');
// careate routes for family

router.get("/subfiles", family.getAAFiles);
router.get("/subfiles/:id", family.getOneFile);
router.post("/subfiles/:id", family.makePayment);
router.get('/create', family.create_getFile);
router.post('/create', family.create_postFile);
router.get('/edit/:id', family.getUpdateFile);
router.put('/edit/:id', family.putUpdateFile);
router.delete('/deleted/:id', family.deleteFile);


module.exports = router;

