const getNotificationPipeline = () => [
  { $limit: 1 },
  {
    $lookup: {
      from: "users",
      pipeline: [],
      as: "users",
    },
  },
  {
    $project: {
      _id: 1,
      users: "$users._id",
    },
  },
];

module.exports = { getNotificationPipeline };
