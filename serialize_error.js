

var error = new Error('User Not Found');
error.statusCode = 404;

// console.log(serializeError(error).toObject());


const getErrorMessage = (error) => {
    if (error instanceof Error) {
        return error.message
    }
    return ''
}

const getErrorConstructor = (error) => {
    let constructor
    if (error && error.constructor) {
        constructor = error.constructor.name || error.constructor.prototype.name;
    }
    return constructor
}

const getErrorStack = (error) => {
    if (error instanceof Error && error.stack != null) {
        var stack = error.stack;
        return stack.substring(stack.indexOf('\n') + 1); // start from the index of (the first \n +1)
    }
    return '';
}

const getEnumerableProperties = (error) => {
    return Object.keys(error || {}).reduce((acc, key) => {
            return { ...acc, [key]: error[key] }
    }, {})
}


const serializeError = (error, includeStack) => {
    var message = getErrorMessage(error);
    var constructor = getErrorConstructor(error);
    var enumerables = getEnumerableProperties(error)

    var errorDetailsObject = {
        ...enumerables,
        message,
        constructor,
    }

    if (includeStack){
        errorDetailsObject["stack"] = getErrorStack(error);
    }
    return errorDetailsObject
}

console.log(serializeError(error,true))
