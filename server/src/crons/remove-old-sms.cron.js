const {CronJob} = require("cron");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

const {Sms} = require("../models");

dayjs.extend(utc)

const oldSmsRemover = async () => {
    const previousHour = dayjs().utc().subtract(1, "hour")

    await Sms.deleteMany({createdAt: {$lte: previousHour}})
}

module.exports = new CronJob("0 0 * * * *", oldSmsRemover);