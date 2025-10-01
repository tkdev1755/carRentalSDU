import { MOCK_AGENCIES } from "../api/mocks/agencies";
import { MOCK_CARS } from "../api/mocks/cars";
import DataBaseManager from "./database";
import { AgencyTable, CarTable } from "./schema";

export async function seedDatabase() {
    const db= DataBaseManager.getinstance().getdb();
    console.log("Filling the database");

    // ** TEMPORARY FIX FOR FILLING THE DATABASE AT THE MOMENT **/
    // TODO  : FIND BETTER WAY TO DO THIS (i don't like ts and react)
    await db.get(
        "CREATE TABLE IF NOT EXISTS Car (\n" +
        "    id INTEGER PRIMARY KEY AUTOINCREMENT,\n" +
        "    name TEXT NOT NULL,\n" +
        "    price REAL NOT NULL,\n" +
        "    seats INTEGER NOT NULL,\n" +
        "    transmission TEXT NOT NULL, -- Manual or Automatic\n" +
        "    type TEXT NOT NULL,\n" +
        "    trunk_space INTEGER NOT NULL,\n" +
        "    engine TEXT NOT NULL,       -- Petrol, Electric, Hybrid\n" +
        "    is_available INTEGER NOT NULL DEFAULT 1,\n" +
        "    agency_id INTEGER NOT NULL,\n" +
        "    image TEXT NOT NULL\n" +
        ");\n" +
        "\n"
    );
    await db.get(
        "CREATE TABLE IF NOT EXISTS User (\n" +
        "    id TEXT PRIMARY KEY,\n" +
        "    first_name TEXT NOT NULL,\n" +
        "    last_name TEXT NOT NULL,\n" +
        "    date_of_birth TEXT,\n" +
        "    email TEXT\n" +
        ");\n" +
        "\n"
    );
    await db.get(
        "CREATE TABLE IF NOT EXISTS Agency (\n" +
        "    id INTEGER PRIMARY KEY AUTOINCREMENT,\n" +
        "    name TEXT NOT NULL,\n" +
        "    location TEXT,\n" +
        "    phone_number TEXT\n" +
        ");\n" +
        "\n"
    );
    await db.get(
        "CREATE TABLE IF NOT EXISTS Booking (\n" +
        "    id INTEGER PRIMARY KEY AUTOINCREMENT,\n" +
        "    start_date TEXT NOT NULL,\n" +
        "    end_time TEXT NOT NULL,\n" +
        "    car_id INTEGER,\n" +
        "    user_id TEXT,\n" +
        "    agency_id INTEGER,\n" +
        "    FOREIGN KEY(car_id) REFERENCES Car(id),\n" +
        "    FOREIGN KEY(user_id) REFERENCES User(id),\n" +
        "    FOREIGN KEY(agency_id) REFERENCES Agency(id)\n" +
        ");",
    );
    console.log("Filled the database");
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
    console.log("Couting the agencies");
    const agencyCount = await db.select().from(AgencyTable);
    console.log("Agencies Count is " + agencyCount);
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

