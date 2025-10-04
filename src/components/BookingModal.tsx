import * as React from "react";
import {useEffect, useState} from "react";
import { Card, Text, Portal, Button, Dialog } from "react-native-paper";
import {Image, StyleSheet, View} from "react-native";
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
  const carImage = car?.image??null;
  const carName = car?.name??null;
  const carType = car?.type??null;
  const carEngine = car?.engine;
  const carPrice = car?.price;
  const carSeats = car?.seats;
  const carTransmission = car?.transmission;
  const carTrunkSpace = car?.trunk_space;
  const carAgencyId = car?.agency_id ? car?.agency_id : null;


  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>Booking Details</Dialog.Title>
        <Dialog.Content>
          <View style={styles.bookingInfos}>
            {carImage && (<Image source={{ uri: carImage }} style={{ width: 300, height: 200 }}/>)}
            <Text variant="titleLarge" style={styles.title}>{carName}</Text>
            <Text variant="bodyLarge">Type : {carType}</Text>
            <Text variant="bodyLarge">Engine : {carEngine}</Text>
            <Text variant="bodyLarge">Seats : {carSeats}</Text>
            <Text variant="bodyLarge">Trunk Space : {carTrunkSpace}</Text>
            <Text variant="bodyLarge">Transmission : {carTransmission}</Text>
            <Text variant="bodyLarge">Agency id : {carAgencyId}</Text>
            <Text variant="bodyLarge">Price : {carPrice}€/day</Text>
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
  title: {
    paddingTop: 16,
    fontWeight: "bold",
  },
});
