import { ICONS } from "@/src/constants/icons";
import { CarType } from "@/src/database/schema";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import FeatureIcon from "../molecules/FeatureIcon";
import VerticalSeperator from "../molecules/VerticalSeperator";

const CarInfoIcons = ({ car }: { car: CarType }) => {
  const theme = useTheme();

  return (
    <View style={[styles.detail, styles.summary]}>
      <FeatureIcon text={`${car.seats} seats`} icon={ICONS.SEAT} />
      <VerticalSeperator />
      <FeatureIcon text={`${car.trunk_space} bags`} icon={ICONS.BAGS} />
      <VerticalSeperator />
      <FeatureIcon text={`${5} doors`} icon={ICONS.DOOR} />
      {/* the dynamic '5' 😂 */}
      <VerticalSeperator />
      <FeatureIcon
        text={car.transmission || "Auto"}
        icon={ICONS.TRANSMISSION}
      />
    </View>
  );
};

export default CarInfoIcons;

const styles = StyleSheet.create({
  summary: {
    textAlign: "center",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginLeft: 8,
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 8,
  },
});
