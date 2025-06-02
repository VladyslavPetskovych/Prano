const {Router} = require("express");

const {commonMiddleware, userMiddleware, authMiddleware} = require("../middlewares");
const {UserValidator} = require("../validators");
const {telegramController} = require("../controllers");

const router = Router();

router.post(
    "/login",
    commonMiddleware.isBodyValid(UserValidator.telegramLogin),
    userMiddleware.isUserExistByReqBody("phone"),
    telegramController.login
)
router.get(
    "/user",
    authMiddleware.checkChatId,
    telegramController.findUser
)
router.get(
    "/orders",
    authMiddleware.checkChatId,
    telegramController.findOrders
)
router.get(
    "/users",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    telegramController.findUsers
)

module.exports = router