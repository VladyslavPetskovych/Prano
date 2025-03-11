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
    [EEmailActions.ORDER_CREATED_MANAGER]: {
        templateName: "order-created-manager",
        subject: "New order!!!",
    },
    [EEmailActions.ORDER_CREATED_USER]: {
        templateName: "order-created-user",
        subject: "Order has been created",
    },
}