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
    "/orders",
    authMiddleware.checkChatId,
    telegramController.findOrdersByChatId
)

module.exports = router