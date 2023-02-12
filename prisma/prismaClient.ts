import { PrismaClient } from '@prisma/client'
import omit from 'lodash';
const prisma = new PrismaClient()

export async function writeStreetInfo(streetInfo) {
    console.log(streetInfo)
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
    console.log(streeDetails);
    return omit(streeDetails, ["id","_id"]);
}
