const Joi = require("joi");

class CategoryValidator {
    static title = Joi.string().min(3).max(45).trim()

    static create = Joi.object({
        title: this.title.required(),
    })

    static update = Joi.object({
        title: this.title,
    })
}

module.exports = CategoryValidator