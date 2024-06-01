const smsClient = require("../../helpers/smsClient.js");
const { sendTwilioOTP } = require("../../helpers/twilioClient.js");

// send sms notification
exports.sendSms = async (req, res) => {
  let { phoneNumber, otp } = req.body;
  const countryCode = "+91"; // Country code for India
  let result;
  if (phoneNumber.startsWith(countryCode)) {
    const user = {
      phone: phoneNumber.substring(countryCode.length), // Remove countryCode and non-digit characters
      otp: otp,
    };

    result = await smsClient.sendOTP(user);
  } else {
    result = await sendTwilioOTP(phoneNumber, otp);
  }
  console.log(phoneNumber, otp);
  res.status(200).json({ status: true, message: "OTP sent successfully" });
};
