interface QueueService {
    topicName: string;
    getMsgs: () => Promise<Array<any>>;
}
export default QueueService;