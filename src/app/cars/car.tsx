import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text } from "react-native";

export default function Car() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // we need some runtime safety
  if (!id || typeof id !== "string") {
    console.error("Car Page: incorrect id");
    // return REDIRECT TO ERROR PAGE / HOME PAGE
  }

  const image = { uri: "https://www.evspecifications.info/wp-content/uploads/2020/01/volvo-xc90-t8-evchargeplus-00-1-1024x680.png" };

  return (
    <ScrollView style={styles.scrollview} contentContainerStyle={{ alignItems: "stretch", justifyContent: "space-between", gap: 16 }}>
      <Image source={image} style={styles.image}></Image>
      <Pressable style={styles.next}>
        <Text>Next</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    display: "flex",
    flex: 1,
    padding: 16,
    flexDirection: "column",
    backgroundColor: "red",
  },
  next: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    aspectRatio: "16/9",
    backgroundColor: "green",
  }
});
