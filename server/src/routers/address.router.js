const { Router } = require("express");

const { addressController } = require("../controllers");
const {
  authMiddleware,
  userMiddleware,
  commonMiddleware,
  addressMiddleware,
  imageMiddleware,
} = require("../middlewares");
const { AddressValidator } = require("../validators");

const router = Router();

router.get("/", addressController.findAll);
router.get("/postomat", addressController.getPostomat);
router.put(
  "/postomat",
  authMiddleware.checkAccessToken,
  userMiddleware.checkUserRights(),
  commonMiddleware.isBodyValid(AddressValidator.postomatUpdate),
  addressController.updatePostomat
);
router.post(
  "/",
  authMiddleware.checkAccessToken,
  userMiddleware.checkUserRights(),
  commonMiddleware.isBodyValid(AddressValidator.create),
  addressController.create
);
router.get(
  "/:addressId",
  commonMiddleware.isIdValid("addressId"),
  addressMiddleware.isAddressExist("addressId"),
  addressController.findById
);
router.patch(
  "/:addressId",
  authMiddleware.checkAccessToken,
  userMiddleware.checkUserRights(),
  commonMiddleware.isIdValid("addressId"),
  addressMiddleware.isAddressExist("addressId"),
  commonMiddleware.isBodyValid(AddressValidator.update),
  addressController.updateById
);
router.delete(
  "/:addressId",
  authMiddleware.checkAccessToken,
  userMiddleware.checkUserRights(),
  commonMiddleware.isIdValid("addressId"),
  addressMiddleware.isAddressExist("addressId"),
  addressController.deleteById
);
router.post(
  "/:addressId/images",
  authMiddleware.checkAccessToken,
  userMiddleware.checkUserRights(),
  commonMiddleware.isIdValid("addressId"),
  addressMiddleware.isAddressExist("addressId"),
  imageMiddleware.upload.array("images"),
  addressController.addImages
);
router.delete(
  "/:addressId/images",
  authMiddleware.checkAccessToken,
  userMiddleware.checkUserRights(),
  commonMiddleware.isIdValid("addressId"),
  addressMiddleware.isAddressExist("addressId"),
  commonMiddleware.isBodyValid(AddressValidator.deleteImage),
  addressController.deleteImage
);

module.exports = router;
