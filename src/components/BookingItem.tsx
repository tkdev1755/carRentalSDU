import * as React from "react";
import {useState} from "react";
import { Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Booking } from "../hooks/useCurrentBookings";
import { useCar } from "../hooks/useCar";
import {BookingModal} from "@/src/components/BookingModal";

type Props = { booking: Booking };

export default function BookingItem({ booking }: Props) {
    const {car} = useCar(booking.car_id ?? -1)
    const [visible, setVisible] = useState(false);

    const carImage = car?.image??null;
    const carName = car?.name??null;
    const carType = car?.type??null;

    return (
      <>
        <Card style={styles.card} onPress={() => setVisible(true)}>
            {carImage ? (
                <Card.Cover source={{ uri: carImage }} />
            ) : (
                <View style={styles.errorContainer}>
                    <Text variant="titleLarge" style={styles.errorText}>Error</Text>
                </View>
            )}
            <Card.Content>
                <Text variant="titleLarge" style={styles.title}>{carName}</Text>
                <Text variant="bodyMedium">{carType}</Text>
                <Text variant="bodyMedium">From: {booking.start_date}</Text>
                <Text variant="bodyMedium">To: {booking.end_time}</Text>
            </Card.Content>
        </Card>
      <BookingModal booking={booking} visible={visible} onDismiss={()=>setVisible(false)} />
    </>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 12,
        borderRadius: 12,
        elevation: 2,
    },
    errorContainer: {
        height: 150,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#666',
    },
    title: {
      paddingTop: 16,
      fontWeight: "bold",
    },
});
