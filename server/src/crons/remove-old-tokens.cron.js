const {CronJob} = require("cron");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

const {Token} = require("../models");

dayjs.extend(utc)

const tokenRemover = async () => {
    const previousMonth = dayjs().utc().subtract(30, "days")

    await Token.deleteMany({createdAt: {$lte: previousMonth}})
}

module.exports = new CronJob("0 0 2 * * *", tokenRemover)