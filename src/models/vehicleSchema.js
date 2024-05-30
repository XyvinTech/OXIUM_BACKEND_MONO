const mongoose = require('mongoose');

const EVPortSchema = new mongoose.Schema({
  connectorType:String
});



// Schema for each car model
const vehicleSchema = new mongoose.Schema({
  modelName: String,
  numberOfPorts: Number,
  icon: String,
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  compactable_port:Array,
  evPort:[EVPortSchema]
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle