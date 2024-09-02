
const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
const DEFAULT_LEVEL = 'DEBUG';


class loggMe {
    constructor() {
        this.logLevel = (levels.includes(process.env.LOGGME_LEVEL) && process.env.LOGGME_LEVEL)  || DEFAULT_LEVEL
    }

    setLogLevel(logLevel) {
        if (!levels.includes(logLevel))
            throw new Error(`Invalid logLevel specified. \n Possible logLevels; \n\t 'DEBUG','INFO','WARN','ERROR','FATAL'`)
        this.logLevel = logLevel
    }

    getLogLevel() {
        return this.logLevel
    }
}


module.exports = new loggMe()