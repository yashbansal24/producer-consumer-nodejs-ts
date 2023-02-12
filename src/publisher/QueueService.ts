interface QueueService {
    topicName: string;
    putMsg: (message: string) => Promise<any>;
}
export default QueueService;