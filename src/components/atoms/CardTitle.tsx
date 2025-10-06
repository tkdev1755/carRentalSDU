import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";

type CardTitleProps = {
  carName: string | undefined;
  carType: string | undefined;
};
const CardTitle = ({ carName, carType }: CardTitleProps) => {
  return (
    <Card.Title
      title={carName}
      subtitle={carType}
      titleVariant="titleLarge"
      subtitleVariant="labelMedium"
    />
  );
};

export default CardTitle;

const styles = StyleSheet.create({});
