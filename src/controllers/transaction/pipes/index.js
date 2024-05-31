const getTransactionPipeline = (filter) => [
  { $match: { type: { $ne: "charging deduction" } } },
  { $sort: { createdAt: -1 } },
  {
    $lookup: {
      from: "users", // The name of the users collection
      localField: "user",
      foreignField: "_id",
      as: "userDetails",
    },
  },
  { $match: filter },
  {
    $unwind: {
      path: "$userDetails",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $project: {
      amount: 1,
      type: 1,
      status: 1,
      transactionId: 1,
      currency: 1,
      userWalletUpdated: 1,
      user: "$userDetails.username",
      mobile: "$userDetails.mobile",
      external_payment_ref: 1,
      initiated_by: 1,
      reference: 1,
      invoice_id: 1,
      createdAt: 1,
      paymentId: 1,
    },
  },
];

const getTotalCountPipeline = () => [
  { $match: { type: { $ne: "charging deduction" } } },
  { $sort: { createdAt: -1 } },
  {
    $lookup: {
      from: "users", // The name of the users collection
      localField: "user",
      foreignField: "_id",
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
      amount: 1,
      type: 1,
      status: 1,
      transactionId: 1,
      currency: 1,
      userWalletUpdated: 1,
      user: "$userDetails.username",
      external_payment_ref: 1,
      initiated_by: 1,
      reference: 1,
      invoice_id: 1,
      createdAt: 1,
    },
  },
];

const getReportPipeline = (filters) => [
  { $match: filters },
  { $sort: { createdAt: -1 } },
  {
    $lookup: {
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "userDetails",
    },
  },
  {
    $unwind: {
      path: "$userDetails",
      preserveNullAndEmptyArrays: true,
    },
  },
];

module.exports = {
  getTransactionPipeline,
  getTotalCountPipeline,
  getReportPipeline,
};
