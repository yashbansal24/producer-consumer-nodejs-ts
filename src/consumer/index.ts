const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const topicName = 'test-events';
const consumerNumber = process.argv[2] || '1';

const processConsumer  = async () => {
    const cityConsumer = kafka.consumer({groupId: 'city'});
    const streetsConsumer = kafka.consumer({groupId: 'street'});
    
    await Promise.all([
        cityConsumer.connect(),
        streetsConsumer.connect(),
    ]);

    await Promise.all([
        await cityConsumer.subscribe({ topic: topicName }),
        await streetsConsumer.subscribe({ topic: topicName })
    ]);

    let cityCounter = 1;
    let streetCounter = 1;

    await cityConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            logMessage(cityCounter, `cityConsumer#${consumerNumber}`, topic, partition, message);
            cityCounter++;
        },
    });
    await streetsConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            logMessage(streetCounter, `streetsConsumer#${consumerNumber}`, topic, partition, message);
            streetCounter++;
        },
    });

};

const logMessage = (counter, consumerName, topic, partition, message) => {
    console.log(`received a new message number: ${counter} on ${consumerName}: `, {
        topic,
        partition,
        message: {
            offset: message.offset,
            headers: message.headers,
            value: message.value.toString()
        },
    });
};

processConsumer();
