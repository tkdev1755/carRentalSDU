import { getPastBookings } from "@/src/api/services";
import useSwr from "swr";

const fetcher = ([, id]: [string, string]) => getPastBookings(id);

export const usePastBooking = (id: string) => {
  const { data, error, isLoading } = useSwr(["past_booking", id], fetcher);
  return {
    bookings: data,
    isLoading,
    error: error,
  };
};
