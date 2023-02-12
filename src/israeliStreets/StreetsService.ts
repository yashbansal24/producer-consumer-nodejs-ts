import axios, { Axios } from 'axios';
import { omit } from 'lodash';
import { cities, city, enlishNameByCity } from './cities';

export interface Street extends Omit<ApiStreet, '_id'>{
	streetId: number
}

interface ApiStreet{
	_id: number
	region_code: number
	region_name: string
	city_code: number
	city_name: string
	street_code: number
	street_name: string
	street_name_status: string
	official_code: number
}


export class StreetsService{
	private static _axios: Axios
	private static get axios(){
		if(!this._axios){
			this._axios = axios.create({})
		}
		return this._axios
	}
	static async getStreetsInCity(city: city): Promise<{city: city, streets: Pick<Street, 'streetId' | 'street_name'>[]}>{
		const res = (await this.axios.post('https://data.gov.il/api/3/action/datastore_search', {resource_id:`1b14e41c-85b3-4c21-bdce-9fe48185ffca`, filters: {city_name: cities[city]}, limit: 100000})).data
		const results = res.result.records
		if (!results || !results.length) {
			throw new Error('No streets found for city: ' + city)
		}
		const streets: Pick<Street, 'streetId' | 'street_name'>[]  = results.map((street: ApiStreet) => { 
			return {streetId: street._id, name: street.street_name.trim()}
		})
		return {city, streets}
	}

	static async getStreetInfoById(id: number){
		const res = (await this.axios.post('https://data.gov.il/api/3/action/datastore_search', {resource_id:`1b14e41c-85b3-4c21-bdce-9fe48185ffca`, filters: {_id: id}, limit: 1})).data
		const results = res.result.records
		if (!results || !results.length) {
			throw new Error('No street found for id: ' + id)
		}
		const dbStreet: ApiStreet = results[0]
		const cityName = enlishNameByCity[dbStreet.city_name]
		const street: Street = {...omit<ApiStreet>(dbStreet, '_id'), streetId: dbStreet._id, city_name: cityName, region_name: dbStreet.region_name.trim(), street_name: dbStreet.street_name.trim()}
		return street
	}
}