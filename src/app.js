require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const volleyball = require("volleyball");
const errorHandler = require("./middlewares/errorMiddleware.js");
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//! DONOT DELETE
app.get("/api/health-check", (req, res) => {
  res.status(200).send("connected to oxium-service api!!!");
});

app.use(logger("dev"));

// Define the API version based on environment variable
const { API_VERSION } = process.env || "v1";
// Set the base path for API routes
const BASE_PATH = `/api/${API_VERSION}`;

app.get(BASE_PATH, (req, res) =>
  res.status(200).send(" All endpoints are 🔐. Do you have the 🔑")
);

// 404
app.all("*", (req, res, next) => {
  const err = new createError(
    404,
    `Cant find the ${req.originalUrl} on the OXIUM server !`
  );
  next(err);
});
app.use(errorHandler);

// Export the Express app for use in the handler.js file
module.exports = app;
