// const KafkaLogger = require('./kafkaLogger');
// new KafkaLogger([process.env.KAFKA_HOST], "clientid").write(JSON.stringify({ key99: "val99" }))



//////////////////////////////
require('dotenv').config();
const loggMe = require('./lib/loggMe').setLogFormat('json');
loggMe.error(new Error("Something unexpected happened."))  // first