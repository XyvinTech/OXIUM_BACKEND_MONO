const paymentRoute = require("express").Router();
const paymentController = require('../../controllers/payment/paymentController');
const authVerify = require("../../middlewares/authVerify");
const asyncHandler = require("../../utils/asyncHandler");

paymentRoute.post(
  "/payment/paymentOrder",
  authVerify,
  asyncHandler(paymentController.createPaymentOrder)
);

paymentRoute.post(
  "/payment/paymentVerify",
  authVerify,
  asyncHandler(paymentController.paymentVerify)
);

paymentRoute.get(
  "/payment/paymentVerify/v2",
  asyncHandler(paymentController.khaltiVerify)
);

module.exports = paymentRoute;
