const mongoose = require('mongoose')





const oemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true
    }
  },
  { timestamps: true }

)




const OEM = mongoose.model('OEM', oemSchema)

module.exports =  OEM ;
