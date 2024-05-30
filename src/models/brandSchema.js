const mongoose = require('mongoose');

// Schema for each brand
const brandSchema = new mongoose.Schema({
  brandName: String,
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand