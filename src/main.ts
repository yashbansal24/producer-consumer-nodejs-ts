import { StreetsService as streetsService} from './israeliStreets/index'
import Producer from './publisher/index';
import  {writeStreetInfo} from '../prisma/PrismaClient'

// console.log(KafkaPublisher)
streetsService.getStreetInfoById(112576)
.then(data => writeStreetInfo(data))
.catch(err => console.log(err))