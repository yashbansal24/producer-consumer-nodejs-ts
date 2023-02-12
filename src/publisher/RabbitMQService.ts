import QueueService from "./QueueService";
class RabbitMQService implements QueueService{
    topicName: string;
    constructor (topic: string) {
        this.topicName = topic
    }
    putMsg(message: string): Promise<any> {
        const returnValue = Promise.resolve();
        return returnValue;
    }
    getMsgs ():Promise<Array<any>> {
        const returnValue = Promise.resolve([]);
        return returnValue;
    }
}
export default new RabbitMQService("cityDetails");