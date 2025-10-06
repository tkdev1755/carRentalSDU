import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Icon, Text, useTheme } from "react-native-paper";
import CardTitle from "./atoms/CardTitle";

type CarCardProps = {
  car: any;
};

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const handlePress = () => {
    router.push(`/cars/car?id=${car.id}`);
  };

  const theme = useTheme();

  return (
    <Card style={styles.card} onPress={handlePress}>
      <Card.Cover source={{ uri: car.image }} style={styles.cover} />
      <CardTitle carName={car.name} carType={car.type} />
      <Card.Content style={styles.content}>
        {!car.is_available && (
          <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <Icon source="car-info" size={12} color={theme.colors.error} />
            <Text style={{ color: theme.colors.error }}>Not available</Text>
          </View>
        )}
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
            {car.price.toFixed(2)} €<Text style={styles.perDay}>/day</Text>
          </Text>
          <Button
            mode="contained"
            onPress={handlePress}
            style={styles.button}
            compact
          >
            View details
          </Button>
        </View>
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
  cover: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    margin: 16,
    backgroundColor: "transparent",
  },
  content: {},
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
