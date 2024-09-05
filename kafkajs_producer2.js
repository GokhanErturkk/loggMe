require("dotenv").config()
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  brokers: [`${process.env.KAFKA_HOST}`],
  // clientId: 'example-producer',
});

const producer = kafka.producer();


const write = async (log = { key1: "val1" }) => {
  await producer.connect();
  await producer.send({
    topic: process.env.KAFKA_TOPIC,
    messages: [{ value: JSON.stringify(log) }],
  });

  await producer.disconnect();
};

write().catch(console.error);