const Joi = require("joi");

// Joi schema for the main vehicle
const vehicleValidationSchema = Joi.object({
  modelName: Joi.string().required(),
  numberOfPorts: Joi.number(),
  icon: Joi.string().required(),
  brand: Joi.string(),
  compactable_port: Joi.array(),
});

const reviewEditSchema = Joi.object({
  // user: Joi.string(),
  chargingStation: Joi.string(),
  evMachine: Joi.string(),
  rating: Joi.number().min(0).max(5),
  comment: Joi.string(),
});

module.exports = { vehicleValidationSchema, reviewEditSchema };
