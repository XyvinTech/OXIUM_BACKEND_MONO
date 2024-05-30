const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  amount: Number,
  type: {
    type: String,
    enum: ['charging deduction', 'wallet top-up', 'admin top-up', 'admin deduction', 'other'],
  },
  status: {
    type: String,
    enum: ['success', 'failure', 'pending', 'canceled'],
    default: 'pending',
  },

}, { timestamps: true });
// @ts-ignore
transactionSchema.pre('save', function (next) {
  console.log("check..");
  next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;