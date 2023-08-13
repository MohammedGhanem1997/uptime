"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationMail = void 0;
const nodemailer_1 = require("@/serviceProvider/utils/nodemailer");
const sendVerificationMail = async (mail) => {
    nodemailer_1.mailer
        .sendMail({
        from: mail.from,
        to: mail.to,
        subject: mail.subject,
        text: mail.text,
    })
        .then((response) => {
        console.log('email sent successfully', response);
    })
        .catch((err) => {
        console.log('Error in sending email: ' + err);
    });
};
exports.sendVerificationMail = sendVerificationMail;
