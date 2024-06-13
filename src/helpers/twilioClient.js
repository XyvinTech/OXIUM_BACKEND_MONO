require('dotenv').config()
console.log('asdasd',process.env.TWILIO_ACCOUNT_SID)
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serviceSid = process.env.TWILIO_SERVICE_SID
const client = require('twilio')(accountSid, authToken)

const sendTwilioOTP = async (phoneNumber, otp) => {
  const sendOTP = await client.verify.v2
    .services(serviceSid)
    .verifications.create({
      customCode: otp,
      to: phoneNumber,
      channel: 'sms',
    })
  return sendOTP
}

module.exports = { sendTwilioOTP }
