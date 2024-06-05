const mongoose = require("mongoose");

const getFilteredReviewsPipeline = (filter) => [
  { $match: filter },
  {
    $lookup: {
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "userData",
    },
  },
  { $unwind: "$userData" },
  {
    $group: {
      _id: "$chargingStation",
      reviews: {
        $push: {
          user: {
            _id: "$_id",
            username: "$userData.username",
            user_phone: "$userData.mobile",
            rating: "$rating",
            comment: "$comment",
            createdAt: "$createdAt",
          },
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      chargingStation: "$_id",
      reviews: 1,
    },
  },
];

const getReviewByChargingStationPipeline = (chargingStationId) => [
  { $match: { chargingStation: new mongoose.Types.ObjectId(chargingStationId) } },
  {
    $lookup: {
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "userData",
    },
  },
  { $unwind: "$userData" },
  {
    $group: {
      _id: "$chargingStation",
      reviews: {
        $push: {
          user: {
            _id: "$_id",
            username: "$userData.username",
            user_phone: "$userData.mobile",
            rating: "$rating",
            comment: "$comment",
            createdAt: "$createdAt",
          },
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      chargingStation: "$_id",
      reviews: 1,
    },
  },
];

module.exports = {
  getFilteredReviewsPipeline,
  getReviewByChargingStationPipeline,
};
