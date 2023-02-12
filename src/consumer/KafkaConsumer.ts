// import QueueService from "./QueueService";
// const { Kafka } = require("kafkajs");
// require("dotenv").config();
// const kafka = new Kafka({ brokers: ["localhost:9092"] });
// const kafkaConsumer = kafka.consumer({ groupId: "" + Date.now() });

// class KafkaConsumer implements QueueService{
//     topicName: string;
//     constructor (topic: string) {
//         this.topicName = topic
//     }
//     async getMsgs(message: string): Promise<Array<any>> {
//         await kafkaConsumer.connect();
//         await kafkaConsumer.subscribe({ topic: "test-events", fromBeginning: true });
//         return kafkaProducer.send({
//             topic: this.topicName,
//             messages: [
//               { key: new Date().getMilliseconds().toString(), value: message },
//             ]
//           });
        
//     }
// }
// export default new KafkaConsumer(process.env.KAFKA_TOPIC || "test-events");