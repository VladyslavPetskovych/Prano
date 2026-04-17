const Joi = require("joi");

class CategoryValidator {
    static title = Joi.string().min(3).max(45).trim()
    static order = Joi.number().integer().min(0).max(1000000)
    static isActive = Joi.boolean()

    static create = Joi.object({
        title: this.title.required(),
        order: this.order,
        isActive: this.isActive,
    })

    static update = Joi.object({
        title: this.title,
        order: this.order,
        isActive: this.isActive,
    }).or("title", "order", "isActive")
}

module.exports = CategoryValidator