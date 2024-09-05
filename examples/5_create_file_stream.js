const loggMe = require('../lib/loggMe');

/**
 * Create a json logging stream to a file. 
 * Colorful dev format does not look good on a file.
 */
loggMe.createFileStream('./logs.txt')
    .setLogFormat('json')

loggMe.info('Log this info message.')
loggMe.fatal(new Error("Something unexpected happened."))