require('dotenv').config();
const loggMe = require('./lib/loggMe');
const hostname = require('os').hostname();

loggMe.setContext(
    { hostname, pid: process.pid }
)

loggMe.setContext()

// console.log(loggMe.getLogLevel())


// loggMe.info(new Error("Something unexpected happened."))  // first
// loggMe.info(new Error("Something unexpected happened."))  // first
loggMe.error(new Error("Something unexpected happened."))  // first
//  loggMe.warn('Warning message.')     // second
// loggMe.warn({key1:"val1"}, "warning message") // third




