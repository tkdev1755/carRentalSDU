import * as React from "react";
import {Card,Text} from "react-native-paper";
import {StyleSheet} from 'react-native';
import {Booking} from "../hooks/useCurrentBookings";

type Props = {booking: Booking;};

export default function BookingItem({booking}:Props) {
    return (
        <Card style={styles.card}>
            <Card.Content>
                <Text variant="titleMedium">Booking #{booking.id}</Text>
                <Text variant="bodyMedium">Car ID: #{booking.car_id??"_"}</Text>
                <Text variant="bodyMedium">From: {booking.start_date}</Text>
                <Text variant="bodyMedium">To: {booking.end_time}</Text>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {marginBottom:12,borderRadius:12,elevation:2,},
});