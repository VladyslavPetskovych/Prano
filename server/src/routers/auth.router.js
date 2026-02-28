const {Router} = require("express");

const {commonMiddleware, authMiddleware, phoneMiddleware} = require("../middlewares");
const {UserValidator} = require("../validators");
const {authController} = require("../controllers");

const router = Router();

router.post(
    "/",
    commonMiddleware.isBodyValid(UserValidator.authenticate),
    phoneMiddleware.isSmsRecordExist,
    phoneMiddleware.isSmsRecordVerified,
    authController.authenticate
)
router.post(
    "/refresh",
    authMiddleware.checkRefreshToken,
    authController.refresh
)

module.exports = router