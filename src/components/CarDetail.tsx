import { useSnackbar } from "@/src/context/SnackbarContext";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { ICONS } from "../constants/icons";
import { AgencyType, CarType } from "../database/schema";
import CardTitle from "./atoms/CardTitle";
import FeatureIcon from "./molecules/FeatureIcon";

type CarDetailProps = {
  car: CarType | undefined;
  agency: AgencyType | undefined;
  id: string;
};

const CarDetail = ({ car, agency, id }: CarDetailProps) => {
  //Hooks
  const theme = useTheme();
  const handlePress = () => {
    if (!(car?.is_available ?? false)) {
      showSnackbar("This car is unavailable, please book another one");
      return;
    }
    router.push(`/cars/BookingPage?id=${id}`);
  };
  //Component Renderer
  const { showSnackbar } = useSnackbar();
  const VerticalSeperator = () => (
    <View
      style={{
        width: 1,
        backgroundColor: theme.colors.secondary,
        marginHorizontal: 8,
      }}
    />
  );

  return (
    <Card style={{ ...styles.container }}>
      <Card.Cover source={{ uri: car?.image }} style={styles.image} />
      <CardTitle carName={car?.name} carType={car?.type} />
      <Card.Content>
        <View style={[styles.detail, styles.summary]}>
          <FeatureIcon text={`${car?.seats} seats`} icon={ICONS.SEAT} />
          <VerticalSeperator />
          <FeatureIcon text={`${car?.trunk_space} bags`} icon={ICONS.BAGS} />
          <VerticalSeperator />
          <FeatureIcon text={`${5} doors`} icon={ICONS.DOOR} />
          <VerticalSeperator />
          <FeatureIcon
            text={car?.transmission || "Auto"}
            icon={ICONS.TRANSMISSION}
          />
        </View>

        <View style={{ marginTop: 4, padding: 8 }}>
          <View style={styles.rowDetails}>
            <Text>Engine : {car?.engine}</Text>
          </View>
          <View style={styles.rowDetails}>
            <Text>Agency : {agency?.name}</Text>
            <Text
              style={{
                color: car?.is_available
                  ? theme.colors.primary
                  : theme.colors.error,
              }}
            >
              {car?.is_available ? "Available" : "Not Available"}
            </Text>
          </View>
          <View style={styles.rowDetails}></View>
        </View>
      </Card.Content>
      <Card.Actions style={{ justifyContent: "space-between" }}>
        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
          {car?.price}€ / day
        </Text>
        <Button mode="contained-tonal" onPress={handlePress}>
          {car?.is_available ? "Book Car" : "This car is not available"}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default CarDetail;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    padding: 16,
  },
  summary: {
    textAlign: "center",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginLeft: 8,
  },
  image: {
    backgroundColor: "transparent",
    marginHorizontal: "auto",
    borderRadius: 2,
    marginBottom: 8,
    aspectRatio: "16/9",
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 8,
  },
  details: {
    padding: 12,
    borderWidth: 0.5,
    backgroundColor: "white",
    borderColor: "red",
  },
  rowDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 8,
  },
});
