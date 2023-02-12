import QueueService from "./QueueService";
const { Kafka } = require("kafkajs");
require("dotenv").config();
const kafkaProducer = new Kafka({ brokers: ["localhost:9092"] }).producer();

class KafkaPublisher implements QueueService{
    topicName: string;
    constructor (topic: string) {
        this.topicName = topic
    }
    async putMsg(message: string): Promise<any> {
        await kafkaProducer.connect();
        
        return kafkaProducer.send({
            topic: this.topicName,
            messages: [
              { key: new Date().getMilliseconds().toString(), value: message },
            ]
          });
        
    }
}
export default new KafkaPublisher(process.env.KAFKA_TOPIC || "test-events");