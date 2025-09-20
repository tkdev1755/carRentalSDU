import useSwr from "swr";
import { getCar } from "../api/services";

const fetcher = (id: string) => {
  getCar(id);
  //TODO: error Handling?
};

/**
 *
 * @param id Car id
 * @returns car, isLoading, isError
 */

const useCar = (id: string) => {
  const { data, error, isLoading } = useSwr(["car", id], fetcher);
  return {
    car: data,
    isLoading,
    isError: error,
  };
};

export { useCar };
