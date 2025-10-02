import * as React from "react";
import { FlatList, View,StyleSheet } from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import BookingItem from "./BookingItem";
import {Booking} from "../hooks/useCurrentBookings";

type Props = {bookings: Booking[]; loading:boolean};

export default function PastBooking({bookings,loading}:Props){
    if(loading){
        return(
            <View style={styles.center}>
                <ActivityIndicator animating={true} size="large"/>
            </View>
        );
    }

    if(!loading && bookings.length===0){
        return (
            <View style={styles.center}>
                <Text style={styles.noBookingsText}>No past bookings</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>
                Past Bookings
            </Text>
            <FlatList
                data={bookings}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <BookingItem booking={item} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    list: {
        paddingHorizontal: 16,
    },
    center:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 300,
    },
    noBookingsText: {
        fontSize: 18,
        textAlign: "center",
    },
});