import { useEffect, useState} from "react";
import { getCurrentBookings} from "@/src/api/services";

export type Booking = {
    id: number;
    start_date: string;
    end_time: string;
    car_id: number|null;
    user_id: string|null;
    agency_id: number|null;
};

export function useCurrentBookings(user_id:string) {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getCurrentBookings(user_id);
                setBookings(data);
            } catch (err) {
                console.log("Error while charging the bookings", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user_id]);
    return { bookings, loading};
}