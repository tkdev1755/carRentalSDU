import {ActivityIndicator, Button, Card, Modal, Portal, Text, TextInput} from "react-native-paper";
import {View,StyleSheet} from "react-native";
import React from "react";
import {useAgency} from "@/src/hooks/useAgency";
import {useCar} from "@/src/hooks/useCar";

type BookingConfirmationModalProps = {
  booked: boolean;
  visible: boolean;
  onDismiss: () => void;
  bookingInfo: any;
}
export const BookingConfirmationModal:React.FC<BookingConfirmationModalProps> = ({booked, visible, onDismiss,bookingInfo}) => {
  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{ padding: 20 }}>
          <Card>
            <Card.Content>
              <View style={{ padding: 16 }}>
                {booked ? <BookingConfirmation bookingInfo={bookingInfo}/> : <BookingCreationInfo/>}
              </View>
              <Button onPress={() => {onDismiss()}} style={{ marginTop: 20 }}>
                Ok
              </Button>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>

    </>
    );
};

const BookingCreationInfo = () => {
  return (
    <View>
      <View style={{ flexDirection: "column", justifyContent: "space-between",alignItems:"center" }}>
        <ActivityIndicator size={"large"}></ActivityIndicator>
        <Text>
          Hold tight while we confirm your booking.
        </Text>
      </View>
    </View>
  );
};

type BookingConfirmationProps = {
  bookingInfo:any;
}
const BookingConfirmation: React.FC<BookingConfirmationProps> = ({bookingInfo}) => {
  const {agency,isLoading,error} = useAgency(bookingInfo.agency_id);
  const {car, isLoading: isLoadingCar, error: errorCar} = useCar(bookingInfo.car_id);
  const styles = StyleSheet.create({
    padding : {
      paddingBottom :10
    }
  })
  return (
    <View style={{ flexDirection: "column", justifyContent: "space-between",alignItems:"flex-start" }}>
      <Text variant={"titleLarge"} style={styles.padding}>
        Your booking has been confirmed!
      </Text>
      <Text variant={"titleMedium"} style={styles.padding}>
        Here are the details of your booking:
      </Text>
      <Text variant={"bodyLarge"} style={styles.padding}>
        Your car : {car?.name}
      </Text>
      <Text variant={"bodyLarge"} style={styles.padding}>
        From : {bookingInfo.start_date} at {bookingInfo.start_time}
      </Text>
      <Text variant={"bodyLarge"} style={styles.padding}>
        To : {bookingInfo.end_date} at {bookingInfo.end_time}
      </Text>
      <Text variant={"bodyLarge"} style={styles.padding}>
        Pickup address : {agency?.location}
      </Text>
    </View>
  );

}

