const Joi = require("joi");

class MerchandiseValidator {
    static title = Joi.string().min(3).max(65).trim()
    static quantity = Joi.string().trim()
    // Порожня стандартна ціна — позиція «лише Преміум»
    static price = Joi.alternatives().try(
        Joi.number(),
        Joi.string().trim().allow("")
    )
    static secondPrice = Joi.alternatives()
        .try(Joi.number(), Joi.string().trim().allow(""))
        .allow(null)
    static discountPercent = Joi.number().valid(0, 10, 15, 20, 30)
    static order = Joi.number().integer().min(1)
    static categoryId = Joi.string().hex().length(24).trim()

    static create = Joi.object({
        title: this.title.required(),
        quantity: this.quantity,
        price: this.price.default(""),
        secondPrice: this.secondPrice,
        discountPercent: this.discountPercent,
        categoryId: this.categoryId.required(),
        order: this.order
    }).custom((value, helpers) => {
        const isEmpty = (v) => v == null || String(v).trim() === "";

        return isEmpty(value.price) && isEmpty(value.secondPrice)
            ? helpers.message("Вкажіть стандартну або преміум ціну")
            : value
    })

    static update = Joi.object({
        title: this.title,
        quantity: this.quantity,
        price: this.price,
        secondPrice: this.secondPrice,
        discountPercent: this.discountPercent,
    })

    static changeOrder = Joi.object({
        order: this.order.required()
    })
}

module.exports = MerchandiseValidator
