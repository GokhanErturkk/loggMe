
const levels = ['DEBUG','INFO','WARN','ERROR','FATAL'];
const DEFAULT_LEVEL = 'DEBUG';


class loggMe{
    constructor(){
        this.arg1 = null
    }

    setArg1(arg1){
        this.arg1= arg1
    }

    getArg1(){
        return this.arg1
    }
}


module.exports = new loggMe()