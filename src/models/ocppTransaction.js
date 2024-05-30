const mongoose = require('mongoose');

// Define the schema for OCPP transactions
const ocppTransactionSchema = new mongoose.Schema({
    transactionId: {
        type: Number,
        required: true,
        unique: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
    },
    duration: {
        type: Number,
    },
    startSoc: {
        type: Number,
        default:0
    },
    currentSoc: {
        type: Number,
    },
    
    meterStart: {
        type: Number,
    },
    meterStop: {
        type: Number,
    },
    idtag: String,
    energyConsumed: {
        type: Number,

    },
    cpid: {
        type: String,
        required: true,
    },
    connectorId: {
        type: Number,
        required: true,
    },
    closureReason: {
        type: String,
    },
    transactionMode: {
        type: String,
      
    },
    closeBy: {
        type: String,
    },
    totalAmount: {
        type: Number,
        default: 0,
    },
    totalUnits: {
        type: Number,
        default: 0,
    },
    chargingTariff: {
        type: Number,
    },
    chargeSpeed:String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    lastMeterValue: {
        type: Number,
    },
    walletTransactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'walletTransaction',
    },
    transaction_status: {
        type: String  
    },
    tax: {
        type: String
    }
},{
    timestamps: true});


// ocppTransactionSchema.pre('save', function (next) {
//     if (this.endTime && this.meterStop) {
//         this.duration = (this.endTime - this.startTime) / 1000;

//         this.energyConsumed = this.meterStop - this.meterStart;

//         this.totalAmount = calculateTotalAmount(this.energyConsumed);
//     }

//     next();
// });

// function calculateTotalAmount(energyConsumed) {
//     const ratePerKWh = 0.10;
//     return energyConsumed * ratePerKWh;
// }



// Create a model using the schema
const OCPPTransaction = mongoose.model('OCPPTransaction', ocppTransactionSchema);

module.exports = OCPPTransaction;
