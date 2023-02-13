import { StreetsService as streetsService, city as City} from './israeliStreets/index'
import Producer from './publisher/kafkaPublisherService';
const cities = process.argv.slice(2);

Producer.connect();

cities.forEach((city_name: City) => {
    streetsService.getStreetsInCity(city_name)
    .then(({city, streets}) => {
        streets.forEach((street) => {
            Producer.produce(JSON.stringify(street))
        })
    })
    .catch(err => console.log(err))
    .finally(() => setTimeout(() => {
        Producer.disconnect()
        process.exit(0)
    }, 5000))
})
