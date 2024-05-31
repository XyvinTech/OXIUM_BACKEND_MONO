const transactionRoute = require('express').Router()
const asyncHandler = require('../../utils/asyncHandler')
const transactionController = require("../../controllers/transaction/transactionController")

//Wallet Transaction apis
transactionRoute
  .post('/walletTransaction/create', asyncHandler(transactionController.createWalletTransaction))
  .post('/walletTransaction/createOrUpdate', asyncHandler(transactionController.createOrUpdateTransaction))
  .get('/walletTransaction/list', asyncHandler(transactionController.getWalletTransactionList))
  .post('/walletTransaction/filteredList', asyncHandler(transactionController.getFilteredWalletTransactionList))
  .get('/walletTransaction/:transactionId', asyncHandler(transactionController.getWalletTransactionById))
  .put('/walletTransaction/:transactionId', asyncHandler(transactionController.updateWalletTransaction))
  .delete('/walletTransaction/:transactionId', asyncHandler(transactionController.deleteWalletTransaction))

  .get('/walletTransaction/dashboard/list', asyncHandler(transactionController.dashboardTransactionList))
  .get('/walletTransaction/dashboard/report', asyncHandler(transactionController.getReport))
  .post('/walletTransaction/dashboardUser/list', asyncHandler(transactionController.dashboardUserTransactionList))

module.exports = transactionRoute
