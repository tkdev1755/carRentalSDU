import { IconName } from "@/src/constants/icons";
import React from "react";
import { ColorValue, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";

const IconWithInfo = ({
  color,
  icon,
  text,
}: {
  color: ColorValue | undefined;
  icon: IconName;
  text: string;
}) => {
  return (
    <View style={styles.container}>
      <Icon source={icon} size={12} color={String(color)} />
      <Text style={{ color }}>{text}</Text>
    </View>
  );
};

export default IconWithInfo;

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 2, alignItems: "center" },
});
