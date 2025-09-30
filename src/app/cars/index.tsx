import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import CarCard from "@/src/components/CarCard";
import { Link } from "expo-router";

export default function index() {
  return (
    <ScrollView style={styles.scrollview} contentContainerStyle={{ alignItems: "stretch", gap: 16 }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Link href={`/cars/car?id=${i}`} key={i} style={styles.link}>
          <CarCard/>
        </Link>
      ))}
    </ScrollView>
  );
};

// TODO: there is missing some padding below the last element in the scrollview
const styles = StyleSheet.create({
  scrollview: {
    display: "flex",
    flex: 1,
    padding: 16,
    flexDirection: "column",
    backgroundColor: "red",
  },
  link: {
    width: "100%",
    height: "auto",
  },
});
