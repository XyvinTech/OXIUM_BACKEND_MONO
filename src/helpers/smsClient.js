//This code was posted for an article at https://codingislove.com/send-sms-developers/

const axios = require("axios");
const qs = require("querystring");

const smsClient = {
  sendOTP: async (user) => {
    if (user && user.phone && user.otp) {
      let sender = "GOECWO";

      let message = `Hi user , ${user.otp} is your OTP to login to GOEC APP`;

      const postData = {
        apikey: process.env.TEXT_LOCAL_API_KEY,
        numbers: user.phone, // Joining array of numbers into a comma-separated string
        sender: encodeURIComponent(sender),
        message: encodeURIComponent(message),
      };

      try {
        const response = await axios.post(
          "https://api.textlocal.in/send/",
          qs.stringify(postData)
        );
        return { data: response.data, status: response.status }; // Handle the response as needed
      } catch (error) {
        console.error("error");
        // Handle or throw the error as needed
      }
    }
  },
};

module.exports = smsClient;
