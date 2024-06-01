var firebase = require("firebase-admin");

var serviceAccount = require("./firebase.config.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

module.exports = { firebase };
