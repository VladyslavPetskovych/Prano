const Joi = require("joi");

class AdvertisementValidator {
    static title = Joi.string().min(3).max(45).trim()
    static description = Joi.string().min(5).trim()

    static create = Joi.object({
        title: this.title.required(),
        description: this.description.required(),
    })

    static update = Joi.object({
        title: this.title,
        description: this.description,
    })
}

module.exports = AdvertisementValidator