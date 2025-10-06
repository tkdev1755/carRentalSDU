import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { BookingType } from "../database/schema";
import { useCar } from "../hooks/useCar";
import CarInfoIcons from "./organisms/CarInfoIcons";

type BookingModalProps = {
  booking: BookingType;
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

  if (!car) {
    return null;
    //TODO: error handling?
  }

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
  bookingInfos: {
    marginTop: 12,
    gap: 4,
  },
  title: {
    paddingTop: 16,
    fontWeight: "bold",
  },
});
