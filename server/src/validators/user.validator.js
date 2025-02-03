const Joi = require("joi");

const {userEnum} = require("../enums");
const {regexConstants} = require("../constants");

class UserValidator {
    static name = Joi.string().min(3).max(45).trim();
    static age = Joi.number().min(1).max(100);
    static gender = Joi.valid(...Object.values(userEnum.EGenders));
    static email = Joi.string().email({minDomainSegments: 2, tlds: {allow: false}}).trim();
    static password = Joi.string().regex(regexConstants.PASSWORD).trim();

    static create = Joi.object({
        name: this.name.required(),
        age: this.age.required(),
        gender: this.gender.required(),
        email: this.email.required(),
        password: this.password.required(),
    });

    static update = Joi.object({
        name: this.name,
        age: this.age,
        gender: this.gender,
    });

    static login = Joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });
}

module.exports = UserValidator