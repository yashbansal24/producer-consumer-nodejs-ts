import Translate from '@google-cloud/translate';
import axios from 'axios';
import * as fs from 'fs';
const a = axios.create({})
const key = 'GOOGLE API SECRET KEY GOES HERE'

const getCities = async () => {
	const translate = new Translate.v2.Translate({key: key})
	const file = fs.createWriteStream('./cities.json')
	file.write('{\n')
	const cities = (await a.get(`https://data.gov.il/api/3/action/datastore_search?resource_id=1b14e41c-85b3-4c21-bdce-9fe48185ffca&limit=10000&offset=0&fields=city_name&distinct=true&sort=city_name&include_total=false`)).data
	await Promise.all(cities.result.records.map(async (r, i) => {
		const english = await translate.translate(r.city_name, {to: 'en'})
		const city = english[0]
		file.write(`[\`${city}\`] : \`${r.city_name}\`,\n`)
	}))
	file.write('}\n')
	file.close()
}

getCities()