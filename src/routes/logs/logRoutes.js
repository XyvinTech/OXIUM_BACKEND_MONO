const logRoute = require("express").Router();
const logsController = require("../../controllers/logs/logController");
const asyncHandler = require("../../utils/asyncHandler");

logRoute.get("/logs", asyncHandler(logsController.getLogs));

module.exports = logRoute;
