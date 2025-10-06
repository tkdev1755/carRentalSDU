import { getCurrentBookings } from "@/src/api/services";
import useSwr from "swr";

const fetcher = ([, id]: [string, string]) => getCurrentBookings(id);

export const useCurrentBookings = (id: string) => {
  const { data, error, isLoading } = useSwr(["current_bookings", id], fetcher);
  return {
    bookings: data,
    isLoading,
    error: error,
  };
};
