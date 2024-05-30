const mongoose = require('mongoose');

const chargingTariffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    tariffType: {
        type: String,
        enum: ['energy', 'time'],
        default: 'energy'
    },
    value: {
        type: Number,
        required: true
    },
    serviceAmount: {
        type: Number,
        required: true
    },
    tax: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tax',
        required: true,
    },
    isDefault: {
        type: Boolean,
        default: false 
    },
}, { timestamps: true });

const chargingTariff = mongoose.model('chargingTariff', chargingTariffSchema);

module.exports = chargingTariff;
