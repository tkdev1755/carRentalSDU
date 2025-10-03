import useSwr from "swr";

import {getAgency} from "../api/services";

const fetcher = ([,id]: [string,number]) => getAgency(id); //if this function throw an error, it'l be collected by SWR;

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
const useAgency = (agencyId: number) => {
    const { data, error, isLoading } = useSwr(["agency",agencyId], fetcher);
    return {
        agency: data,
        isLoading,
        error: error,
    };
};

export { useAgency };
