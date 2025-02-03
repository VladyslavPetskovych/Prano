const {Router} = require("express");

const {commonMiddleware, userMiddleware} = require("../middlewares");
const {UserValidator} = require("../validators");
const {authController} = require("../controllers");

const router = Router();

router.post(
    "/register",
    commonMiddleware.isBodyValid(UserValidator.create),
    userMiddleware.findAndThrowByReqBody("email"),
    authController.register
)
router.post(
    "/login",
    commonMiddleware.isBodyValid(UserValidator.login),
    userMiddleware.isUserExistByReqBody("email"),
    authController.login
)

module.exports = router