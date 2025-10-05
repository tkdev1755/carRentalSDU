import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { BookingType } from "../database/schema";
import BookingItem from "./BookingItem";

type Props = { bookings: BookingType[] | undefined; loading: boolean };

export default function PastBooking({ bookings, loading }: Props) {
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  if (!loading && bookings && bookings.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noBookingsText}>No past bookings</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <BookingItem booking={item} />}
      contentContainerStyle={styles.list}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  center: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  noBookingsText: {
    fontSize: 18,
    textAlign: "center",
  },
});
