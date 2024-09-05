require("dotenv").config()
const { Kafka } = require("kafkajs");

class KafkaLogger {
    constructor(brokers, clientId) {
        this.topic = process.env.KAFKA_TOPIC
        this.kafka = new Kafka({
            brokers: brokers,
            clientId: clientId
        })
        this.producer = this.kafka.producer()
    }

    async write(log){
        await this.producer.connect();
        await this.producer.send({
            topic: this.topic,
            messages: [{ value:log }],
        });

        await this.producer.disconnect();
    };
}

