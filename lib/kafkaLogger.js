require("dotenv").config()
const { Kafka, logLevel } = require("kafkajs");

class KafkaLogger {
    /**
     * 
     * @param {Array<string>} brokers example: ['127.0.0.1:9092', '127.0.0.1:9094']
     * @param {String} clientId 
     */
    constructor(brokers, clientId) {
        this.topic = process.env.KAFKA_TOPIC
        this.kafka = new Kafka({
            brokers: brokers,
            ...(clientId ? ({ clientId: clientId }) : {}), // conditionallly define clientId with ES6 syntax
            logLevel: logLevel.NOTHING,  // https://github.com/erikengervall/dockest/blob/d5cc8253b984d37cff13fde43860499ffa6f7a2c/packages/examples/multiple-resources/kafka-1-kafkajs/app.ts#L8
            // Kafka logger.warn message during initialization comes from -> https://github.com/tulios/kafkajs/blob/master/src/index.js
            // retry: {
            //     initialRetryTime: 2500,
            //     retries: 10,
            // },
        })
        this.producer = this.kafka.producer()
    }

    /**
     * Produce a stringified JSON log message to kafka
     * @param {String} log 
     */
    async produceMessageToTopic(log) {
        await this.producer.connect();
        await this.producer.send({
            topic: this.topic,
            messages: [{ value: log }],
        });

        await this.producer.disconnect();
    }

    /**
     * Write stringified JSON log message to Kafka Stream
     * @param {String} log 
     */
    async write(log) {
        this.produceMessageToTopic(log).catch(console.error)
    };
}

module.exports = KafkaLogger
// const kafkaLogger = new KafkaLogger([process.env.KAFKA_HOST], "clientid")

// kafkaLogger.write(JSON.stringify({ key99: "val99" }))
