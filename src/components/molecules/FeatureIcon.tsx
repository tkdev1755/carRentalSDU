import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "react-native-paper/src/core/theming";
import { IconName } from "../../constants/icons";
import { SETTINGS } from "../../constants/settings";

type FeatureIconProps = {
  text: string;
  icon: IconName;
};
const FeatureIcon = ({ text, icon }: FeatureIconProps) => {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "column", alignItems: "center", gap: 4 }}>
      <MaterialCommunityIcons
        name={icon}
        color={theme.colors.secondary}
        size={SETTINGS.THEME.ICON_SIZE}
      />
      <Text variant="labelSmall">{text}</Text>
    </View>
  );
};

export default FeatureIcon;

const styles = StyleSheet.create({});
