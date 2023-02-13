export default interface PublisherService {
    topicName: string;
    producer: any;
    produce: (message: string) => Promise<any>
    connect: () => void
    disconnect: () => void
}