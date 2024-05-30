const mongoose = require('mongoose')

// Define the RFID Tag schema
const rfidSchema = new mongoose.Schema(
  {
    rfidTag:{
      type: String,
      required: true,
      unique: true,
    },
    serialNumber: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive','assigned', 'unassigned'], 
      default: 'inactive', 
    },
    expiry:{type:Date},
    rfidType:String

  },
  { timestamps: true }
)

const RfidTag = mongoose.model('rfidTag', rfidSchema)

module.exports = RfidTag
