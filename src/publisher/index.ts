const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const topicName = 'test-events';

const msg = JSON.stringify({city: 1, street: 1});
const processProducer  = async (data) => {
    const producer = kafka.producer();
    await producer.connect();
    for (let i = 0; i < 3; i++) {
        await producer.send({
            topic: topicName,
            messages: [
                { value: msg },
            ],
        });
    }
};

export default processProducer;