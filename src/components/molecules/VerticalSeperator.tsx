import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper/src/core/theming";

const VerticalSeperator = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        width: 1,
        backgroundColor: theme.colors.secondary,
        marginHorizontal: 8,
      }}
    />
  );
};

export default VerticalSeperator;

const styles = StyleSheet.create({});
