import useSwr from "swr";
import { getCar } from "../api/services";

//TODO: derive car class from drizzle and add as : Promise<Car>
const fetcher = ([, id]: [string, string]) => {
  getCar(id); //if this function throw an error, it'l be collected by SWR
};

/**
 *
 * @param id -> if undesfined, request will pause automatically
 * @returns {car: Car, isLoading : boolean, isError : any}
 *
 * @example
 * // usage inside a component
 * const {car, isLoading, isError} = useCar('123ABC')
 * if (isLoading) return <Spinner />
 * if (error) return <Error />
 * if (!car) return <CarNotFoundError />
 */
const useCar = (id: string | undefined) => {
  const { data, error, isLoading } = useSwr(["car", id], fetcher);
  return {
    car: data,
    isLoading,
    error: error,
  };
};

export { useCar };
