const {Router} = require("express");
const {rateLimit} = require("express-rate-limit");

const {authMiddleware, userMiddleware, commonMiddleware} = require("../middlewares");
const {OrderValidator} = require("../validators");
const {orderController} = require("../controllers");

const router = Router();

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 1,
    message: "Too many requests, try again after 2 minutes",
    keyGenerator: (_, res) => res.locals.tokenPayload.id
});

router.post(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserActive,
    limiter,
    commonMiddleware.isBodyValid(OrderValidator.create),
    orderController.create
)

module.exports = router