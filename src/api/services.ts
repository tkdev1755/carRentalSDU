import {and, eq, gte, lte} from "drizzle-orm";
import DataBaseManager from "../database/database";
import { BookingTable, CarTable, CarType, UserTable, AgencyTable , AgencyType} from "../database/schema";
import { CarFilters } from "../types/CarFilters";
import {INSURANCE_PLANS} from "@/src/api/mocks/insurancePlans";


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

  if (car.length === 0){
      throw new Error(`Car with id=${id} not found`);
  }
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
};

export const getInsurancePlans = () => INSURANCE_PLANS

export const updateUserInfo = async (info:any) => {
    console.log(`Updating following user info : ${info.key} - ${info.value}`);

    // TODO - Write logic to update the user info on the database
};

export const createBooking = async (booking: { start_date:string;end_time:string;car_id:number;user_id:string;agency_id:number;
}) => {
  const db = DataBaseManager.getinstance().getdb();
  const result = await db.insert(BookingTable).values(booking).execute();
  await db.update(CarTable).set({is_available:0}).where(eq(CarTable.id, booking.car_id)).execute(); //maybee see is there is a edge functiun in supabase for more security

  return result;
};
export const getAgencies = async () => {
  const db = DataBaseManager.getinstance().getdb();
  return await db.select().from(AgencyTable);
}

export const getAgency = async (id: number) :Promise<AgencyType> => {
  const db = DataBaseManager.getinstance().getdb();
  const result = await db.select().from(AgencyTable).where(eq(AgencyTable.id, id));
  if (result.length === 0) {
    throw new Error(`Agency with id=${id} not found`);
  }
  return  result[0];
}

export const getCurrentBookings = async (id:string) => {
    const db = DataBaseManager.getinstance().getdb();
    const today = new Date().toISOString().split("T")[0];

    const bookings = await db.select().from(BookingTable).where(and(eq(BookingTable.user_id, id),lte(BookingTable.start_date, today), gte(BookingTable.end_time, today))).execute();
    return [
        {
            "id":1,
            "start_date":"2025-09-25",
            "end_time":"2025-11-25",
            "car_id":1,
            "user_id":"1",
            "agency_id":1,
        },
        {
            "id":2,
            "start_date":"2025-09-27",
            "end_time":"2025-11-27",
            "car_id":4,
            "user_id":"1",
            "agency_id":1,
        }
        ];
};

export const getPastBookings = async(id:string) => {
    const db = DataBaseManager.getinstance().getdb();
    const today = new Date().toISOString().split("T")[0];
    const bookings = await db.select().from(BookingTable).where(and(eq(BookingTable.user_id, id), lte(BookingTable.end_time, today))).execute();

    return bookings;
};

export const getFutureBookings = async(id:string) => {
    const db = DataBaseManager.getinstance().getdb();
    const today = new Date().toISOString().split("T")[0];
    const bookings = await db.select().from(BookingTable).where(and(eq(BookingTable.user_id, id), gte(BookingTable.start_date, today))).execute();
    return bookings;
};
