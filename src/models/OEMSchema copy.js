const mongoose = require('mongoose')

// Define the RFID Tag schema
const oemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,      
    },
    model_name: {
        type: String,   
      },
  output_type:{    
        type: String,
        enum: ['AC', 'DC'],      
  },
  ocpp_version:{
    type: String,
    enum: ['1.6', '1.6J', '2.0'], 
  },
  rated_voltages:{
    type: Number,
  },
  capacity:{
    type: Number,
  },
  no_of_ports: Number,
  type_of_port:[{type:String}]},
  { timestamps: true }
)

const OEM = mongoose.model('OEM', oemSchema)

module.exports = OEM
