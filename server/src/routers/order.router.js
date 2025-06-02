const {Router} = require("express");
const {rateLimit} = require("express-rate-limit");

const {authMiddleware, userMiddleware, commonMiddleware} = require("../middlewares");
const {OrderValidator} = require("../validators");
const {orderController} = require("../controllers");

const router = Router();

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 2,
    message: "Too many requests, try again after 2 minutes",
    keyGenerator: (_, res) => res.locals.tokenPayload.id
});

router.get(
    "/:userId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights("userId"),
    commonMiddleware.isIdValid("userId"),
    userMiddleware.isUserExistByReqParams("userId"),
    orderController.findByUserId
)
router.post(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserActive,
    limiter,
    commonMiddleware.isBodyValid(OrderValidator.create),
    orderController.create
)

module.exports = router