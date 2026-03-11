const Joi = require("joi");

const {regexConstants} = require("../constants");

class UserValidator {
    static name = Joi.string().min(3).max(45).trim();
    static phone = Joi.string().regex(regexConstants.PHONE).trim()
    static password = Joi.string().regex(regexConstants.PASSWORD).trim();
    static chatId = Joi.string()

    static authenticate = Joi.object({
        smsId: Joi.number().required(),
        name: this.name,
    });

    static update = Joi.object({
        name: this.name,
    });

    static telegramLogin = Joi.object({
        chatId: this.chatId.required(),
        phone: this.phone.required(),
    });
}

module.exports = UserValidator