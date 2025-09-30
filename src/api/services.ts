import { and, eq, gte, lte } from "drizzle-orm";
import DataBaseManager from "../database/database";
import { CarTable } from "../database/schema";
import { CarFilters } from "../types/CarFilters";


export const getAvailableCars = async () => {
  const db = DataBaseManager.getinstance().getdb();

  const availableCars = await db
  .select()
  .from(CarTable)
  .where(eq(CarTable.is_available, 1))
  .execute();

  return availableCars;
};

export const getCar = async (id: number) => {
  const db = DataBaseManager.getinstance().getdb();

  const car = await db
  .select()
  .from(CarTable)
  .where(eq(CarTable.id, id))
  .execute();

  return car;
};

export const getFilteredCars = async (filters: CarFilters) => {
  const db = DataBaseManager.getinstance().getdb();

  const conditions = [];

  if (filters.minPrice !== undefined) {
    conditions.push(gte(CarTable.price, filters.minPrice));
  }
  if (filters.maxPrice !== undefined) {
    conditions.push(lte(CarTable.price, filters.maxPrice));
  }
  if (filters.type !== undefined) {
    conditions.push(eq(CarTable.type, filters.type));
  }
  if (filters.seats !== undefined) {
    conditions.push(eq(CarTable.seats, filters.seats));
  }
  if (filters.transmissionType !== undefined) {
    conditions.push(eq(CarTable.transmission, filters.transmissionType));
  }
  if (filters.trunkSpace !== undefined) {
    conditions.push(gte(CarTable.trunk_space, filters.trunkSpace));
  }
  if (filters.engineType !== undefined) {
    conditions.push(eq(CarTable.engine, filters.engineType));
  }
  if (filters.isAvailable !== undefined) {
    conditions.push(eq(CarTable.is_available, filters.isAvailable ? 1 : 0));
  }

  const query = db
    .select()
    .from(CarTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  const cars = await query.execute();
  return cars.map(mapDbCarToCar);
};


function mapDbCarToCar(dbCar: any): Car {
    return {
        id: dbCar.id,
        name: dbCar.name,
        price: dbCar.price,
        seats: dbCar.seats,
        transmission_type: dbCar.transmission, // mapping
        type: dbCar.type,
        trunk_space: dbCar.trunk_space,
        engine_type: dbCar.engine,             // mapping
        is_available: dbCar.is_available === 1, // conversion en boolean
        agency_id: dbCar.agency_id,
        image: dbCar.image,
    };
}