const {Router} = require("express");

const {merchandiseController} = require("../controllers");
const {authMiddleware, userMiddleware, commonMiddleware, merchandiseMiddleware} = require("../middlewares");
const {MerchandiseValidator} = require("../validators");

const router = Router();

router.get("/", merchandiseController.findAll)
router.post(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isBodyValid(MerchandiseValidator.create),
    merchandiseController.create
)
router.get(
    "/:merchandiseId",
    commonMiddleware.isIdValid("merchandiseId"),
    merchandiseMiddleware.isMerchandiseExist("merchandiseId"),
    merchandiseController.findById
)
router.patch(
    "/:merchandiseId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("merchandiseId"),
    merchandiseMiddleware.isMerchandiseExist("merchandiseId"),
    commonMiddleware.isBodyValid(MerchandiseValidator.update),
    merchandiseController.updateById
)
router.delete(
    "/:merchandiseId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("merchandiseId"),
    merchandiseMiddleware.isMerchandiseExist("merchandiseId"),
    merchandiseController.deleteById
)
router.patch(
    "/:merchandiseId/order",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("merchandiseId"),
    merchandiseMiddleware.isMerchandiseExist("merchandiseId"),
    commonMiddleware.isBodyValid(MerchandiseValidator.changeOrder),
    merchandiseController.changeOrder
)

module.exports = router