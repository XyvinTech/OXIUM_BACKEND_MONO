const { firebase } = require("../config/firebaseInit");

function sendPushNotification(deviceToken, payload) {
  const message = {
    ...payload,
    token: deviceToken,
  };

  return firebase.messaging().send(message);
}

async function sendPushNotificationToAll(payload) {
  const topic = "general";
  const message = {
    notification: payload,
    data: { startCharge: "false" },
  };
  firebase
    .messaging()
    .sendToTopic(topic, message)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}

module.exports = { sendPushNotificationToAll, sendPushNotification };
