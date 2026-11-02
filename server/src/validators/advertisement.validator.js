const Joi = require("joi");

class AdvertisementValidator {
    static title = Joi.string().min(3).max(120).trim()
    static description = Joi.string().min(5).trim()

    static create = Joi.object({
        title: this.title.required(),
        description: this.description.required(),
    })

    static update = Joi.object({
        title: this.title,
        description: this.description,
    })

    static view = Joi.object({
        visitorId: Joi.string().max(64).trim().allow(""),
    })
}

module.exports = AdvertisementValidator