const {Router} = require("express");

const {commonMiddleware, userMiddleware, authMiddleware} = require("../middlewares");
const {UserValidator} = require("../validators");
const {authController} = require("../controllers");
const {TokenEnum: {EActionTokenType}} = require("../enums");
const {rateLimit} = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    max: 10,
    message: "Too many requests, try again after 30 minutes",
});

const router = Router();

router.post(
    "/register",
    limiter,
    commonMiddleware.isBodyValid(UserValidator.create),
    userMiddleware.findAndThrowByReqBody("email"),
    authController.register
)
router.post(
    "/register/:token",
    limiter,
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
    limiter,
    commonMiddleware.isBodyValid(UserValidator.forgotPassword),
    userMiddleware.isUserExistByReqBody("email"),
    authController.forgotPassword
)
router.post(
    "/password/restore/:token",
    limiter,
    commonMiddleware.isBodyValid(UserValidator.setForgotPassword),
    authMiddleware.checkActionToken(EActionTokenType.FORGOT_PASSWORD),
    authController.setForgotPassword
)
router.post(
    "/reactivate",
    limiter,
    commonMiddleware.isBodyValid(UserValidator.reactivate),
    userMiddleware.isUserExistByReqBody("email"),
    userMiddleware.isUserInactive,
    authController.reactivate
)

module.exports = router