const Joi = require('joi');

// Joi schema for each charging port
const EVPortJoiSchema = Joi.object({
    evPortSeq: Joi.number().required(),
    connectorType: Joi.string().required(),
    energyKWh: Joi.number(),
});

// Joi schema for the main vehicle
const vehicleValidationSchema = Joi.object({
    modelName: Joi.string().required(),
    numberOfPorts: Joi.number(),
    icon: Joi.string().required(),
    brand: Joi.string(), // Assuming brand is a string identifier; adjust as needed
    compactable_port: Joi.array(),
});


// Joi schema for the main vehicle
const vehicleUpdateValidationSchema = Joi.object({
    modelName: Joi.string(),
    numberOfPorts: Joi.number(),
    icon: Joi.string(),
    // id: Joi.number(),
    brand: Joi.string(), // Assuming brand is a string identifier; adjust as needed
    evPort: Joi.array().items(EVPortJoiSchema),
});

module.exports = { vehicleValidationSchema, vehicleUpdateValidationSchema};
