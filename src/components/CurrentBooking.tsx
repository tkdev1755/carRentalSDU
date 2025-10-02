import * as React from "react";
import { FlatList, View,StyleSheet } from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import BookingItem from "./BookingItem";
import {Booking} from "../hooks/useCurrentBookings";

type Props = {bookings:Booking[]; loading:boolean};

export default function CurrentBooking({bookings,loading}:Props){
    if(loading){
        return (
            <View style={styles.center}>
                <ActivityIndicator animating={true} size={"large"}/>
            </View>
        );
    }

    if(!loading && bookings.length===0) {
        return(
            <View style={styles.center}>
                <Text variant={"bodyMedium"}>No current bookings</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>
                Current Bookings
            </Text>
            <FlatList
                data={bookings}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=> <BookingItem booking={item}/>}
                contentContainerStyle={styles.list} />
        </View>
    );
}

const styles=StyleSheet.create({
    container: {
        flex:1,
        marginTop:16,
    },
    title:{
        textAlign:'center',
        marginBottom:12,
    },
    list:{
        paddingHorizontal:16,
    },
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:"center",
    },
});
