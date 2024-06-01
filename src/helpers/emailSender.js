const { emailTransporter, senderName, senderMail } = require("./mailerConst");

const sendEmail = async ({ to, subject, text, html, attachments }) => {
  const mailOptions = {
    from: `"${senderName}" <${senderMail}>`,
    to: to,
    subject: subject,
    text: text,
    html: html,
    attachments: attachments,
  };

  return new Promise((resolve, reject) => {
    emailTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = { sendEmail };
