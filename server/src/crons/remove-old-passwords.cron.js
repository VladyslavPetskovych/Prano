const {CronJob} = require("cron");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

const {OldPassword} = require("../models");

dayjs.extend(utc)

const oldPasswordsRemover = async () => {
    const previousYear = dayjs().utc().subtract(1, "year")

    await OldPassword.deleteMany({createdAt: {$lte: previousYear}})
}

module.exports = new CronJob("0 0 2 * * *", oldPasswordsRemover)