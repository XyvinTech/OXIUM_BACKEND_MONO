const reviewRoute = require('express').Router()
const asyncHandler = require('../../utils/asyncHandler')
const reviewController = require('../../controllers/review/reviewController')

//CRUD operations
reviewRoute
  .post('/review/create', asyncHandler(reviewController.createReview))
  .get('/review/list', asyncHandler(reviewController.getReviewList))
  .get('/review/filteredList', asyncHandler(reviewController.filteredReviews))
  .get('/review/:reviewId', asyncHandler(reviewController.getReviewById))
  .put('/review/:reviewId', asyncHandler(reviewController.updateReview))
  .delete('/review/:reviewId', asyncHandler(reviewController.deleteReview))
  .post('/review/getReviews', asyncHandler(reviewController.getReviewByChargingStation))
  .get('/reviews/averageRating/:chargingStation/:evMachine', asyncHandler(reviewController.getAverageRating))

  .get('/review/byChargingStation/:chargingStation', asyncHandler(reviewController.getReviewByChargingStation))



module.exports = reviewRoute
