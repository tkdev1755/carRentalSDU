import { MOCK_AGENCIES } from "../api/mocks/agencies";
import { MOCK_CARS } from "../api/mocks/cars";
import DataBaseManager from "./database";
import { AgencyTable, CarTable } from "./schema";

export async function seedDatabase() {
    const db= DataBaseManager.getinstance().getdb();
    
    const carCount=await db.select().from(CarTable);
    if(carCount.length===0) {
        for(const car of MOCK_CARS) {
            await db.insert(CarTable).values({
                name: car.name,
                price: car.price,
                seats: car.seats,
                transmission: car.transmission_type,
                type: car.type,
                trunk_space: car.trunk_space,
                engine: car.engine_type,
                is_available: car.is_available ? 1:0,
                agency_id: car.agency_id,
                image: car.image,
            }).execute();
        }
    }

    const agencyCount = await db.select().from(AgencyTable);
    if(agencyCount.length===0) {
        for(const agency of MOCK_AGENCIES) {
            await db.insert(AgencyTable).values({
                name: agency.name,
                location: agency.location,
                phone_number: agency.phone_number,
            }).execute();
        }
    }
}

