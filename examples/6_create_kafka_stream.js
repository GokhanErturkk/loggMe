const loggMe = require('../lib/loggMe');


// create a kafka stream
loggMe.createKafkaStream(['localhost:9092'], 'your-kafka-topic',  "clientid")
    .setLogFormat('json') 


/**
 * Log only string
 * 
 * syntax;
 * loggMe.<debug|info|warn|error|fatal>(string_Message)
 */
loggMe.debug('Log this debug message.')
loggMe.info('Log this info message.')
loggMe.warn('Log this warn message.')
loggMe.error('Log this error message.')
loggMe.fatal('Log this fatal message.')

/**
 * Log json fields with message
 *
 * syntax;
 * loggMe.<debug|info|warn|error|fatal>({jsonObj}, string_Message)
 */
loggMe.debug({field1:"value1"},'Log this debug message.')
loggMe.info({field1:"value1"},'Log this info message.')
loggMe.warn({field1:"value1"},'Log this warn message.')
loggMe.error({field1:"value1"},'Log this error message.')
loggMe.fatal({field1:"value1"},'Log this fatal message.')

/**
 * Log errors
 *
 * syntax;
 * loggMe.<debug|info|warn|error|fatal>(error_Object)
 */
loggMe.debug(new Error("Something unexpected happened."))
loggMe.info(new Error("Something unexpected happened."))
loggMe.warn(new Error("Something unexpected happened."))
loggMe.error(new Error("Something unexpected happened."))
loggMe.fatal(new Error("Something unexpected happened."))