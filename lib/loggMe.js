const fs = require('fs');
const serializeErr = require('./serialize_error');
const formatters = require('./formatters');

const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
const time_Formats = ['IsoString', 'unixTimestamp']

const DEFAULT_LEVEL = 'DEBUG';
const DEFAULT_TIME_FORMAT = 'IsoString'

function isObject(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
}

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

        // If Apache Kafka env variables are present, set stream to kafka topic.
        // if (){

        // }

        // set the LogLevel during initiation.
        this.setLogLevel(this.logLevel);
    }

    noop() { };
    debug() { noop() }
    info() { noop() }
    warn() { noop() }
    error() { noop() }
    error() { noop() }


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

    createConsoleStream = () => {
        this.stream = process.stdout
    }

    createFileStream(filePath) {
        this.stream = fs.createWriteStream(filePath,
            { flags: 'a', encoding: 'utf8' });
    }

    logWrapper(logLevel) {
        return function log() {
            var args = [...arguments];
            var logObj = { level: logLevel, ...this.context };
            var err;

            if (args[0] instanceof Error) {
                // logObj["err"] = serializeErr(args[0], true)
                err =serializeErr(args[0], true)
            } else if (isString(args[0])) {
                logObj["msg"] = args[0]
            } else if (isObject(args[0]) && isString(args[1])) {
                logObj = { ...logObj, ...args[0] }
            }

            
            logObj["time"] = this.timeFormat == 'IsoString' ? new Date() : new Date().valueOf(); 
            
            // logObj["err"] = err
            
            // var debugTrace=  JSON.stringify(logObj) + '\n'  + err
            // console.log(debugTrace)
            var trace = this.logFormat(logObj, err)
            // console.log(trace)
            this.stream.write(trace + '\n')
            // this.stream.write(JSON.stringify(logObj) + '\n')
        }

    }

    getLogLevel() {
        return this.logLevel
    }

    setContext(context) {
        this.context = context
    }

    setTimeFormat(timeFormat) {
        if (!time_Formats.includes(timeFormat))
            throw new Error(`Invalid timeFormat specified. \n Possible timeFormats; \n\t 'IsoString', 'unixTimestamp'`)
        this.timeFormat = timeFormat
    }
}


module.exports = new loggMe()