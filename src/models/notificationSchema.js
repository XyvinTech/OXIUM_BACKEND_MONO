const mongoose = require('mongoose')

// Define the User schema
const notificationSchema = new mongoose.Schema({
  title: String,
  body: {
    type: String,

  },
  // url: {
  //   type: String,

  // },
  sendTo: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
  }]
  },
  image: String,
}, { timestamps: true })

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification
