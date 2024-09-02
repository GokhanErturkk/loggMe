const loggMe = require('./lib/loggMe');

console.log(loggMe)

loggMe.setLogLevel("DEBUG")
console.log(loggMe.getLogLevel())