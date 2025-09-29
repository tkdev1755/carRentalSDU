import useSwr from "swr";
import { getAvailableCars } from "../api/services";
import { CarFilters } from "../types/CarFilters";

const fetcher = () => getAvailableCars();

const useCars = (filters: CarFilters) => {
  const { data, error, isLoading } = useSwr("cars", fetcher);
  return {
    cars: data,
    isLoading,
    error: error,
  };
};

export { useCars };
