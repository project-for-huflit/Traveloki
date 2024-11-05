require('dotenv').config();

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka1:9092', 'kafka2:9092'],
  // enforceRequestTimeout: false // disabled the request timeout
  // logLevel: logLevel.ERROR,
});

/**
 * @author LOQ-burh
 * @description expand brokers
 */
// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: async () => {
//     // Example getting brokers from Confluent REST Proxy
//     const clusterResponse = await fetch('https://kafka-rest:8082/v3/clusters', {
//       headers: 'application/vnd.api+json',
//     }).then(response => response.json())
//     const clusterUrl = clusterResponse.data[0].links.self

//     const brokersResponse = await fetch(`${clusterUrl}/brokers`, {
//       headers: 'application/vnd.api+json',
//     }).then(response => response.json())

//     const brokers = brokersResponse.data.map(broker => {
//       const { host, port } = broker.attributes
//       return `${host}:${port}`
//     })

//     return brokers
//   }
// })

// region producer

const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();
  await producer.send({
    topic: 'test-topic',
    messages: [{ value: 'Hello KafkaJS user!' }],
  });

  console.log('Message send successfully!');

  await producer.disconnect();
};

// region consumer

const consumer = kafka.consumer({ groupId: 'test-group' });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
};

module.exports = {
  KAFKA_URI: process.env.KAFKA_URI || '',
  runProducer,
  runConsumer
};
