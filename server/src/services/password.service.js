const bcrypt = require("bcrypt");

const {configs} = require("../configs");

class PasswordService {
    async hash(password) {
        return await bcrypt.hash(password, +configs.SECRET_SALT)
    }

    async compare(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword)
    }
}

module.exports = new PasswordService()