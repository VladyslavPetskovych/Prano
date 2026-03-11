const Joi = require("joi");

const {regexConstants} = require("../constants");

class PhoneValidator {
    static phone = Joi.string().regex(regexConstants.PHONE).trim()

    static sendSms = Joi.object({
        phone: this.phone.required(),
    })

    static verifyPhone = Joi.object({
        smsId: Joi.number().required(),
        code: Joi.number().min(0).max(9999).required(),
    })
}

module.exports = PhoneValidator
