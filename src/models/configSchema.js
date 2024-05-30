const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ['rfid-default-price', 'minimum-wallet-requirement', 'minimum-transaction-wallet-requirement']
    },
    value: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Config = mongoose.model('config', configSchema);

module.exports = Config;
