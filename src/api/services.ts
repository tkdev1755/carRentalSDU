import { eq } from "drizzle-orm";
import DataBaseManager from "../database/database";
import { CarTable } from "../database/schema";
import { CarFilters } from "../types/CarFilters";
import { MOCK_CARS } from "./mocks/cars";


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
  //TODO: implement me! please! 🫠

  // just simulating some time delay "waiting for the data"
  await new Promise((res) => setTimeout(res, 500));
  return MOCK_CARS;
};
