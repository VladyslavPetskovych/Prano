const Joi = require("joi");

class CategoryValidator {
    static title = Joi.string().min(3).max(45).trim()
    static order = Joi.number().integer().min(0).max(1000000)

    static create = Joi.object({
        title: this.title.required(),
        order: this.order,
    })

    static update = Joi.object({
        title: this.title,
        order: this.order,
    }).or("title", "order")
}

module.exports = CategoryValidator