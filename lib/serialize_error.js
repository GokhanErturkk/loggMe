/**
 * @param {Error} error 
 * @returns {String}
 */
const getErrorMessage = (error) => {
    if (error instanceof Error) {
        return error.message
    }
    return ''
}

/**
 * @param {Error} error 
 * @returns {String}
 */
const getErrorConstructor = (error) => {
    let constructor
    if (error && error.constructor) {
        constructor = error.constructor.name || error.constructor.prototype.name;
    }
    return constructor
}

/**
 * @param {Error} error 
 * @returns {String}
 */
const getErrorStack = (error) => {
    if (error instanceof Error && error.stack != null) {
        var stack = error.stack;
        return stack.substring(stack.indexOf('\n') + 1); // start from the index of (the first \n +1)
    }
    return '';
}

/**
 * @param {Error} error 
 * @returns {Object}
 */
const getEnumerableProperties = (error) => {
    return Object.keys(error || {}).reduce((acc, key) => {
            return { ...acc, [key]: error[key] }
    }, {})
}


const getErrorDetailsObject =(error) => {
    var message = getErrorMessage(error);
    var constructor = getErrorConstructor(error);
    var enumerables = getEnumerableProperties(error)

    var errorDetailsObject = {
        ...enumerables,
        message,
        constructor,
    }

    return errorDetailsObject
}

/**
 * 
 * @param {Error} error 
 * @param {boolean} includeStack 
 * @param {('dev' | 'json' )} logFormat      
 * @returns 
 */
const serializeError = (error, includeStack,logFormat) => {
    var errorDetailsObject = getErrorDetailsObject(error);

    if (logFormat == 'dev'){
        return JSON.stringify(errorDetailsObject) +  (includeStack? '\n'+ getErrorStack(error): '')
    } else if (logFormat == 'json'){
        if (includeStack){
            errorDetailsObject['err'] =  getErrorStack(error)
        }
        return  errorDetailsObject
    }
}


module.exports = serializeError
