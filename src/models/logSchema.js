const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
  level: {
    type: String,
  },
  message: {
    type: String,
  },
  label: {
    type: String,
  },
  timestamps: { type: Date },
})

const Log = mongoose.model('Log', logSchema, 'errorLogs');

module.exports = Log
