const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const topicName = 'test-events';

const produce  = async (data) => {
    const producer = kafka.producer();
    await producer.connect();
    console.log(data)
    await producer.send({
        topic: topicName,
        messages: [
            { value: data },
        ],
    });
};

// export class Producer() {

// }

export default produce;