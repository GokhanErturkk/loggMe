const chalk = require('chalk');
var level = "DEBUG"
var str

switch (level) {
    case 'DEBUG':
        str = chalk.grey(level);
        break;
    case 'INFO':
        str = chalk.blue(level) + ' '; // Pad to 5 chars
        break;
    case 'WARN':
        str = chalk.yellow(level) + ' '; // Pad to 5 chars
        break;
    case 'ERROR':
        str = chalk.red(level);
        break;
    case 'FATAL':
        str = chalk.red.bold(level);
        break;
}

console.log(str)
// function colorize(color, str) {
//     return str
//         .split('\n')
//         .map(part => color(part))
//         .join('\n');
// }

// if (isErrorLoggingWithoutMessage) {
//     str += colorize(chalk.gray, "xxx" + '\n' + "yyyy" + '\n' + "tttt");
//   } else if (err) {
//     str += '\n' + colorize(chalk.gray, serializeErr(err).toString(printStack));
//   }