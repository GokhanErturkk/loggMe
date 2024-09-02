
const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
const DEFAULT_LEVEL = 'DEBUG';

function noop(){};

class loggMe {
    constructor() {
        this.logLevel = (levels.includes(process.env.LOGGME_LEVEL) && process.env.LOGGME_LEVEL) || DEFAULT_LEVEL
        // this.for

        // set the LogLevel during initiation.
        this.setLogLevel(this.logLevel);
    }

    debug(){ noop()}
    info(){ noop()}
    warn(){ noop()}
    error(){ noop()}
    error(){ noop()}

    setLogLevel(logLevel) {
        if (!levels.includes(logLevel))
            throw new Error(`Invalid logLevel specified. \n Possible logLevels; \n\t 'DEBUG','INFO','WARN','ERROR','FATAL'`)
        this.logLevel = logLevel
        
        // Only selected level and above indexes will be operational. Lower levels can be be called but won't be logged.
        for (var levelsIndex =0; levelsIndex < levels.length; levelsIndex++){
            if (levelsIndex< levels.indexOf(logLevel)) 
                // loggMe[levels[levelsIndex].toLowerCase()] = console.log
                loggMe.prototype[levels[levelsIndex].toLowerCase()] = noop
            else
                loggMe.prototype[levels[levelsIndex].toLowerCase()] = console.log
        }
    }


    getLogLevel() {
        return this.logLevel
    }
}


module.exports = new loggMe()