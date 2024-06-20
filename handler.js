const dotenv = require('dotenv');
const loadSecrets = require('./src/config/env.config');
const connectDB = require('./src/db');
const app = require('./src/app.js');
const green = "\x1b[32m";
const reset = "\x1b[0m";

const initializeApp = async () => {
  if (process.env.NODE_ENV === 'production') {
    try {
      console.log(`${green}Initializing`)
      const envPath = await loadSecrets();
      
      dotenv.config({ path: envPath });
    } catch (err) {
      console.error('Failed to load secrets:', err);
      process.exit(1); 
    }
  } else {
    dotenv.config({ path: '.env' });
  }

  // Connect to the database
  connectDB();

  // Start the server
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`${green}Server running in ${process.env.NODE_ENV} mode on port ${PORT}${reset}`);
  });
};

initializeApp();
