import { StreetsService as streetsService, city as City} from './israeliStreets/index'
import Producer from './publisher/index';
// import  {writeStreetInfo} from './data/prismaClient'
const args = process.argv.slice(2);

// console.log(KafkaPublisher)
args.forEach((city_name: City) => {
    streetsService.getStreetsInCity(city_name)
    .then(({city, streets}) => {
        streets.forEach((street) => {
            Producer(JSON.stringify(street))
        })
    })
})
// streetsService.getStreetInfoById(112576)
// .then(data => writeStreetInfo(data))
// .catch(err => console.log(err))
// console.log(args)