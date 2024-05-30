const winston = require('winston')
const { createLogger, format, transports } = winston
const { combine, timestamp, label,  prettyPrint } = format
const mongoose = require('mongoose');
require('winston-mongodb')


const dbName = process.env.DB_NAME || 'OXIUM_DB'
const CATEGORY = 'OXIUM service'

let options = {
  db: mongoose.connection.useDb(dbName),
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  collection: "errorLogs",
  capped: false,
  expireAfterSeconds: 2592000,
  leaveConnectionOpen: false,
  storeHost: false,
  label:`${CATEGORY}`
  
}



const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    prettyPrint()
  ),
  transports: [new transports.Console(), new transports.MongoDB(options)],
})





module.exports = logger
