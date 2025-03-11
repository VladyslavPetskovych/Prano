const {userService, ccService} = require("../services");

class UserController {
    async findAll(req, res, next) {
        try {
            const data = await userService.findAll(req.query);

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async findById(req, res, next) {
        try {
            const {userId} = req.params;
            const user = await userService.findById(userId);

            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async updateById(req, res, next) {
        try {
            const {userId} = req.params;
            const updatedUser = await userService.updateById(userId, req.body);

            return res.json(updatedUser)
        } catch (e) {
            next(e)
        }
    }

    async deleteById(req, res, next) {
        try {
            const {userId} = req.params;
            await userService.deleteById(userId);

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }

    async banById(req, res, next) {
        try {
            const {userId} = req.params;
            await userService.banById(userId);

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }

    async findCcDataById(req, res, next) {
        try {
            const {customerId} = req.params;
            const {data} = await ccService.getCustomer(customerId);

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async setAdmin(req, res, next) {
        try {
            const {userId} = req.params;
            await userService.setAdmin(userId);

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()