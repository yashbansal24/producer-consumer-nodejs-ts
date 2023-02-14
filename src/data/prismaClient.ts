import { PrismaClient } from '@prisma/client'
import omit from 'lodash';
const prisma = new PrismaClient()

export async function writeStreetInfo(streetInfo) {

    const existingStreet = await prisma.street.findFirst({
        where: {
            street_code: streetInfo.street_name,
                street_name: streetInfo.street_name,
                street_name_status: streetInfo.street_name_status,
                streetId: streetInfo.streetId,
                city_code: streetInfo.city_code,
                city_name: streetInfo.city_name,
                region_code: streetInfo.region_code,
                region_name: streetInfo.region_name,
                official_code: streetInfo.official_code
        },
    }) 

    if (!existingStreet) {
        const streeDetails = await prisma.street.create({
            data: {
                street_code: streetInfo.street_name,
                street_name: streetInfo.street_name,
                street_name_status: streetInfo.street_name_status,
                streetId: streetInfo.streetId,
                city_code: streetInfo.city_code,
                city_name: streetInfo.city_name,
                region_code: streetInfo.region_code,
                region_name: streetInfo.region_name,
                official_code: streetInfo.official_code
            }
        }) 
        return omit(streeDetails, ["id","_id"]);
    }
    return omit(existingStreet, ["id","_id"]);
}

export async function upsertStreetInfo(streetInfo) { 
    const record = {
        street_code: streetInfo.street_name,
        street_name: streetInfo.street_name,
        street_name_status: streetInfo.street_name_status,
        streetId: streetInfo.streetId,
        city_code: streetInfo.city_code,
        city_name: streetInfo.city_name,
        region_code: streetInfo.region_code,
        region_name: streetInfo.region_name,
        official_code: streetInfo.official_code
    };   
    const streeDetails = await prisma.street.upsert({
        where: {
            streetId: streetInfo.streetId,
        },
        update: {
            ...record
        },
        create: {
            ...record
        }
    }) 
    return omit(streeDetails, ["id","_id"]);
    
}
