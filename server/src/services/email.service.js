const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

const {configs} = require("../configs");
const {emailConstants} = require("../constants");

class EmailService {
    #transporter

    constructor() {
        this.#transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: configs.NO_REPLY_EMAIL,
                pass: configs.NO_REPLY_PASSWORD
            }
        })

        const hbsOptions = {
            viewEngine: {
                extname: ".hbs",
                defaultLayout: "main",
                layoutsDir: path.join(process.cwd(), "src", "email-templates", "layouts"),
                partialsDir: path.join(process.cwd(), "src", "email-templates", "partials"),
            },
            viewPath: path.join(process.cwd(), "src", "email-templates", "views"),
            extName: ".hbs"
        }

        this.#transporter.use("compile", hbs(hbsOptions))
    }

    async sendMail(email, emailAction, context = {}) {
        const {templateName, subject} = emailConstants[emailAction];

        context.frontUrl = configs.FRONT_URL

        const mailOptions = {
            from: `Prano - No Reply <${configs.NO_REPLY_EMAIL}>`,
            to: email,
            subject,
            template: templateName,
            context,
        }

        return await this.#transporter.sendMail(mailOptions)
    }
}

module.exports = new EmailService()