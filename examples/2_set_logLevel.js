const loggMe = require('../lib/loggMe');

/**
 * In production, only log selected logLevel and above.
 * 
 * Example;
 * If logLevel is set to ERROR in production, only `loggMe.error`  and `loggMe.fatal` commands work.
 * Debug,info and warn can still be used, but does no operation.
 * 
 * Possible Log levels;
 * - ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL']
 * Operational levels after logLevel set to error;
 * - ['ERROR','FATAL']

 */

loggMe.setLogLevel('ERROR');

loggMe.debug({field1:"value1"},'Log this debug message.')  //  no operation (DEBUG index < ERROR index)
loggMe.info({field1:"value1"},'Log this info message.')   //  no operation (INFO index < ERROR index)
loggMe.warn({field1:"value1"},'Log this warn message.')   //  no operation (WARN index < ERROR index)
loggMe.error({field1:"value1"},'Log this error message.')  // logged in console (ERROR index  = ERROR index)
loggMe.fatal({field1:"value1"},'Log this fatal message.')  // logged in console (FATAL index  = ERROR index)