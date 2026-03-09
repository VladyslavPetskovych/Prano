const {Router} = require("express");

const {commonMiddleware, phoneMiddleware} = require("../middlewares");
const {PhoneValidator} = require("../validators");
const {phoneController} = require("../controllers");

const router = Router();

router.post(
    "/send-sms",
    commonMiddleware.rateLimiter(5, 60 * 60 * 1000),
    commonMiddleware.isBodyValid(PhoneValidator.sendSms),
    phoneController.sendSms
)
router.post(
    "/verify",
    commonMiddleware.isBodyValid(PhoneValidator.verifyPhone),
    phoneMiddleware.isSmsRecordExist,
    phoneController.verifyPhone
)

module.exports = router