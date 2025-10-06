import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";

const CardImage = ({ uri }: { uri: string }) => {
  if (!uri) return <Card.Cover source={require("@/assets/car.png")} />;
  return <Card.Cover source={{ uri }} style={styles.cover} />;
  // TODO: add fallback picture
};

export default CardImage;

const styles = StyleSheet.create({
  cover: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    margin: 16,
    backgroundColor: "transparent",
    marginHorizontal: "auto",
    borderRadius: 2,
    marginBottom: 8,
    aspectRatio: "16/9",
  },
});
