require('dotenv').config();
const loggMe = require('./lib/loggMe');

// console.log(loggMe)

// loggMe.setLogLevel("DEBUG")
console.log(loggMe.getLogLevel())

loggMe.debug("debug....")
loggMe.warn('warn.....')