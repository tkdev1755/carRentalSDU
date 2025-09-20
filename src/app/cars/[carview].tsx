import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Carview = () => {
  const { carview } = useLocalSearchParams<{ carview: string }>();
  return (
    <View>
      <Text>This is the car with id: {carview}</Text>
    </View>
  );
};

export default Carview;

const styles = StyleSheet.create({});
