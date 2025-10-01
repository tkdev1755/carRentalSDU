import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const CarTable = sqliteTable("Car", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  price: real("price").notNull(),
  seats: integer("seats").notNull(),
  transmission: text("transmission").notNull(), // Manual or Automtic
  type: text("type").notNull(),
  trunk_space: integer("trunk_space").notNull(),
  engine: text("engine").notNull(), // Petrol, Electric, Hybrid
  is_available: integer("is_available").default(1).notNull(),
  agency_id: integer("agency_id").notNull(),
  image: text("image").notNull(),
});
export type CarType = typeof CarTable.$inferSelect;

export const UserTable = sqliteTable("User", {
  id: text("id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  date_of_birth: text("date_of_brith"),
  email: text("email"),
});
export type UserType = typeof UserTable.$inferSelect;

export const AgencyTable = sqliteTable("Agency", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  location: text("location"),
  phone_number: text("phone_number"),
});
export type AgencyType = typeof AgencyTable.$inferSelect;

export const BookingTable = sqliteTable("Booking", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  start_date: text("start_date").notNull(),
  end_time: text("end_time").notNull(),
  car_id: integer("car_id").references(() => CarTable.id),
  user_id: text("user_id").references(() => UserTable.id),
  agency_id: integer("agency_id").references(() => AgencyTable.id),
});
export type BookingType = typeof BookingTable.$inferSelect;
