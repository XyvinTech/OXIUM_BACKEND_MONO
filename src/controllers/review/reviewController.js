const moment = require("moment");
const mongoose = require("mongoose");
const createError = require("http-errors");
const Review = require("../../models/reviewSchema");
const {
  getFilteredReviewsPipeline,
  getReviewByChargingStationPipeline,
} = require("./pipes");
const { reviewEditSchema } = require("../../validation");

// Create a new reviewss
exports.createReview = async (req, res) => {
  const { user, chargingStation, evMachine, rating, comment } = req.body;

  if (!chargingStation) throw new createError(400, " chargingStation required");
  if (!rating && !comment)
    throw new createError(400, "rating or comment required");

  //if user already added review for a charging station,
  const duplicateEntryFound = await Review.findOne(
    { user, chargingStation },
    "_id"
  );
  if (duplicateEntryFound) {
    let updateBody = {};
    if (rating) updateBody.rating = rating;
    if (comment) updateBody.comment = comment;

    await Review.updateOne(
      { _id: duplicateEntryFound._id },
      { $set: updateBody }
    );
    res.status(201).json({
      status: true,
      message: "Ok",
      result: "Review updated Successfully",
    });
  } else {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json({ status: true, message: "Ok", result: savedReview });
  }
};

// Get a review list
exports.getReviewList = async (req, res) => {
  const review = await Review.find({});
  if (!review) {
    res.status(404).json({ status: false, message: "Review not found" });
  } else {
    res.status(200).json({ status: true, message: "Ok", result: review });
  }
};

exports.filteredReviews = async (req, res) => {
  let user = req.query.user;
  let chargingStation = req.query.chargingStation;

  let filter = {};
  if (chargingStation)
    filter.chargingStation = new mongoose.Types.ObjectId(chargingStation);
  if (user) filter.user = new mongoose.Types.ObjectId(user);

  const aggregatedData = await Review.aggregate(
    getFilteredReviewsPipeline(filter)
  );

  const transformResponse = (originalResponse) => {
    const transformedResult = originalResponse.map((reviewGroup) => {
      return {
        chargingStationId: reviewGroup.chargingStation,
        reviews: reviewGroup.reviews.map((review) => {
          return {
            _id: review.user._id, // Assuming you have an ID for each review
            rating: review.user.rating,
            comment: review.user.comment,
            username: review.user.username,
            image: "https://picsum.photos/seed/picsum/200/300", // Replace with the actual image URL
            createdAt: moment(review.user.createdAt).format(
              "DD-MM-YYYY hh:mma"
            ), // Replace with the actual creation date
          };
        }),
      };
    });

    return {
      transformedResult,
    };
  };

  let result = transformResponse(aggregatedData);

  res.status(200).json({
    status: true,
    message: "Ok",
    result: result.transformedResult[0]
      ? result.transformedResult[0].reviews
      : [],
  });
};

// Get a review by ID
exports.getReviewById = async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    res.status(404).json({ status: false, message: "Review not found" });
  } else {
    res.status(200).json({ status: true, message: "Ok", result: review });
  }
};

// Get a review list
exports.getReviewList = async (req, res) => {
  const review = await Review.find({});
  if (!review) {
    res.status(404).json({ status: false, message: "Review not found" });
  } else {
    res.status(200).json({ status: true, message: "Ok", result: review });
  }
};

// Update a review by ID
exports.updateReview = async (req, res) => {
  const { error, value } = reviewEditSchema.validate(req.body);
  if (error)
    throw new createError(
      400,
      error.details.map((detail) => detail.message).join(", ")
    );

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.reviewId,
    { $set: req.body },
    { new: true }
  );
  if (!updatedReview) {
    res.status(404).json({ status: false, message: "Review not found" });
  } else {
    res
      .status(200)
      .json({ status: true, message: "Ok", result: updatedReview });
  }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
  const deletedReview = await Review.findByIdAndDelete(req.params.reviewId);
  if (!deletedReview) {
    res.status(404).json({ status: false, message: "Review not found" });
  } else {
    res.status(204).json({ status: true, message: "Ok" });
  }
};

exports.getReviewByChargingStation = async (req, res) => {
  let chargingStationId = req.body.chargingStation;

  const aggregatedData = await Review.aggregate(
    getReviewByChargingStationPipeline(chargingStationId)
  );

  const transformResponse = (originalResponse) => {
    const transformedResult = originalResponse.map((reviewGroup) => {
      return {
        chargingStationId: reviewGroup.chargingStation,
        reviews: reviewGroup.reviews.map((review) => {
          return {
            _id: review.user._id, // Assuming you have an ID for each review
            rating: review.user.rating,
            comment: review.user.comment,
            username: review.user.username,
            image: "https://picsum.photos/seed/picsum/200/300", // Replace with the actual image URL
            createdAt: moment(review.user.createdAt).format(
              "DD-MM-YYYY hh:mma"
            ), // Replace with the actual creation date
          };
        }),
      };
    });

    return {
      transformedResult,
    };
  };

  let result = transformResponse(aggregatedData);

  res.status(200).json({
    status: true,
    message: "Ok",
    result: result.transformedResult[0]
      ? result.transformedResult[0].reviews
      : [],
  });
};

exports.getAverageRating = async (req, res, internalCall = false) => {
  const { chargingStation, evMachine } = req.params;
  let selectorBody = {};
  if (chargingStation) selectorBody.chargingStation = chargingStation;
  if (evMachine != "null") selectorBody.evMachine = evMachine;
  else selectorBody.evMachine = { $exists: false }; //doing this because , in the case where a review is added for chargingStation, evMachine field will not be there
  const review = await Review.find(
    selectorBody,
    "user rating comment createdAt"
  );
  const sumOfRating = review.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.rating;
  }, 0);
  const averageRating = review.length ? sumOfRating / review.length : 0;
  const result = averageRating;
    if (internalCall === true) return result;
  res.status(200).json({ status: true, result, message: "Ok" });
};
