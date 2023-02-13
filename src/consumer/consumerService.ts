export default interface ConsumerService {
    topicName: string;
    consumer: any;
    consumerCount: Number;
    subscribe: () => any;
    consume: () => any;
    connect: () => any;
    disconnect: () => any;
}