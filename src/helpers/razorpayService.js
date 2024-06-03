const Razorpay = require("razorpay");
const createError = require("http-errors");
const generateUniqueReceiptID = require("../utils/generateUniqueID");

exports.createRazorPaymentOrder = async (amount, currency) => {
  try {
    const instance = new Razorpay({
      // key_id: process.env.RAZORPAY_ID_KEY,
      // key_secret: process.env.RAZORPAY_SECRET_KEY,
      // key_id: process.env.RAZOR_TEST_ID,
      // key_secret: process.env.RAZOR_TEST_SECRET,
    });

    // setting up options for razorpay order.
    const options = {
      amount: Number(amount) * 100,
      currency: currency,
      receipt: generateUniqueReceiptID(),
    };

    const order = await instance.orders.create(options);

    if (order.error) {
      throw order.error;
    }
    return order;
  } catch (error) {
    console.log(error);
    throw new createError(400, "Bad request - Payment Gateway");
  }
};
