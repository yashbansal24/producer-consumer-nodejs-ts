import PublisherService from './publisherService'
const { Kafka } = require('kafkajs');
const dotenv = require('dotenv');
dotenv.config();

const kafka = new Kafka({
    clientId: process.env.CONSUMER_NAME,
    brokers: [process.env.KAFKA_URL]
});


export class Producer implements PublisherService {
    topicName: string;
    producer: any;
    constructor (topic_name) {
        this.topicName = topic_name
        this.producer = kafka.producer();
    }
    connect() {
        this.producer.connect();
    }
    produce(message:string) {
        console.log(message)
        return this.producer.send({
            topic: this.topicName,
            messages: [
                { value: message },
            ],
        });
    }
    disconnect() {
        this.producer.disconnect();
    }
}

export default new Producer(process.env.KAFKA_TOPIC);