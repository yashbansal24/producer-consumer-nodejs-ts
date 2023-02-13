import ConsumerService from "./consumerService";
import { logLevel } from "kafkajs";
import { writeStreetInfo } from "../data/prismaClient";
import { StreetsService } from "../israeliStreets";
const { Kafka } = require('kafkajs');
const dotenv = require('dotenv');
dotenv.config();
const kafka = new Kafka({
    clientId: process.env.CONSUMER_NAME,
    brokers: [process.env.KAFKA_URL],
    logLevel: logLevel.DEBUG
});

const consumerNumber = process.argv[2] || '1';

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

class KafkaConsumer implements ConsumerService {
    topicName: string;
    consumer: any;
    consumerCount: any;
    constructor(topic_name) {
        this.topicName = topic_name
        this.consumer = kafka.consumer({groupId: 'street'});
        this.consumerCount = 1;
    }
    async connect () {
        await this.consumer.connect()
    }
    async subscribe () {
        await this.consumer.subscribe({ topic: this.topicName })
    }
    async consume () {
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const { streetId } = JSON.parse(message.value.toString())
                if (!streetId) {
                    return
                }
                const streetInfo = await StreetsService.getStreetInfoById(streetId)
                const writeInfo = await writeStreetInfo(streetInfo)
                logMessage(this.consumerCount, `streetsConsumer#${consumerNumber} ${writeInfo}`, topic, partition, message);
                this.consumerCount++;
            },
        });
    };
    disconnect () {
        this.consumer.disconnect();
    };
}

const kafkaConsumer = new KafkaConsumer(process.env.KAFKA_TOPIC);
kafkaConsumer.connect()
kafkaConsumer.subscribe()
kafkaConsumer.consume()
