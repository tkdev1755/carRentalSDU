import { CarFilters } from "@/src/types/CarFilters";
import { MOCK_CARS } from "./mocks/cars";

export const getFilteredCars = async (filters: CarFilters) => {
  let candidateCars = [];

  for (let car of MOCK_CARS) {
    if (filters.transmission && filters.transmission !== car.transmission) continue;
    if (filters.engine && filters.engine !== car.engine) continue;
    if (filters.availability && filters.availability !== car.availability) continue;
    if (filters.maxPrice && car.price > filters.maxPrice) continue;

    await new Promise((res) => setTimeout(res, 100));
    candidateCars.push(car);
  }

  await new Promise((res) => setTimeout(res, 800));
  return candidateCars;
};

export const getCar = async (id: number) => {
  await new Promise((res) => setTimeout(res, 500));
  return MOCK_CARS[id];
};
