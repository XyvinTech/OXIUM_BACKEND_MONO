require("dotenv");
const connectDB = require("./src/db");
const app = require("./src/app.js");
const green = "\x1b[32m";
const reset = "\x1b[0m";

const initializeApp = async () => {
  connectDB();

  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(
      `${green}Server running in ${process.env.NODE_ENV} mode on port ${PORT}${reset}`
    );
  });
};

initializeApp();
