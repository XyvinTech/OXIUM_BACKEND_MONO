const createError = require("http-errors");
const { sendEmail } = require("../../helpers/emailSender");

// send notification
exports.sendNotification = async (req, res) => {
  const { email, subject, notificationHeading, notificationContent } = req.body;
  const htmlContent = `
    <div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
      <h2>${notificationHeading}</h2>
      <h4></h4>
      <p style="margin-bottom: 30px;">${notificationContent}</p>
    </div>
  `;
  try {
    await sendEmail({
      to: email,
      subject: subject,
      html: htmlContent,
    });
    res.status(201).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return next(createError(400, "Failed to send email."));
  }
};

exports.dashboardEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  const attachment = req.file;

  const attachments = attachment
    ? [
        {
          filename: attachment.originalname,
          content: attachment.buffer,
          contentType: attachment.mimetype,
        },
      ]
    : [];

  try {
    await sendEmail({
      to: to,
      subject: subject,
      text: text,
      attachments: attachments,
    });
    res.status(201).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(400).json({ error: "Failed to send email." });
  }
};

exports.sendMailToAdmin = async (req, res, internalCall = false) => {
  const { name, email, designation, password } = req.body;

  const subject = ` Welcome mail`;
  const text = `Welcome  ${name}.
     Your ${email} is designated to ${designation} and your current password is ${password}
     You can change your password through site
     Regards,
     GOEC Team
      `;

  try {
    await sendEmail({ to: email, subject, text });
    if (internalCall === true) return;
    res.status(201).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(400).json({ error: "Failed to send email." });
  }
};
