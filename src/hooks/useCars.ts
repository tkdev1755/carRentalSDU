import useSwr from "swr";
import { getAvailableCars } from "../api/services";

interface CarFilters {
    //all filter options go here
    minPrice?: number;
    maxPrice?: number;
    type?:string;
    seats?: number;
    transmissionType?: string;
    trunkSpace?: number;
    engineType?: string;
    isAvailable?: boolean;
}

const fetcher = () => getAvailableCars();

const useCars = (filters:CarFilters) => {
  const { data, error, isLoading } = useSwr("cars", fetcher);
  return {
    cars: data,
    isLoading,
    error: error,
  };
};

export { useCars };
