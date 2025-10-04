import DataBaseManager from "../database/database";
import { BookingTable, CarTable, CarType, UserTable, AgencyTable, AgencyType } from "../database/schema";
import { CarFilters } from "../types/CarFilters";
import { INSURANCE_PLANS } from "@/src/api/mocks/insurancePlans";

export const getCar = async (id: number): Promise<CarType> => {
  const db = DataBaseManager.getinstance().getdb();

  const car = await db
    .select()
    .from(CarTable)
    .where(`id = ${id}`)
    .execute();

  if (car.length === 0) {
    throw new Error(`Car with id=${id} not found`);
  }
  return car[0];
};

export const getFilteredCars = async (filters: CarFilters) => {
  const db = DataBaseManager.getinstance().getdb();
  const conditions: string[] = [];

  if (filters.minPrice !== undefined) conditions.push(`price >= ${filters.minPrice}`);
  if (filters.maxPrice !== undefined) conditions.push(`price <= ${filters.maxPrice}`);
  if (filters.type !== undefined) conditions.push(`type = '${filters.type}'`);
  if (filters.seats !== undefined) conditions.push(`seats = ${filters.seats}`);
  if (filters.transmissionType !== undefined) conditions.push(`transmission = '${filters.transmissionType}'`);
  if (filters.trunkSpace !== undefined) conditions.push(`trunk_space >= ${filters.trunkSpace}`);
  if (filters.engineType !== undefined) conditions.push(`engine = '${filters.engineType}'`);
  if (filters.isAvailable !== undefined) conditions.push(`is_available = ${filters.isAvailable ? 1 : 0}`);

  const whereClause = conditions.length > 0 ? conditions.join(' AND ') : undefined;

  const cars = await db
    .select()
    .from(CarTable)
    .where(whereClause ?? "")
    .execute();

  return cars;
};

export const getUserInfo = async (id: string) => {
  const db = DataBaseManager.getinstance().getdb();

  const user = await db
    .select()
    .from(UserTable)
    .where(`id = '2'`)
    .execute();
  console.log(user);
  if (user.length === 0) {
    throw new Error(`User with id=${id} not found`);
  }
  return user[0];
};

export const getInsurancePlans = () => INSURANCE_PLANS;

export const updateUserInfo = async (info: any) => {
  console.log(`Updating following user info: ${info.key} - ${info.value}`);
  const db = DataBaseManager.getinstance().getdb();
  await db
    .update(UserTable)
    .set({ [info.key]: info.value })
    .where(`id = '${info.userId}'`)
    .execute();
};

export const createBooking = async (booking: { start_date: string; end_time: string; car_id: number; user_id: string; agency_id: number }) => {
  const db = DataBaseManager.getinstance().getdb();
  const result = await db.insert(BookingTable).values(booking).execute();

  await db
    .update(CarTable)
    .set({ is_available: 0 })
    .where(`id = ${booking.car_id}`)
    .execute();

  return result;
};

export const getAgencies = async () => {
  const db = DataBaseManager.getinstance().getdb();
  return await db.select().from(AgencyTable).execute();
};

export const getAgency = async (id: number): Promise<AgencyType> => {
  const db = DataBaseManager.getinstance().getdb();
  const result = await db.select().from(AgencyTable).where(`id = ${id}`).execute();
  if (result.length === 0) throw new Error(`Agency with id=${id} not found`);
  return result[0];
};

export const getCurrentBookings = async (id: string) => {
  const db = DataBaseManager.getinstance().getdb();
  const today = new Date().toISOString().split("T")[0];
  console.log(`user id is ${id}`);
  return await db
    .select()
    .from(BookingTable)
    .where(`user_id = '${id}' AND start_date <= '${today}' AND end_date >= '${today}'`)
    .execute();
};

export const getPastBookings = async (id: string) => {
  const db = DataBaseManager.getinstance().getdb();
  const today = new Date().toISOString().split("T")[0];

  return await db
    .select()
    .from(BookingTable)
    .where(`user_id = '${id}' AND end_date <= '${today}'`)
    .execute();
};

export const getFutureBookings = async (id: string) => {
  const db = DataBaseManager.getinstance().getdb();
  const today = new Date().toISOString().split("T")[0];

  return await db
    .select()
    .from(BookingTable)
    .where(`user_id = '${id}' AND start_date >= '${today}'`)
    .execute();
};
