const nodemailer = require("nodemailer");
const htmlFormates = require('../views/htmlFormates')
const emailFormat = require('email-body-format')
module.exports = {
    send: async (to, subject, template, data) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        let mailOption = {
            from: process.env.EMAIL_FROM, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            // text: JSON.stringify(data), // plain text body
            html: emailFormat(htmlFormates[template], data) // html body
        };
        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
            }
        })


    }
}

