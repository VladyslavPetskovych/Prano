const Joi = require("joi");

class ProductValidator {
    static title = Joi.string().min(3).max(45).trim()
    static description = Joi.string().min(5).trim()
    static order = Joi.number().integer().min(0).max(1000000)

    static create = Joi.object({
        title: this.title.required(),
        description: this.description.required(),
        order: this.order,
    })

    static update = Joi.object({
        title: this.title,
        description: this.description,
        order: this.order,
    }).or("title", "description", "order")
}

module.exports = ProductValidator