const {userService} = require("../services");

class UserController {
    async findAll(req, res, next) {
        try {
            const users = await userService.findAll();

            return res.json(users)
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

            return res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()