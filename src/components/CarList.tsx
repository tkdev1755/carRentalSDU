import { CarFilters } from "@/src/types/CarFilters";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useCars } from "../hooks/useCars";
import { CarCard } from "./CarCard";

export default function CarList({ filters }: { filters: CarFilters }) {
  const { cars, isLoading, error } = useCars(filters);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>An error occured</Text>
      </View>
    );
    // TODO: throw Snackbar
  }

  if (cars == undefined || cars?.length == 0) {
    // no results
    return <></>;
  }

  return (
    <ScrollView>
      {cars.map((car, i) => (
        <CarCard key={i} car={car} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
