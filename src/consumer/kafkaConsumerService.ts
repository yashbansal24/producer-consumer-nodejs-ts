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
            eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning, isStale }) => {
                console.log(batch.messages.length)
                const chunkSize = 100;
                for (let i = 0; i < batch.messages.length; i += chunkSize) {
                    const chunk = batch.messages.slice(i, i + chunkSize);
                    await Promise.all(
                        chunk.map((message, idx) => {
                            console.log(i, idx);
                            const { streetId } = JSON.parse(message.value.toString())
                            return StreetsService.getStreetInfoById(streetId)
                            .then((streetInfo) => writeStreetInfo(streetInfo))
                            .then((resp) => console.log(resp))
                        }))
                }
            }
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
