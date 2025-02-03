const {Router} = require("express");

const {userController} = require("../controllers");
const {commonMiddleware, userMiddleware, authMiddleware} = require("../middlewares");
const {UserValidator} = require("../validators");

const router = Router();

router.get("/", userController.findAll)
router.get(
    "/:userId",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("userId"),
    userMiddleware.isUserExistByReqParams("userId"),
    userController.findById
)
router.patch(
    "/:userId",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("userId"),
    userMiddleware.isUserExistByReqParams("userId"),
    commonMiddleware.isBodyValid(UserValidator.update),
    userController.updateById
)
router.delete(
    "/:userId",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("userId"),
    userMiddleware.isUserExistByReqParams("userId"),
    userController.deleteById
)

module.exports = router