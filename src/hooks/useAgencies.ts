import useSwr from "swr";

import {getAgencies} from "../api/services";

const fetcher = () => getAgencies(); //if this function throw an error, it'l be collected by SWR;

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
const useAgencies = () => {
    const { data, error, isLoading } = useSwr(["agencies"], fetcher);
    return {
        agencies: data,
        isLoading,
        error: error,
    };
};

export { useAgencies };
