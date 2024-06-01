const moment = require("moment");
const AWS = require("aws-sdk");
const Notification = require("../../models/notificationSchema");
const {
  sendPushNotificationToAll,
  sendPushNotification,
} = require("../../helpers/firebaseClient");
const { getNotificationPipeline } = require("./pipes");
AWS.config.update({
  region: process.env.MY_AWS_REGION,
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
// get user notification list
exports.userNotificationList = async (req, res) => {
  const userId = req.params.userId;
  let notificationList = await Notification.find(
    { sendTo: userId },
    "title body image createdAt"
  ).sort({ createdAt: -1 });

  notificationList = notificationList.map((notification) => {
    const formattedNotification = notification.toObject(); // Convert document to a plain JavaScript object
    // Format the createdAt field
    formattedNotification.createdAt = moment(
      formattedNotification.createdAt
    ).format("YYYY-MM-DD HH:mm:ss.SSS");
    return formattedNotification;
  });

  res
    .status(200)
    .json({ message: "Ok", result: notificationList, status: true });
};

exports.saveNotification = async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const users = req.body.users;

  if (!title) throw new Error("title is required");
  if (!body) throw new Error("body is required");
  if (!users) throw new Error("users is required");
  if (!Array.isArray(users) || !users.length)
    throw new Error("users should be an array");

  const notification = new Notification({ title, body, sendTo: users });
  const savedNotification = await notification.save();

  res
    .status(200)
    .json({ message: "Ok", result: savedNotification, status: true });
};

exports.dashboardFirebaseToAll = async (req, res) => {
  let payload = {
    title: "Testing",
    body: "Testing123",
  };

  await sendPushNotificationToAll(payload);

  const result = await Notification.aggregate(getNotificationPipeline());

  const allUsers = result[0].users
    ? result[0].users.map((user) => user._id.toString())
    : [];
  const notification = new Notification({
    title: payload.title,
    body: payload.body,
    sendTo: allUsers,
  });
  const savedNotification = await notification.save();

  res.status(200).json({ message: "OK" });
};

exports.dashboardFirebase = async (req, res) => {
  const { to, subject, text, url, userArray, imagePath } = req.body;

  const tokensArray = to.split(",");

  let payload = {
    notification: {
      title: subject,
      body: text,
    },
    data: {
      notify: "EcGo",
      attachmentUrl: imagePath,
    },
  };

  // Improved error and success handling
  let failures = [];
  let successCount = 0;

  for (const userToken of tokensArray) {
    try {
      await sendPushNotification(userToken, payload);
      successCount++;
    } catch (error) {
      console.error(`Error sending to ${userToken}:`, error);
      failures.push(userToken);
    }
  }

  if (userArray) {
    const userIdsArray = userArray.split(",");
    const notification = new Notification({
      title: subject,
      body: text,
      sendTo: userIdsArray,
      image: imagePath,
    });
    const savedNotification = await notification.save();
  }

  if (failures.length > 0) {
    return res.status(207).json({
      // HTTP 207 Multi-Status
      message: "Partial Success",
      successCount,
      failures,
    });
  }

  res.status(200).json({ message: "OK" });
};
