require('dotenv').config();
const loggMe = require('./lib/loggMe');
const hostname = require('os').hostname();

loggMe.setContext(
    { hostname, pid: process.pid }
)


console.log(loggMe.getLogLevel())

loggMe.debug("debug....")
loggMe.warn('warn.....')


