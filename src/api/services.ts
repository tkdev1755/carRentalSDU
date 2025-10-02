import { and, eq, gte, lte } from "drizzle-orm";
import DataBaseManager from "../database/database";
import { BookingTable, CarTable, CarType, UserTable } from "../database/schema";
import { CarFilters } from "../types/CarFilters";


// export const getAvailableCars = async () => {
//   const db = DataBaseManager.getinstance().getdb();

//   const availableCars = await db
//   .select()
//   .from(CarTable)
//   .where(eq(CarTable.is_available, 1))
//   .execute();

//   return availableCars;
// }

export const getCar = async (id: number): Promise<CarType> => {
  const db = DataBaseManager.getinstance().getdb();

  const car = await db
  .select()
  .from(CarTable)
  .where(eq(CarTable.id, id))
  .execute();

  return car[0];
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
  return cars;
};


export const getUserInfo = async (id: string) => {
    const db = DataBaseManager.getinstance().getdb();

    const user = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, id))
    .execute();

    return {
        "name" : "John Doe",
        "email" : "johnd@gmail.com",
        "phoneNumber" : "+330621546712"
    };
}

export const updateUserInfo = async (info:any) => {
    console.log(`Updating following user info : ${info.key} - ${info.value}`);

    // TODO - Write logic to update the user info on the database
}

export const createBooking = async (booking: { start_date:string;end_time:string;car_id:number;user_id:string;agency_id:number;
}) => {
  const db = DataBaseManager.getinstance().getdb();
  const result = await db.insert(BookingTable).values(booking).execute();
  await db.update(CarTable).set({is_available:0}).where(eq(CarTable.id, booking.car_id)).execute(); //maybee see is there is a edge functiun in supabase for more security

  return result;
}