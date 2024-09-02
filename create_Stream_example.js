const fs = require('fs')

var stream = fs.createWriteStream('./logs',
                                    {flags: 'a', encoding: 'utf8'});

stream.write('logs')