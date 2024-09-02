const loggMe = require('./lib/loggMe');

console.log(loggMe)

loggMe.setArg1("arbitraryArg")

console.log(loggMe.getArg1())