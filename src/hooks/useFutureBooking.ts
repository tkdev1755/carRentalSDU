import { getFutureBookings } from "@/src/api/services";
import useSwr from "swr";

const fetcher = ([, id]: [string, string]) => getFutureBookings(id);

export const useFutureBookings = (id: string) => {
  const { data, error, isLoading } = useSwr(["future_bookings", id], fetcher);
  return {
    bookings: data,
    isLoading,
    error: error,
  };
};
