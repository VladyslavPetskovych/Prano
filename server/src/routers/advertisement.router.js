const {Router} = require("express");

const {advertisementController} = require("../controllers");
const {authMiddleware, userMiddleware, imageMiddleware, commonMiddleware, advertisementMiddleware} = require("../middlewares");
const {AdvertisementValidator} = require("../validators");

const router = Router()

router.get("/", advertisementController.findAll)
router.post(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    imageMiddleware.upload.single("image"),
    commonMiddleware.isBodyValid(AdvertisementValidator.create),
    advertisementController.create
)
router.get(
    "/:advertisementId",
    commonMiddleware.isIdValid("advertisementId"),
    advertisementMiddleware.isAdvertisementExist("advertisementId"),
    advertisementController.findById
)
router.patch(
    "/:advertisementId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("advertisementId"),
    advertisementMiddleware.isAdvertisementExist("advertisementId"),
    commonMiddleware.isBodyValid(AdvertisementValidator.update),
    advertisementController.updateById
)
router.delete(
    "/:advertisementId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("advertisementId"),
    advertisementMiddleware.isAdvertisementExist("advertisementId"),
    advertisementController.deleteById
)
router.post(
    "/:advertisementId/image",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("advertisementId"),
    advertisementMiddleware.isAdvertisementExist("advertisementId"),
    imageMiddleware.upload.single("image"),
    advertisementController.addImage
)
router.delete(
    "/:advertisementId/image",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("advertisementId"),
    advertisementMiddleware.isAdvertisementExist("advertisementId"),
    advertisementController.deleteImage
)

module.exports = router