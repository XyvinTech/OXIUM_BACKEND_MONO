const Joi = require("joi");

// Joi schema for the main vehicle
const vehicleValidationSchema = Joi.object({
  modelName: Joi.string().required(),
  numberOfPorts: Joi.number(),
  icon: Joi.string().required(),
  brand: Joi.string(),
  compactable_port: Joi.array(),
});

module.exports = { vehicleValidationSchema };
