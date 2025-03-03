const {config} = require("dotenv");

config()

module.exports = {
    DB_URL: process.env.DB_URL,
    FRONT_URL: process.env.FRONT_URL,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,

    JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,
    JWT_ACTIVATE_EXPIRES_IN: process.env.JWT_ACTIVATE_EXPIRES_IN,

    JWT_FORGOT_SECRET: process.env.JWT_FORGOT_SECRET,
    JWT_FORGOT_EXPIRES_IN: process.env.JWT_FORGOT_EXPIRES_IN,

    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,

    SECRET_SALT: process.env.SECRET_SALT,

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,

    CC_API_KEY: process.env.CC_API_KEY,
}