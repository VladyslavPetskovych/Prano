const {Router} = require("express");

const {productController} = require("../controllers");
const {authMiddleware, userMiddleware, commonMiddleware, productMiddleware} = require("../middlewares");
const {ProductValidator} = require("../validators");

const router = Router();

router.get("/", productController.findAll)
router.post(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isBodyValid(ProductValidator.create),
    productController.create
)
router.get(
    "/:productId",
    commonMiddleware.isIdValid("productId"),
    productMiddleware.isProductExist("productId"),
    productController.findById
)
router.patch(
    "/:productId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("productId"),
    productMiddleware.isProductExist("productId"),
    commonMiddleware.isBodyValid(ProductValidator.update),
    productController.updateById
)
router.delete(
    "/:productId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("productId"),
    productMiddleware.isProductExist("productId"),
    productController.deleteById
)

module.exports = router