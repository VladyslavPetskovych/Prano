const removeOldTokens = require("./remove-old-tokens.cron");
const removeOldPasswords = require("./remove-old-passwords.cron");

module.exports = {
    cronRunner: () => {
        removeOldTokens.start()
        removeOldPasswords.start()
    }
}