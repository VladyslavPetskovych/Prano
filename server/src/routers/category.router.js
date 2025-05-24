const {Router} = require("express");

const {authMiddleware, userMiddleware, commonMiddleware, categoryMiddleware} = require("../middlewares");
const {CategoryValidator} = require("../validators");
const {categoryController} = require("../controllers");

const router = Router();

router.get("/", categoryController.findAll)
router.post(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isBodyValid(CategoryValidator.create),
    categoryController.create
)
router.get(
    "/:categoryId",
    commonMiddleware.isIdValid("categoryId"),
    categoryMiddleware.isCategoryExist("categoryId"),
    categoryController.findById
)
router.patch(
    "/:categoryId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("categoryId"),
    categoryMiddleware.isCategoryExist("categoryId"),
    commonMiddleware.isBodyValid(CategoryValidator.update),
    categoryController.updateById
)
router.delete(
    "/:categoryId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("categoryId"),
    categoryMiddleware.isCategoryExist("categoryId"),
    categoryController.deleteById
)

module.exports = router