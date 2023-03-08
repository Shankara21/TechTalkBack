var express = require("express");
const ArticleController = require("../controller/ArticleController");
var router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  // max size 5mb
});

const multipleUpload = upload.fields([
  { name: "cover", maxCount: 1 },
  { name: "infografis", maxCount: 1 },
]);

router.get("/", ArticleController.index);
router.get("/:title", ArticleController.show);
router.post("/", multipleUpload, ArticleController.store);
router.put("/:id", multipleUpload, ArticleController.update);
router.delete("/:id", ArticleController.destroy);
router.get("/filter/:category", ArticleController.filterByCategory);

module.exports = router;
