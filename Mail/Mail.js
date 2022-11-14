/* eslint-disable no-console */
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_ACCOUNT, // generated ethereal user
        pass: process.env.MAIL_PASS, // generated ethereal password
    },
});

transporter.verify().then(() => {
    console.log('Email Ready');
});

module.exports = transporter;
