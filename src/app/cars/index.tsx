import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const index = () => {
  const router = useRouter();
  return (
    <Button onPress={() => router.navigate("/cars/car?id=ab12")}>
      "Go to About"
    </Button>
  );
};

export default index;

const styles = StyleSheet.create({});
