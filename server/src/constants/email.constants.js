const {EmailEnum: {EEmailActions}} = require("../enums");

module.exports = {
    [EEmailActions.WELCOME]: {
        templateName: "register",
        subject: "Welcome to our platform",
    },
    [EEmailActions.FORGOT_PASSWORD]: {
        templateName: "forgot-password",
        subject: "Password reset request",
    },
    [EEmailActions.PASSWORD_CHANGED]: {
        templateName: "password-changed",
        subject: "Password has been changed",
    },
}