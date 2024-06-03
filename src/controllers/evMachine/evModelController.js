const createError = require("http-errors");
const mongoose = require("mongoose");
const EvModel = require("../../models/evModelSchema");
const { getEvModelsPipeline } = require("./pipes");

// Create a new EvModel
exports.createEvModel = async (req, res) => {
  let value = req.body;
  const evModel = new EvModel(value);

  const uniqueConnectorTypes = [
    ...new Set(evModel.connectors.map((connector) => connector.type)),
  ];
  evModel.charger_type = [...evModel.charger_type, ...uniqueConnectorTypes];

  const savedEvModel = await evModel.save();

  res.status(201).json({ status: true, message: "OK", result: savedEvModel });
};

exports.getEvModels = async (req, res) => {
  const { pageNo, searchQuery } = req.query;

  const filter = {};

  if (searchQuery) {
    filter.$or = [
      { "oemDetails.name": { $regex: searchQuery, $options: "i" } },
      { "oemDetails.oem": { $regex: searchQuery, $options: "i" } },
      { model_name: { $regex: searchQuery, $options: "i" } },
    ];
  }

  try {
    const evModelPipeline = getEvModelsPipeline(filter);
    const evModelData = await EvModel.aggregate(evModelPipeline)
      .skip(10 * (pageNo - 1))
      .limit(10);
    const totalCount = await EvModel.find(filter).countDocuments();

    res
      .status(201)
      .json({ status: true, message: "OK", result: evModelData, totalCount });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getEvModelsDropdown = async (req, res) => {
  const filter = {};

  const evModelPipeline = getEvModelsPipeline(filter);
  const evModelData = await EvModel.aggregate(evModelPipeline);
  let totalCount = await EvModel.find(filter).countDocuments();

  res
    .status(201)
    .json({ status: true, message: "OK", result: evModelData, totalCount });
};

// update EvModel by id
exports.updateEvModel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new createError(400, `Invalid id ${id}`);
  }

  let value = req.body;

  const updatedEvModel = await EvModel.findByIdAndUpdate(id, value, {
    new: true,
  });
  if (!updatedEvModel) {
    throw new createError(404, `EvModel with id ${id} not found`);
  }

  const uniqueConnectorTypes = [
    ...new Set(updatedEvModel.connectors.map((connector) => connector.type)),
  ];
  updatedEvModel.charger_type = [
    ...updatedEvModel.charger_type,
    ...uniqueConnectorTypes,
  ];

  const savedEvModel = await updatedEvModel.save();

  res.status(200).json({ status: true, message: "OK", result: savedEvModel });
};

// delete EvModel by id
exports.deleteEvModel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new createError(400, `Invalid id ${id}`);
  }

  const data = await EvModel.findByIdAndDelete(id);
  if (!data) {
    throw new createError(404, `EvModel with id ${id} not found`);
  }
  res.status(200).json({ status: true, message: "OK", result: data });
};

// get EvModel data by id
exports.getEvModel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new createError(400, `Invalid id ${id}`);
  }

  const data = await EvModel.findById(id);
  if (!data) {
    throw new createError(404, `EvModel with id ${id} not found`);
  }
  res.status(200).json({ status: true, message: "OK", result: data });
};
