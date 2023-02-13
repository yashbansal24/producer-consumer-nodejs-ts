const { Kafka } = require('kafkajs');
import { writeStreetInfo } from "../data/prismaClient";
import { StreetsService } from "../israeliStreets";
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const topicName = 'test-events';
const consumerNumber = process.argv[2] || '1';

const processConsumer  = async () => {
    const streetsConsumer = kafka.consumer({groupId: 'street'});
    
    await Promise.all([
        streetsConsumer.connect(),
    ]);

    await Promise.all([
        await streetsConsumer.subscribe({ topic: topicName })
    ]);

    let streetCounter = 1;

    await streetsConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const { streetId } = JSON.parse(message.value.toString())
            if (!streetId) {
                return
            }
            const streetInfo = await StreetsService.getStreetInfoById(streetId)
            const writeInfo = await writeStreetInfo(streetInfo)
            logMessage(streetCounter, `streetsConsumer#${consumerNumber} ${writeInfo}`, topic, partition, message);
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
