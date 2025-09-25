import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { CarFilters } from "./useCars";

const filtersToParams = (filters: CarFilters): Record<string, string> => {
  const params: Record<string, string> = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === "boolean") {
        params[key] = value.toString();
      } else {
        (params as any)[key] = value;
      }
    }
  });

  console.log("created the following params: ");
  console.log(params);

  return params;
};

const paramsToFilters = (params: Record<string, string>): CarFilters => {
  const filters: CarFilters = {};
  Object.entries(params).forEach(([key, value]) => {
    if (key == "isAvailable") {
      filters[key] = value === "true";
    } else {
      (filters as any)[key] = value; // not the prettiest solution but gets the job done i guess
    }
  });

  console.log("created the following filters: ");
  console.log(filters);

  return filters;
};

/**
 * This hook is for safe storing and accessing filter information
 *
 * @example
 * ```
 * const { filters, setFilters } = useFilterParams();
 *
 * setFilters(obj : CarFilters) -> will update Route
 * filters -> will update on Route change
 * ```
 *
 * Unfortunately, expo router seems to live in a quite unfinished state
 * @see https://github.com/expo/router/discussions/806
 *
 * this hook therefore handles the correct parsing of booleans
 * (numbers work from all I have seen)
 */

const useFilterParams = () => {
  const stringParams: Record<string, string> = useLocalSearchParams();

  const setFilters = (filters: CarFilters) => {
    router.setParams(filtersToParams(filters));
  };

  const filters: CarFilters = useMemo(() => {
    return paramsToFilters(stringParams);
  }, [stringParams]); //if string params change, the filters will get updated

  return { filters, setFilters };
};

export { useFilterParams };
