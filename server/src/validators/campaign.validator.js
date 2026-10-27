const Joi = require("joi");

class CampaignValidator {
    static name = Joi.string().min(2).max(60).trim()
    static promoCode = Joi.string().min(2).max(40).trim()
    static title = Joi.string().max(120).trim().allow("")
    static description = Joi.string().max(2000).trim().allow("")

    static create = Joi.object({
        name: this.name.required(),
        promoCode: this.promoCode.required(),
        title: this.title,
        description: this.description,
    })

    static update = Joi.object({
        name: this.name,
        promoCode: this.promoCode,
        title: this.title,
        description: this.description,
        isActive: Joi.boolean(),
    })

    static visitorId = Joi.string().max(64).trim().allow("")
    static source = Joi.string().valid("qr", "link").default("link")
    // Номер нормалізується в сервісі, тут лише відсікаємо сміття
    static phone = Joi.string().max(20).trim()

    static visit = Joi.object({
        visitorId: this.visitorId,
        source: this.source,
    })

    static sendCode = Joi.object({
        phone: this.phone.required(),
        visitorId: this.visitorId,
        source: this.source,
    })

    static verifyCode = Joi.object({
        phone: this.phone.required(),
        code: Joi.string().pattern(/^\d{4}$/).required(),
    })
}

module.exports = CampaignValidator
