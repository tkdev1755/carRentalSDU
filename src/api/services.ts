import { MOCK_CARS } from "./mocks/cars";
import {CarFilters} from "@/src/types/CarFilters";

export const getAvailableCars = async (filter : CarFilters) => {
  //Just for simple testing
    console.log("Fetching available cars");
  //we might deprecate this later and move to a more filter-friendly function

  // just simulating some time delay "waiting for the data"
  await new Promise((res) => setTimeout(res, 500));
  return MOCK_CARS;
};

export const getCar = async (id: number) => {
  await new Promise((res) => setTimeout(res, 500));
  return MOCK_CARS[id];
};
