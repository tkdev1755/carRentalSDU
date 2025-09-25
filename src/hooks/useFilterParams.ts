import queryString from "query-string"
import {useLocalSearchParams, router} from "expo-router"
import { CarFilters } from "./useCars";
import { useMemo } from "react";

const fetcher = () => ();

/**
 * This component encapsulates all logic for the state management done in the URL
 */

const useFilterParams = () => {
    const stringParams = useLocalSearchParams();

  const parsedFilters: CarFilters = useMemo(() => ({
    brand: 
  }), [stringParams])
};

export { useFilterParams };
