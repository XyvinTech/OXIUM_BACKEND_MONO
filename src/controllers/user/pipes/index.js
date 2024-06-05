const mongoose = require("mongoose");

const getUserListPipeline = (filter) => [
  {
    $sort: {
      createdAt: -1,
    },
  },
  { $match: filter },
  {
    $lookup: {
      from: "chargingtariff",
      localField: "chargingTariff",
      foreignField: "_id",
      as: "tariffValues",
    },
  },
  {
    $lookup: {
      from: "rfidtags",
      localField: "rfidTag",
      foreignField: "_id",
      as: "rfidValues",
    },
  },
  {
    $project: {
      mobile: 1,
      username: 1,
      email: 1,
      rfidValues: 1,
      tariffValues: 1,
    },
  },
];

const getUserDataByIdPipeline = (id) => [
  { $match: { _id: new mongoose.Types.ObjectId(id) } },
  {
    $lookup: {
      from: "ocpptransactions",
      localField: "_id",
      foreignField: "user",
      as: "transactions",
    },
  },
  {
    $unwind: {
      path: "$transactions",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $group: {
      _id: "$_id",
      mobile: { $first: "$mobile" },
      username: { $first: "$username" },
      email: { $first: "$email" },
      total_units: { $first: "$total_units" },
      total_sessions: { $first: "$total_sessions" },
      createdAt: { $first: "$createdAt" },
      wallet: { $first: "$wallet" },
      totalAmount: { $sum: "$transactions.totalAmount" },
    },
  },
  {
    $project: {
      mobile: 1,
      username: 1,
      email: 1,
      total_units: 1,
      total_sessions: 1,
      createdAt: 1,
      wallet: 1,
      totalAmount: 1,
    },
  },
];

const getUserDataByPhoneOrEmailPipeline = (query) => [
  { $match: query },
  {
    $lookup: {
      from: "rfidtags",
      localField: "rfidTag",
      foreignField: "_id",
      as: "rfidDetails",
    },
  },
  {
    $project: {
      mobile: 1,
      username: 1,
      email: 1,
      userId: 1,
      rfidDetails: 1,
    },
  },
];

const getFavoriteStationsPipeline = (id, pageNo) => [
  { $match: { _id: new mongoose.Types.ObjectId(id) } },
  { $unwind: "$favoriteStations" },
  {
    $lookup: {
      from: "chargingstations",
      localField: "favoriteStations",
      foreignField: "_id",
      as: "stationData",
    },
  },
  { $unwind: "$stationData" },
  {
    $project: {
      chargingStationName: "$stationData.name",
      address: "$stationData.address",
      owner: "$stationData.owner",
      latitude: "$stationData.latitude",
      longitude: "$stationData.longitude",
    },
  },
  { $skip: 10 * (pageNo - 1) },
  { $limit: 10 },
];

const getChargingTariffPipeline = (id) => [
  { $match: { _id: new mongoose.Types.ObjectId(id) } },
  {
    $lookup: {
      from: "chargingtariffs",
      localField: "chargingTariff",
      foreignField: "_id",
      as: "tariffDetails",
    },
  },
  {
    $unwind: {
      path: "$tariffDetails",
      preserveNullAndEmptyArrays: false,
    },
  },
  {
    $lookup: {
      from: "taxes",
      localField: "tariffDetails.tax",
      foreignField: "_id",
      pipeline: [
        {
          $project: {
            _id: 0,
            name: 1,
            percentage: 1,
          },
        },
      ],
      as: "taxDetails",
    },
  },
  {
    $unwind: {
      path: "$taxDetails",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $project: {
      _id: 0,
      name: "$tariffDetails.name",
      tariffType: "$tariffDetails.tariffType",
      value: "$tariffDetails.value",
      serviceAmount: "$tariffDetails.serviceAmount",
      taxDetails: "$taxDetails",
    },
  },
];

const getVehicleDetailsPipeline = (id) => [
  { $match: { _id: new mongoose.Types.ObjectId(id) } },
  {
    $unwind: {
      path: "$vehicle",
      preserveNullAndEmptyArrays: false,
    },
  },
  {
    $lookup: {
      from: "vehicles",
      localField: "vehicle.vehicleRef",
      foreignField: "_id",
      as: "vehicleDetails",
    },
  },
  {
    $unwind: {
      path: "$vehicleDetails",
      preserveNullAndEmptyArrays: false,
    },
  },
  {
    $lookup: {
      from: "brands",
      localField: "vehicleDetails.brand",
      foreignField: "_id",
      as: "brandDetails",
    },
  },
  {
    $unwind: {
      path: "$brandDetails",
      preserveNullAndEmptyArrays: false,
    },
  },
  {
    $project: {
      _id: 0,
      evRegNumber: "$vehicle.evRegNumber",
      brand: "$brandDetails.brandName",
      model: "$vehicleDetails.modelName",
      numberOfPorts: "$vehicleDetails.numberOfPorts",
      icon: "$vehicleDetails.icon",
      compactable_port: "$vehicleDetails.compactable_port",
    },
  },
];

const getRfidDetailsPipeline = (id, pageNo) => [
  { $match: { _id: new mongoose.Types.ObjectId(id) } },
  {
    $unwind: {
      path: "$rfidTag",
      preserveNullAndEmptyArrays: false,
    },
  },
  {
    $lookup: {
      from: "rfidtags",
      localField: "rfidTag",
      foreignField: "_id",
      as: "rfidDetails",
    },
  },
  {
    $unwind: {
      path: "$rfidDetails",
      preserveNullAndEmptyArrays: false,
    },
  },
  {
    $project: {
      _id: "$rfidDetails._id",
      serialNumber: "$rfidDetails.serialNumber",
      rfidTag: "$rfidDetails.rfidTag",
      status: "$rfidDetails.status",
      expiry: "$rfidDetails.expiry",
      rfidType: "$rfidDetails.rfidType",
    },
  },
  { $skip: 10 * (pageNo - 1) },
  { $limit: 10 },
];

const getUserByMobilePipeline = (mobileNo) => [
  { $match: { mobile: mobileNo } },
  {
    $lookup: {
      from: "rfidtags",
      localField: "rfidTag",
      foreignField: "_id",
      as: "rfidDetails",
    },
  },
];

module.exports = {
  getUserListPipeline,
  getUserDataByIdPipeline,
  getUserDataByPhoneOrEmailPipeline,
  getFavoriteStationsPipeline,
  getChargingTariffPipeline,
  getVehicleDetailsPipeline,
  getRfidDetailsPipeline,
  getUserByMobilePipeline,
};
