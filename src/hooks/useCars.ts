import useSwr from "swr";
import { getAvailableCars } from "../api/services";

const fetcher = () => getAvailableCars();

const useCars = () => {
  const { data, error, isLoading } = useSwr("cars", fetcher);
  return {
    cars: data,
    isLoading,
    isError: error,
  };
};

export { useCars };
