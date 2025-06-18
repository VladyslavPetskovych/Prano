const Joi = require("joi");

const {UserEnum: {EGenders}} = require("../enums");
const {regexConstants} = require("../constants");

class UserValidator {
    static name = Joi.string().min(3).max(45).trim();
    static email = Joi.string().email({minDomainSegments: 2, tlds: {allow: false}}).trim();
    static phone = Joi.string().regex(regexConstants.PHONE).trim()
    static password = Joi.string().regex(regexConstants.PASSWORD).trim();
    static chatId = Joi.string()

    static create = Joi.object({
        name: this.name.required(),
        email: this.email.required(),
        phone: this.phone.required(),
        password: this.password.required(),
    });

    static update = Joi.object({
        name: this.name,
    });

    static updatePhone = Joi.object({
        phone: this.phone.required()
    });

    static updateEmail = Joi.object({
        email: this.email.required()
    });

    static login = Joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });

    static changePassword = Joi.object({
        oldPassword: this.password.required(),
        newPassword: this.password.required(),
    });

    static forgotPassword = Joi.object({
        email: this.email.required(),
    });

    static setForgotPassword = Joi.object({
        password: this.password.required(),
    });

    static reactivate = Joi.object({
        email: this.email.required(),
    });

    static telegramLogin = Joi.object({
        chatId: this.chatId.required(),
        phone: this.phone.required(),
    });
}

module.exports = UserValidator