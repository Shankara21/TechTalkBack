var express = require("express");
const CategoryController = require("../controller/CategoryController");
var router = express.Router();


router.get("/", CategoryController.index);
router.get("/:id", CategoryController.show);
router.post("/", CategoryController.store);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.destroy);


module.exports = router;
