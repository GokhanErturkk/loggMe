const fs = require('fs')


const createConsoleStream = () => {
    return process.stdout
}

const createFileStream = (filePath) => {
    return fs.createWriteStream(filePath,
        { flags: 'a', encoding: 'utf8' });
}

const stream_options = () => {
    return {
        console: createConsoleStream,
        file: createFileStream
        // kafka:
    };
}

module.exports = stream_options