const Joi = require("joi");

class ProductValidator {
    static title = Joi.string().min(3).max(45).trim()
    static description = Joi.string().min(5).trim()
    static priceFrom = Joi.number()
    static priceTo = Joi.number().greater(Joi.ref("priceFrom"))

    static create = Joi.object({
        title: this.title.required(),
        description: this.description.required(),
        priceFrom: this.priceFrom.required(),
        priceTo: this.priceTo.required(),
    })

    static update = Joi.object({
        title: this.title,
        description: this.description,
    })

    static changePrice = Joi.object({
        priceFrom: this.priceFrom.required(),
        priceTo: this.priceTo.required(),
    })
}

module.exports = ProductValidator