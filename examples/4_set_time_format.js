const loggMe = require('../lib/loggMe');

/**
 * set timeFormat to isoString
 */
loggMe.setTimeFormat(("IsoString"))
loggMe.debug('Log this debug message.')
// Output: {.... , "time":"2024-09-04T14:10:42.277Z"}


/**
 * set timeFormat to unixTimestamp
 */
loggMe.setTimeFormat(("unixTimestamp"))
loggMe.info('Log this info message.')
// Output: {....., "time":1725459042277}





