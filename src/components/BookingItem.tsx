import { BookingModal } from "@/src/components/BookingModal";
import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { BookingType } from "../database/schema";
import { useCar } from "../hooks/useCar";
import CardImage from "./atoms/CardImage";
import CardTitle from "./atoms/CardTitle";

type Props = { booking: BookingType };

export default function BookingItem({ booking }: Props) {
  const { car } = useCar(booking.car_id ?? -1);
  const [visible, setVisible] = useState(false);

  const carImage = car?.image ?? null;
  const carName = car?.name ?? null;
  const carType = car?.type ?? null;

  return (
    <>
      <Card style={styles.card} onPress={() => setVisible(true)}>
        <CardImage uri={carImage as string} />
        <CardTitle carName={car?.name} carType={car?.type} />
        <Card.Content>
          <Text variant="bodyMedium">From: {booking.start_date}</Text>
          <Text variant="bodyMedium">To: {booking.end_date}</Text>
        </Card.Content>
      </Card>
      <BookingModal
        booking={booking}
        visible={visible}
        onDismiss={() => setVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 12,

    elevation: 2,
  },
  errorText: {
    color: "#666",
  },
  title: {
    paddingTop: 16,
    fontWeight: "bold",
  },
});
