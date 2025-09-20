import { MOCK_CARS } from "./mocks/cars";

export const getAvailableCars = async () => {
  //Just for simple testing

  //we might deprecate this later and move to a more filter-friendly function

  // just simulating some time delay "waiting for the data"
  await new Promise((res) => setTimeout(res, 500));
  return MOCK_CARS;
};

export const getCar = async (id: string) => {
  await new Promise((res) => setTimeout(res, 500));
  return MOCK_CARS[0];
};
