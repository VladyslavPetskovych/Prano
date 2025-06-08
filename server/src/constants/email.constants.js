const {EmailEnum: {EEmailActions}} = require("../enums");

module.exports = {
    [EEmailActions.WELCOME]: {
        templateName: "register",
        subject: "Ласкаво просимо на нашу платформу",
    },
    [EEmailActions.FORGOT_PASSWORD]: {
        templateName: "forgot-password",
        subject: "Запит на скидання пароля",
    },
    [EEmailActions.PASSWORD_CHANGED]: {
        templateName: "password-changed",
        subject: "Пароль змінено",
    },
    [EEmailActions.ORDER_CREATED_MANAGER]: {
        templateName: "order-created-manager",
        subject: "Нове замовлення!!!",
    },
    [EEmailActions.ORDER_CREATED_USER]: {
        templateName: "order-created-user",
        subject: "Замовлення створено",
    },
}