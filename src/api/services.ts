import { eq } from "drizzle-orm";
import DataBaseManager from "../database/database";
import { CarTable } from "../database/schema";

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
