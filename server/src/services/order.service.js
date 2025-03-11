const {User} = require("../models");
const emailService = require("./email.service");
const {EEmailActions} = require("../enums/email.enum");
const {configs} = require("../configs");

class OrderService {
    async create(userId, data) {
        const user = await User.findById(userId);

        const context = {
            cleanCloudId: user.ccId,
            nameOfUser: user.name,
            emailOfUser: user.email,
            phoneOfUser: user.phone,
            ...data,
        }

        await Promise.all([
            emailService.sendMail(configs.MANAGER_EMAIL, EEmailActions.ORDER_CREATED_MANAGER, context),
            emailService.sendMail(user.email, EEmailActions.ORDER_CREATED_USER, context)
        ])
    }
}

module.exports = new OrderService()