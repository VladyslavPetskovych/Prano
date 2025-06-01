const Joi = require("joi");

const {regexConstants} = require("../constants");

class OrderValidator {
    static name = Joi.string().max(45).trim()
    static phone = Joi.string().regex(regexConstants.PHONE).trim()
    static email = Joi.string().email({minDomainSegments: 2, tlds: {allow: false}}).trim();
    static clothType = Joi.string().max(45).trim()
    static productType = Joi.string().max(45).trim()
    static note = Joi.string().max(200).allow(null, "").trim()

    static create = Joi.object({
        name: this.name.required(),
        phone: this.phone.required(),
        email: this.email.required(),
        clothType: this.clothType.required(),
        productType: this.productType.required(),
        note: this.note,
    })
}

module.exports = OrderValidator
