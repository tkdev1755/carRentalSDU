import {useLocalSearchParams} from "expo-router";
import React, { useState } from "react";
import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import {Button, Text, useTheme} from "react-native-paper";
import {useCar} from "@/src/hooks/useCar";
import {LocationSelector} from "@/src/components/LocationSelector";
import {DatePicker} from "@/src/components/DatePicker";
import {InsuranceOptions} from "@/src/components/InsuranceOptions";
import {format} from "date-fns";
import {useSnackbar} from "@/src/context/SnackbarContext";
import {createBooking} from "@/src/api/services";
import {useUser} from "@/src/hooks/useUser";

// @ts-ignore
const BookingPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const {userID} = useLocalSearchParams<{userID : string}>();
    const {car, isLoading, error } = useCar(parseInt(id, 10));
    const [selectedInsurance, setSelectedInsurance] = useState<number|undefined>(undefined);
    const [startDate, setStartDate] = useState<Date|undefined>(undefined);
    const [endDate, setEndDate] = useState<Date|undefined>(undefined);
    const theme = useTheme();
    const onInsuranceSelect = (id:number) => {
        console.log(`Selected insurance : ${id}`);
        setSelectedInsurance(id);
    }
    const {showSnackbar} = useSnackbar()
    const onDateChange = (date:Date, type:string) => {
      if (type === "start") {
        console.log(`Start date changed to ${date}`);
        setStartDate(date);
      } else if (type === "end") {
        console.log(`End date changed to ${date}`);
        setEndDate(date);
      }
    }
    const getPrice = (endDate?:Date, startDate?:Date, price?:number) : number => {
      if (endDate === undefined || startDate === undefined) {
        return price ?? 0;
      }
      const diffInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
      const total = diffInDays * (price ?? 0);
      return total;
    }
    const bookCar = async () => {
      if (startDate === undefined || endDate === undefined) {
        console.log("Start date or end date is undefined");
        showSnackbar("Please select a start and end date");
        return;
      }
      else if (selectedInsurance === undefined) {
        console.log("Insurance option is undefined");
        showSnackbar("Please select an insurance option");
        return;
      }
      else if (startDate > endDate) {
        console.log("Start date is after end date");
        showSnackbar("Start date must be before end date");
        return;
      }
      else if (startDate < new Date()) {
        console.log("Start date is in the past");
        showSnackbar("Start date must be in the future");
        return;
      }
      else if (endDate < new Date()) {
        console.log("End date is in the past");
        showSnackbar("End date must be in the future");
        return;
      }
      else if (endDate.getTime() - startDate.getTime() < 24 * 60 * 60 * 1000) {
        console.log("Booking must be at least 24 hours long");
        showSnackbar("Booking must be at least 24 hours long");
        return;
      }
      else {
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
                    <InsuranceOptions onSelect={onInsuranceSelect} selectedOption={selectedInsurance}></InsuranceOptions>
                </View>
                <View style={styles.margin}>
                  <View style={styles.row}>
                    <Text variant={"titleLarge"}>Price : {getPrice(endDate,startDate,car?.price).toFixed(1)} €</Text>
                    <Button  mode="contained-tonal" onPress={ async () => {
                      await bookCar();
                    }}>
                      Book
                    </Button>
                  </View>

                </View>
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
