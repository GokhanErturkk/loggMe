const formatters = {
    dev: formatDevTrace,
    json: formatJsonTrace,
};



function formatDevTrace(logObj, err) {
    if (err) {
        return JSON.stringify(logObj) + '\n' + err + '\n'
    }
    return JSON.stringify(logObj) + '\n' +'\n'
}

function formatJsonTrace() {

}

module.exports = formatters