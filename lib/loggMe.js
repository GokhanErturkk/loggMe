const fs = require('fs');
const serializeErr = require('./serialize_error');
const formatters = require('./formatters');

// Possible Configuration Options
const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
const time_Formats = ['IsoString', 'unixTimestamp']
const log_Formats = ['dev', 'json'];

// Default logLevel and time format
const DEFAULT_LEVEL = 'DEBUG';
const DEFAULT_TIME_FORMAT = 'IsoString'

/**
 * Check if obj is a valid Oject
 * @param {any} obj 
 * @returns {boolean}
 */
function isObject(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
}

/**
 * Check if str is a valid String
 * @param {any} str 
 * @returns {boolean}
 */
function isString(str) {
    return typeof str === 'string' || str instanceof String
}

class loggMe {
    constructor() {
        this.logLevel = (levels.includes(process.env.LOGGME_LEVEL) && process.env.LOGGME_LEVEL) || DEFAULT_LEVEL
        this.logFormat = formatters[process.env.LOGGME_FORMAT] || formatters.dev
        this.timeFormat = DEFAULT_TIME_FORMAT
        this.stream = null
        this.context = null

        // if file path env variable is present, set stream to file.
        if (process.env.LOGFILE_PATH) {
            this.createFileStream(process.env.LOGFILE_PATH);
        } else {
            this.createConsoleStream()
        }

        // set the LogLevel during initiation.
        this.setLogLevel(this.logLevel);
    }

    noop() { };
    debug() { noop() }
    info() { noop() }
    warn() { noop() }
    error() { noop() }
    error() { noop() }

    /**
     * Context parameters are merged with json fields to be logged.
     * @param {Object} context 
     */
    setContext(context) {
        this.context = context
    }

    /**
     * @param {('IsoString' | 'unixTimestamp')} timeFormat 
     */
    setTimeFormat(timeFormat) {
        if (!time_Formats.includes(timeFormat))
            throw new Error(`Invalid timeFormat specified. \n Possible timeFormats; \n\t 'IsoString', 'unixTimestamp'`)
        this.timeFormat = timeFormat
    }

    /**
     * @param {('dev' | 'json')} logFormat 
     */
    setLogFormat(logFormat) {
        if (!log_Formats.includes(logFormat))
            throw new Error(`Invalid logFormat specified. \n Possible logFormats; \n\t 'dev','json'`)
        this.logFormat = formatters[logFormat]
    }

    /**
     * @param {('DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL')} logLevel 
     */
    setLogLevel(logLevel) {
        if (!levels.includes(logLevel))
            throw new Error(`Invalid logLevel specified. \n Possible logLevels; \n\t 'DEBUG','INFO','WARN','ERROR','FATAL'`)
        this.logLevel = logLevel

        // Only selected level and above indexes will be operational. Lower levels can be be called but won't be logged.
        for (var levelsIndex = 0; levelsIndex < levels.length; levelsIndex++) {
            if (levelsIndex < levels.indexOf(logLevel))
                loggMe.prototype[levels[levelsIndex].toLowerCase()] = this.noop
            else
                loggMe.prototype[levels[levelsIndex].toLowerCase()] = this.logWrapper(levels[levelsIndex])
        }
    }

    /**
     * Returns the selected logLevel.
     * @returns String
     */
    getLogLevel() {
        return this.logLevel
    }

    /**
     * Sets the loggMe stream to console.
     */
    createConsoleStream = () => {
        this.stream = process.stdout
    }

    /**
     * Creates a file logging stream.
     * @param {String} filePath 
     */
    createFileStream(filePath) {
        this.stream = fs.createWriteStream(filePath,
            { flags: 'a', encoding: 'utf8' });
    }

    /**
     * Internally used to add logging functionality to selected logging level and above.
     * @param {String} logLevel 
     * @returns 
     */
    logWrapper(logLevel) {
        return function log() {
            var err;
            var args = [...arguments];
            var logObj = { level: logLevel, ...this.context };

            if (args[0] instanceof Error) {
                err = serializeErr(args[0], true)
            } else if (isString(args[0])) {
                logObj["msg"] = args[0]
            } else if (isObject(args[0]) && isString(args[1])) {
                logObj = { ...logObj, ...args[0] }
            }

            logObj["time"] = this.timeFormat == 'IsoString' ? new Date() : new Date().valueOf();
            var trace = this.logFormat(logObj, err)
            this.stream.write(trace + '\n')
        }
    }
}

module.exports = new loggMe()