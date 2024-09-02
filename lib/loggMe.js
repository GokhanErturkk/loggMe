const fs = require('fs');

const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
const time_Formats = ['IsoString', 'unixTimestamp']

const DEFAULT_LEVEL = 'DEBUG';
const DEFAULT_TIME_FORMAT = 'IsoString'


class loggMe {
    constructor() {
        this.logLevel = (levels.includes(process.env.LOGGME_LEVEL) && process.env.LOGGME_LEVEL) || DEFAULT_LEVEL
        this.timeFormat = DEFAULT_TIME_FORMAT
        this.stream =  process.stdout
        // set the LogLevel during initiation.

        if (process.env.LOGFILE_PATH){
            this.setStreamToFile(process.env.LOGFILE_PATH);
        }
        this.setLogLevel(this.logLevel);
    }
    
    noop(){};
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
                loggMe.prototype[levels[levelsIndex].toLowerCase()] = this.noop
            else
                loggMe.prototype[levels[levelsIndex].toLowerCase()] = this.log
        }
    }

    setStreamToFile(filePath){
        this.stream = fs.createWriteStream(filePath,
            {flags: 'a', encoding: 'utf8'});
    }

    log(arg){
        this.stream.write(arg)
    }
    getLogLevel() {
        return this.logLevel
    }
}


module.exports = new loggMe()