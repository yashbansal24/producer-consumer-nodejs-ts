import { StreetsService as streetsService, city as City} from './israeliStreets/index'
import Producer from './publisher/index';
const args = process.argv.slice(2);

args.forEach((city_name: City) => {
    streetsService.getStreetsInCity(city_name)
    .then(({city, streets}) => {
        streets.forEach((street) => {
            Producer(JSON.stringify(street))
        })
    })
})
