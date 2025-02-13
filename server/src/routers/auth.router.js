const {Router} = require("express");

const {commonMiddleware, userMiddleware, authMiddleware} = require("../middlewares");
const {UserValidator} = require("../validators");
const {authController} = require("../controllers");
const {TokenEnum: {EActionTokenType}} = require("../enums");

const router = Router();

router.post(
    "/register",
    commonMiddleware.isBodyValid(UserValidator.create),
    userMiddleware.findAndThrowByReqBody("email"),
    authController.register
)
router.post(
    "/register/:token",
    authMiddleware.checkActionToken(EActionTokenType.ACTIVATE),
    authController.activate
)
router.post(
    "/login",
    commonMiddleware.isBodyValid(UserValidator.login),
    userMiddleware.isUserExistByReqBody("email"),
    authController.login
)
router.post(
    "/refresh",
    authMiddleware.checkRefreshToken,
    authController.refresh
)
router.post(
    "/password/change",
    commonMiddleware.isBodyValid(UserValidator.changePassword),
    authMiddleware.checkAccessToken,
    authController.changePassword
)
router.post(
    "/password/forgot",
    commonMiddleware.isBodyValid(UserValidator.forgotPassword),
    userMiddleware.isUserExistByReqBody("email"),
    authController.forgotPassword
)
router.post(
    "/password/restore/:token",
    commonMiddleware.isBodyValid(UserValidator.setForgotPassword),
    authMiddleware.checkActionToken(EActionTokenType.FORGOT_PASSWORD),
    authController.setForgotPassword
)

module.exports = router