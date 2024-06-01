const notificationRoute = require("express").Router();
const multer = require("multer");
const {
  sendNotification,
  dashboardEmail,
  sendMailToAdmin,
} = require("../../controllers/notification/emailController");
const {
  userNotificationList,
  dashboardFirebase,
  saveNotification,
} = require("../../controllers/notification/firebaseController");
const asyncHandler = require("../../utils/asyncHandler");
const { sendSms } = require("../../controllers/notification/smsController");
const upload = multer({ storage: multer.memoryStorage() });

// send mail notification
notificationRoute.post(
  "/notification/sendMail",
  asyncHandler(sendNotification)
);
notificationRoute.post(
  "/notification/dashboard/email",
  upload.single("file"),
  asyncHandler(dashboardEmail)
);
notificationRoute.post(
  "/notification/sendMailToAdmin",
  asyncHandler(sendMailToAdmin)
);

//push Notification
notificationRoute.get(
  "/notification/list/:userId",
  asyncHandler(userNotificationList)
);
notificationRoute.post(
  "/notification/dashboard/firebase",
  asyncHandler(dashboardFirebase)
);
notificationRoute.post("/notification/save", asyncHandler(saveNotification));

//sms
notificationRoute.post("/notification/sendSms", asyncHandler(sendSms));

module.exports = notificationRoute;
