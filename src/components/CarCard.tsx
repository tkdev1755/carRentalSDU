import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { ICONS } from "../constants/icons";
import { CarType } from "../database/schema";
import CardImage from "./atoms/CardImage";
import CardTitle from "./atoms/CardTitle";
import NavigationButton from "./atoms/NavigationButton";
import IconWithInfo from "./molecules/IconWithInfo";

type CarCardProps = {
  car: CarType;
};

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const handlePress = () => {
    router.push(`/cars/car?id=${car.id}`);
  };

  const theme = useTheme();

  return (
    <Card style={styles.card} onPress={handlePress}>
      <CardImage uri={car.image as string} />
      <CardTitle carName={car.name} carType={car.type} />
      <Card.Content>
        <View style={styles.details}>
          <View style={styles.detailsRow}>
            <Text variant="bodyMedium">Seats: {car.seats}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text variant="bodyMedium">Engine: {car.engine}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text variant="bodyMedium" style={styles.price}>
            {car.price.toFixed(2)}€<Text style={styles.perDay}> /day</Text>
          </Text>
          <NavigationButton
            text="View details"
            pathname="/cars/car"
            params={{ id: car.id }}
          />
        </View>
        {!car.is_available && (
          <IconWithInfo
            color={theme.colors.error}
            icon={ICONS.CAR_NOT_AVAILABLE}
            text="Not available"
          />
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  unavailableChip: {
    backgroundColor: "transparent",
  },
  unavailableText: {
    color: "transparent",
    fontSize: 12,
  },
  details: {
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "grey",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  perDay: {
    fontSize: 20,
    fontWeight: "normal",
  },
  button: {
    borderRadius: 8,
  },
});
