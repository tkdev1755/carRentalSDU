import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import VerticalSeperator from "./VerticalSeperator";

const CardTwoColumn = ({ t1, t2 }: { t1: string; t2: string }) => {
  return (
    <View style={styles.splitText}>
      <Text variant="bodyMedium">{t1}</Text>
      <VerticalSeperator />
      <Text variant="bodyMedium">{t2}</Text>
    </View>
  );
};

export default CardTwoColumn;

const styles = StyleSheet.create({
  splitText: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-evenly",
  },
});
