import useSwr from "swr";
import { getFilteredCars } from "../api/services";
import { CarFilters } from "../types/CarFilters";

const fetcher = ([, filters]: [string, CarFilters]) => getFilteredCars(filters);

const useCars = (filters: CarFilters) => {
  const { data, error, isLoading } = useSwr(["cars", filters], fetcher);
  return {
    cars: data,
    isLoading,
    error: error,
  };
};

export { useCars };
