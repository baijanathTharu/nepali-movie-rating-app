const router = require("express").Router();

const userController = require("./user.controller");
const imageUploader = require("../../middlewares/image.uploader");

router
  .route("/")
  .get(userController.get)
  .post(imageUploader.single("image"), userController.create);

router.route("/search").post(userController.search).get(userController.search);

router
  .route("/:id")
  .get(userController.getById)
  .put(imageUploader.single("image"), userController.update)
  .delete(userController.remove);

module.exports = router;
