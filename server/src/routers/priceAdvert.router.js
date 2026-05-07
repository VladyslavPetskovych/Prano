const { Router } = require("express");

const { priceAdvertController } = require("../controllers");
const { authMiddleware, imageMiddleware, userMiddleware } = require("../middlewares");

const router = Router();

router.get("/", priceAdvertController.getCurrent);
router.post(
  "/image",
  authMiddleware.checkAccessToken,
  userMiddleware.checkUserRights(),
  imageMiddleware.upload.single("image"),
  priceAdvertController.uploadImage
);
router.delete(
  "/image",
  authMiddleware.checkAccessToken,
  userMiddleware.checkUserRights(),
  priceAdvertController.deleteImage
);

module.exports = router;
