const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chargingStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chargingStation',
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: String,

},{
  timestamps:true
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
