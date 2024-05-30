const mongoose = require('mongoose')

// Define the User schema
const userSchema = new mongoose.Schema({
  username: String,
  total_sessions: { type: Number, default: 0 },
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  userId: {
    type: String,
  
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
  },
  wallet: {
    type: Number,
    default: 0,
  },
  firebaseToken: {
    type: String,
    default: null
  },
  otp: String,
  total_units: { type: Number, default: 0 },
  vehicle: [
    {
      // _id: false, // This ensures that each subdocument in the array does not get its own ObjectId
      vehicleRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
      },
      evRegNumber: String,
      defaultVehicle: Boolean
    },
  ],
  defaultVehicle: String,
  rfidTag: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RfidTag',
    },
    
  ],
  favoriteStations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChargingStation',
    },
  ],
  chargingTariff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChargingTariff',
  },
  image: {
    type: String
  },
  //  fields for managing user activity and subscriptions
  emailSubscribed: { type: Boolean, default: true },
  pushNotificationSubscribed: { type: Boolean, default: true },
  emailUnsubscribedAt: Date,
  pushNotificationUnsubscribedAt: Date,
  lastActivity: Date,
}, { timestamps: true })


// @ts-ignore
userSchema.pre('save', function(next) {
  this.lastActivity = new Date();
  next();
});

const User = mongoose.model('User', userSchema)

module.exports = User
