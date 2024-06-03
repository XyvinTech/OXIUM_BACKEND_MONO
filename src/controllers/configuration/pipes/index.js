const getChargingTariffListPipeline = (filter) => [
  {
    $lookup: {
      from: "taxes",
      localField: "tax",
      foreignField: "_id",
      as: "taxData",
    },
  },
  { $match: filter },
  {
    $unwind: "$taxData",
  },
];

module.exports = { getChargingTariffListPipeline };
