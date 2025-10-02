import { CarFilters } from "@/src/types/CarFilters";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCars } from "../hooks/useCars";
import { ShellCarCard } from "./ShellCarCard";

export default function CarList(filters: CarFilters) {
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
      {cars.map((car) => (
        <ShellCarCard key={car.id} car={car} />
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({});
