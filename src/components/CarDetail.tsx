import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { ICONS } from "../constants/icons";
import { AgencyType, CarType } from "../database/schema";
import CardImage from "./atoms/CardImage";
import CardTitle from "./atoms/CardTitle";
import NavigationButton from "./atoms/NavigationButton";
import IconWithInfo from "./molecules/IconWithInfo";
import CarInfoIcons from "./organisms/CarInfoIcons";

type CarDetailProps = {
  car: CarType | undefined;
  agency: AgencyType | undefined;
  id: string;
};

const CarDetail = ({ car, agency, id }: CarDetailProps) => {
  //Hooks
  const theme = useTheme();
  //Component Renderer

  if (!car) return <></>;

  return (
    <Card style={{ ...styles.container }}>
      <CardImage uri={car?.image as string} />
      <CardTitle carName={car?.name} carType={car?.type} />
      <Card.Content>
        <CarInfoIcons car={car} />
        <View style={{ marginTop: 4, padding: 8 }}>
          <View style={styles.rowDetails}>
            <Text>Engine : {car?.engine}</Text>
          </View>
          <View style={styles.rowDetails}>
            <Text>Agency : {agency?.name}</Text>
          </View>
          <View style={styles.rowDetails}></View>
        </View>
      </Card.Content>
      <Card.Actions style={{ justifyContent: "space-between" }}>
        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
          {car?.price}€ / day
        </Text>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <NavigationButton
            text="Book Car"
            pathname="/cars/BookingPage"
            params={{ id: id }}
            disabled={!(car?.is_available ?? false)}
          />
          {!car?.is_available ? (
            <IconWithInfo
              color={theme.colors.error}
              icon={ICONS.CAR_NOT_AVAILABLE}
              text="Not available"
            />
          ) : null}
        </View>
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
