import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Carview = () => {
  const { carview } = useLocalSearchParams<{ carview: string }>();
  return (
    <View>
      <Text>This is the car with id: {carview}</Text>

      <Text style={{ fontSize: 24, paddingBottom: 30, color: "red" }}>
        old file, use /cars/car?id=1234
      </Text>
    </View>
  );
};

export default Carview;

const styles = StyleSheet.create({});
