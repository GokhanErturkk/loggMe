require('dotenv').config();
const loggMe = require('./lib/loggMe');
const hostname = require('os').hostname();

loggMe.setContext(
    { hostname, pid: process.pid }
)


console.log(loggMe.getLogLevel())


// loggMe.error(new Error("Something unexpected happened."))  // first
// loggMe.warn('Warning message.')     // second
// loggMe.warn({key1:"val1"}, "warning message") // third




