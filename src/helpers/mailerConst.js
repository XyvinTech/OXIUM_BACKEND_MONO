require('dotenv').config()
const nodemailer = require('nodemailer');

const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "nodetest4342",
        pass: "tucandzsgzzgqxdd"
    },
});

const senderName = "ECGO"
const senderMail = "nodetest4342"

const textLocalApiKey = process.env.TEXTLOCAL_API_KEY || ''

module.exports = {emailTransporter, senderName, senderMail, textLocalApiKey};

