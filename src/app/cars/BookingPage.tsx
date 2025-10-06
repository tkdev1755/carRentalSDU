import {router, useLocalSearchParams} from "expo-router";
import React, {useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import {Button, Text, useTheme} from "react-native-paper";
import {useCar} from "@/src/hooks/useCar";
import {LocationSelector} from "@/src/components/LocationSelector";
import {DatePicker} from "@/src/components/DatePicker";
import {InsuranceOptions} from "@/src/components/InsuranceOptions";
import {format} from "date-fns";
import {useSnackbar} from "@/src/context/SnackbarContext";
import {createBooking} from "@/src/api/services";
import {useInsurance} from "@/src/hooks/useInsurances";
import {FilterModal} from "@/src/components/FilterModal";
import {BookingConfirmationModal} from "@/src/components/BookingConfirmationModal";
import {start} from "node:repl";

// @ts-ignore
const BookingPage = () => {
    const [selectedInsurance, setSelectedInsurance] = useState<any|undefined>(undefined);
    const [startDate, setStartDate] = useState<Date|undefined>(undefined);
    const [endDate, setEndDate] = useState<Date|undefined>(undefined);
    const [price, setPrice] = useState<number>(0);
    const [bookingCreation, setBookingCreation] = useState<boolean>(false);
    const [bookingStatus, setBookingStatus] = useState<boolean>(false);
    const [currentBooking, setCurrentBooking] = useState<any|undefined>(undefined);
    const { id } = useLocalSearchParams<{ id: string }>();
    const {car, isLoading, error } = useCar(parseInt(id, 10));
    const {userID} = useLocalSearchParams<{userID : string}>();
    const {insurances} = useInsurance();
    const theme = useTheme();

    const onInsuranceSelect = (insurance:any) => {
        setPrice(getPrice(endDate,startDate,car?.price,insurance))
        setSelectedInsurance(insurance);
    }

    const {showSnackbar} = useSnackbar();
    const onDateChange = (date:Date, type:string) => {
      if (type === "start") {
        setStartDate(date);
        setPrice(getPrice(endDate, date, car?.price,selectedInsurance) ?? 0);
      } else if (type === "end") {
        setEndDate(date);
        setPrice(getPrice(date, startDate, car?.price,selectedInsurance) ?? 0);
      }
    }

    const getPrice = (endDate?:Date, startDate?:Date, price?:number, insurance?:any) : number => {
      if (endDate === undefined || startDate === undefined) {
        return price ?? 0;
      }

      const diffInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
      let insurancePrice = (insurance?.price ?? 0) * diffInDays;

      return diffInDays * (price ?? 0) + insurancePrice;
    }
    const bookCar = async () => {
      if (startDate === undefined || endDate === undefined) {

        showSnackbar("Please select a start and end date");
        return;
      }
      else if (selectedInsurance === undefined) {
        showSnackbar("Please select an insurance option");
        return;
      }
      else if (startDate > endDate) {

        showSnackbar("Start date must be before end date");
        return;
      }
      else if (startDate < new Date()) {

        showSnackbar("Start date must be in the future");
        return;
      }
      else if (endDate < new Date()) {

        showSnackbar("End date must be in the future");
        return;
      }
      else if (endDate.getTime() - startDate.getTime() < 24 * 60 * 60 * 1000) {

        showSnackbar("Booking must be at least 24 hours long");
        return;
      }
      else {
        setBookingStatus(false);
        setBookingCreation(true);
        const booking = {
          car_id: car?.id ?? -1,
          start_date: format(startDate ?? new Date(), "yyyy-MM-dd"),
          start_time: format(startDate ?? new Date(), "HH:mm"),
          end_time: format(endDate ?? new Date(), "HH:mm"),
          end_date: format(endDate ?? new Date(), "yyyy-MM-dd"),
          agency_id: car?.agency_id ?? -1,
          user_id: userID ?? 2,
        }
        await createBooking(booking);
        setCurrentBooking(booking);

        setBookingStatus(true);
      }
    }
    if (isLoading){
        return(
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
    else if (error){
        return <View>
            <Text>Add better error handling </Text>
        </View>
    }
    return (
        <ScrollView>
            <View style={styles.pageLayout}>
                <View style={styles.margin}>
                    <LocationSelector agencyId={car?.agency_id ?? -1}/>
                </View>
                <View style={styles.margin}>
                    <DatePicker date={startDate} title={"Pickup time"} onDateChange={onDateChange} type={"start"}></DatePicker>
                </View>
                <View style={styles.margin}>
                    <DatePicker date={endDate} title={"Drop-off time"} onDateChange={onDateChange} type={"end"}></DatePicker>
                </View>
                <View style={styles.margin}>
                    <InsuranceOptions onSelect={onInsuranceSelect} selectedOption={selectedInsurance?.id} insurances={insurances}></InsuranceOptions>
                </View>
                <View style={styles.margin}>
                  <View style={styles.row}>
                    <Text variant={"titleLarge"}>Price : {price.toFixed(1)} €</Text>
                    <Button  mode="contained-tonal" onPress={ async () => {
                      await bookCar();
                    }}>
                      Book
                    </Button>
                  </View>
                </View>
                <BookingConfirmationModal
                  visible={bookingCreation}
                  onDismiss={() => {
                    setBookingCreation(false);
                    router.push("/");
                  }} booked={bookingStatus} bookingInfo={currentBooking}                />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    loading : {
         flex: 1, justifyContent: "center", alignItems: "center"
    },
    row :{
      flexDirection : "row",
       justifyContent : "space-between",
       alignItems : "center",
    },
    pageLayout : {
        padding : 20
    },
    margin : {
        paddingBottom : 10,
    }
})

export default BookingPage;
