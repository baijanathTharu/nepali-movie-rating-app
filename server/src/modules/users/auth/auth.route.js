const router = require("express").Router();
const authController = require("./auth.controller");
const createUser = require("../user.controller").create;
const imageUploader = require("../../../middlewares/image.uploader");

router.post("/register", imageUploader.single("image"), createUser);

router.post("/login", authController.login);

module.exports = router;
