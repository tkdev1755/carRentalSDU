import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useCar } from "../hooks/useCar";
import { Booking } from "../hooks/useCurrentBookings";
import CarInfoIcons from "./organisms/CarInfoIcons";

type BookingModalProps = {
  booking: Booking;
  onDismiss: () => void;
  visible: boolean;
};

export const BookingModal: React.FC<BookingModalProps> = ({
  booking,
  onDismiss,
  visible,
}) => {
  const { car } = useCar(booking.car_id ?? -1);
  const carImage = car?.image ?? null;
  const carName = car?.name ?? null;
  const carType = car?.type ?? null;
  const HorizontalSeperator = () => (
    <View style={{ height: 1, backgroundColor: "#ccc", marginVertical: 8 }} />
  );

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>Booking Details</Dialog.Title>
        <Dialog.Content>
          <View style={styles.bookingInfos}>
            {carImage && (
              <Image
                source={{ uri: carImage }}
                style={{ width: 300, height: 200 }}
              />
            )}
            <Text variant="titleLarge" style={styles.title}>
              {carName}
            </Text>
            <Text variant="bodyLarge">{carType}</Text>
            <CarInfoIcons car={car} />
            <Text variant="titleMedium">Start : {booking.start_date}</Text>
            <Text variant="titleMedium">End : {booking.end_date}</Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => onDismiss()}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 12,
  },
  summary: {
    textAlign: "center",
    justifyContent: "space-around",
    marginHorizontal: 16,
  },
  bookingInfos: {
    marginTop: 12,
    gap: 4,
  },
  title: {
    paddingTop: 16,
    fontWeight: "bold",
  },
  details: {
    padding: 12,
    borderWidth: 0.5,
  },
});
