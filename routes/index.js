var express = require("express");
var router = express.Router();
const familyController = require("../controllers/family");
/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("index route");

  res.render("index");
});
router.get("/test", familyController.testFolderGet)
router.post("/test", familyController.testFolderPost)

module.exports = router;
