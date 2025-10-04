import * as React from "react";
import {useEffect, useState} from "react";
import { Card, Text, Portal, Button, Dialog } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Booking } from "../hooks/useCurrentBookings";
import { useCar } from "../hooks/useCar";
import {CarCard} from "@/src/components/CarCard";

type BookingModalProps = {
  booking:Booking;
  onDismiss: () => void;
  visible:boolean;
};


export const BookingModal: React.FC<BookingModalProps>= ({booking,onDismiss,visible}) => {
  const {car} = useCar(booking.car_id ?? -1)

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>Booking Details</Dialog.Title>
        <Dialog.Content>
          <CarCard car={car}/>
          <View style={styles.bookingInfos}>
            <Text variant="bodyLarge">Start : {booking.start_date}</Text>
            <Text variant="bodyLarge">End : {booking.end_time}</Text>
            <Text variant="bodyLarge">Customer : {booking.user_id}</Text>
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
    gap:4,
  },
});
