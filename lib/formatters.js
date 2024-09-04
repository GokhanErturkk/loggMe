const chalk = require('chalk')

/**
 * Formatters that are used to format the log trace.
 * - dev : Used only for console stream. Gives a colorful output.
 * - json: Can be used for console, file and Kafka streams. Logs in JSON format.
 */

const formatters = {
    dev: formatDevTrace,
    json: formatJsonTrace,
};

function formatDevTrace(logObj, err) {
    var str;
    switch (logObj.level) {
        case 'DEBUG':
            str = chalk.grey(logObj.level);
            break;
        case 'INFO':
            str = chalk.blue(logObj.level) + ' '; // Pad to 5 chars
            break;
        case 'WARN':
            str = chalk.yellow(logObj.level) + ' '; // Pad to 5 chars
            break;
        case 'ERROR':
            str = chalk.red(logObj.level);
            break;
        case 'FATAL':
            str = chalk.red.bold(logObj.level);
            break;
    }

    if (err) {
        return str + '\n' + JSON.stringify(logObj) + '\n' + err + '\n'
    }
    return str + '\n' + JSON.stringify(logObj) + '\n' + '\n'
}

function formatJsonTrace(logObj, err) {
    if (err) {
        logObj["err"] = err
    }
    return JSON.stringify(logObj)
}

module.exports = formatters