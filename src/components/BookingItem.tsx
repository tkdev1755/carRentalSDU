import { BookingModal } from "@/src/components/BookingModal";
import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { BookingType } from "../database/schema";
import { useCar } from "../hooks/useCar";
import CardImage from "./atoms/CardImage";
import CardTitle from "./atoms/CardTitle";
import CardTwoColumn from "./molecules/CardTwoColumn";

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
          <CardTwoColumn
            t1={`From: ${booking.start_date}`}
            t2={`To: ${booking.end_date}`}
          />
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
