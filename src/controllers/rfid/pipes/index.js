const getRfidsPipeline = () => [
  { $sort: { updatedAt: -1 } },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "rfidTag",
      pipeline: [
        {
          $project: {
            username: 1,
            wallet: 1,
          },
        },
      ],
      as: "userDetails",
    },
  },
  {
    $unwind: {
      path: "$userDetails",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $project: {
      _id: 1,
      serialNumber: 1,
      status: 1,
      expiry: 1,
      rfidTag: 1,
      createdAt: 1,
      username: "$userDetails.username",
      balance: "$userDetails.wallet",
    },
  },
];

module.exports = { getRfidsPipeline };
