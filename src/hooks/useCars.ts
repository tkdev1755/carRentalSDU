import useSwr from "swr";
import { getAvailableCars } from "../api/services";

interface CarFilters {
  //all filter options go here
  price?: number; // ... and so on
}

const fetcher = () => getAvailableCars();

const useCars = () => {
  const { data, error, isLoading } = useSwr("cars", fetcher);
  return {
    cars: data,
    isLoading,
    error: error,
  };
};

export { useCars };
