import { MOCK_CARS } from "./mocks/cars";

export const getAvailableCars = async () => {
  // just simulating some time delay "waiting for the data"
  await new Promise((res) => setTimeout(res, 500));
  return MOCK_CARS;
};
