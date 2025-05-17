const Joi = require("joi");

class MerchandiseValidator {
    static title = Joi.string().min(3).max(45).trim()
    static price = Joi.number().min(1)
    static secondPrice = Joi.number().min(1)
    static order = Joi.number().integer().min(1)

    static create = Joi.object({
        title: this.title.required(),
        price: this.price.required(),
        secondPrice: this.secondPrice,
    })

    static update = Joi.object({
        title: this.title,
        price: this.price,
        secondPrice: this.secondPrice,
    })

    static changeOrder = Joi.object({
        order: this.order.required()
    })
}

module.exports = MerchandiseValidator