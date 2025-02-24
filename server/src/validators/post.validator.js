const Joi = require("joi");

class PostValidator {
    static title = Joi.string().min(3).max(45).trim()
    static description = Joi.string().min(10).trim()
    static images = Joi.array().allow(null, "")

    static create = Joi.object({
        title: this.title.required(),
        description: this.description.required(),
        images: this.images
    })

    static update = Joi.object({
        title: this.title,
        description: this.description,
    })
}

module.exports = PostValidator