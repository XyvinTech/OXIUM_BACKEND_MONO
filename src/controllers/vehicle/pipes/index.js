const getVehiclePipeline = (filter) => [
  { $sort: { updatedAt: -1 } },
  { $match: filter },
  {
    $project: {
      _id: 1,
      modelName: 1,
      numberOfPorts: 1,
      evPort: 1,
      brand: 1,
      icon: 1,
      compactable_port: 1,
    },
  },
];

module.exports = { getVehiclePipeline };
