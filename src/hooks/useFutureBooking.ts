import {useEffect, useState} from "react";
import {getFutureBookings} from '@/src/api/services';

export type Booking = {
    id: number;
    start_date: string;
    end_time: string;
    user_id: string|null;
    car_id: number|null;
    agency_id: number|null;
};

export function useFutureBookings(user_id: string){
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getFutureBookings(user_id);
                setBookings(data);
            } catch (err) {
                console.log("Error while fetching datas",err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [user_id]);

    return {bookings,loading};
}

