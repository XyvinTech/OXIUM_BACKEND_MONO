const mongoose = require('mongoose')

const evConnectorSchema = new mongoose.Schema(
    {
        connectorId: {
            type: Number      
        },
        type: String,
        energy:String,
    }
)

const EVModelSchema = new mongoose.Schema(

    {
        oem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OEM',
        },

        model_name: {
            type: String,
        },
        output_type: {
            type: String,
           
        },
        ocpp_version: {
            type: String,
          
        },
        charger_type: [String],

        rated_voltages: {
            type: String,
        },
        capacity: {
            type: String,
        },
        no_of_ports: Number,
        connectors: [evConnectorSchema]
    },

    { timestamps: true }
)




const EVModel = mongoose.model('ev_model', EVModelSchema)
module.exports = EVModel; 