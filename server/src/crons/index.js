const removeOldTokens = require("./remove-old-tokens.cron");
const removeOldPasswords = require("./remove-old-passwords.cron");
const removeOldSms = require("./remove-old-sms.cron");

module.exports = {
    cronRunner: () => {
        removeOldTokens.start()
        removeOldPasswords.start()
        removeOldSms.start()
    },
}