const KafkaLogger = require('./kafkaLogger');

new KafkaLogger([process.env.KAFKA_HOST], "clientid").write(JSON.stringify({ key99: "val99" }))
