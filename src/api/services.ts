import { CarFilters } from "../types/CarFilters";
import { MOCK_CARS } from "./mocks/cars";

export const getFilteredCars = async (filters: CarFilters) => {
  //TODO: implement me! please! 🫠

  // just simulating some time delay "waiting for the data"
  await new Promise((res) => setTimeout(res, 500));
  return MOCK_CARS;
};

export const getCar = async (id: number) => {
  await new Promise((res) => setTimeout(res, 500));
  return MOCK_CARS[id];
};
