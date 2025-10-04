import { IconName, ICONS } from "@/src/constants/icons";
import { useCar } from "@/src/hooks/useCar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {Link, useLocalSearchParams} from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

import {useAgency} from "@/src/hooks/useAgency";

export const FeatureIcon = (text: string, icon: IconName) => (
  <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
    <MaterialCommunityIcons name={icon} color="#666" size={24} />
    <Text>{text}</Text>
  </View>
);

export const VerticalSeperator = () => <View style={{ width: 1, backgroundColor: '#ccc', marginHorizontal: 8 }} />;

export default function Car() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { car, isLoading, error } = useCar(Number(id));
  const {agency} = useAgency(car?.agency_id ?? -1);
  const theme = useTheme();
  console.log(`HERE IS OUR CAR ${id}`);
  console.log(`HERE IS OUR CAR NAME and ID ${car?.name} - ${car?.id} ${Number(id) === car?.id ? "YES" : "NO"}`);
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const VerticalSeperator = () => (
    <View
      style={{
        width: 1,
        backgroundColor: theme.colors.secondary,
        marginHorizontal: 8,
      }}
    />
  );

  const FeatureIcon = (text: string, icon: IconName) => (
    <View style={{ flexDirection: "column", alignItems: "center", gap: 4 }}>
      <MaterialCommunityIcons
        name={icon}
        color={theme.colors.secondary}
        size={24}
      />
      <Text variant="labelSmall">{text}</Text>
    </View>
  );

  return (
    <Card style={{ ...styles.container }}>
      <Card.Cover source={{ uri: car?.image }} style={styles.image} />
      <Card.Title
        title={car?.name}
        subtitle={car?.type}
        titleVariant="displayMedium"
        subtitleVariant="labelMedium"
      />
      <Card.Content>
        <View style={[styles.detail, styles.summary]}>
          {FeatureIcon(`${car?.seats} seats`, ICONS.SEAT)}
          <VerticalSeperator />
          {FeatureIcon(`${car?.trunk_space} bags`, ICONS.BAGS)}
          <VerticalSeperator />
          {FeatureIcon(`${5} doors`, ICONS.DOOR)}
          <VerticalSeperator />
          {FeatureIcon(car?.transmission || "Auto", ICONS.TRANSMISSION)}
        </View>

        <View style={{ marginTop: 4, padding: 8 }}>
          <View style={styles.rowDetails}>
            <Text>Engine : {car?.engine}</Text>
          </View>
          <View style={styles.rowDetails}>
            <Text>Agency : {agency?.name}</Text>
            <Text style={{ color: car?.is_available ? theme.colors.primary : theme.colors.error}}>{car?.is_available ? "Available" : "Not Available"}</Text>
          </View>
          <View style={styles.rowDetails}>

          </View>
        </View>
      </Card.Content>
      <Card.Actions style={{justifyContent: "space-between"}}>
        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
          {car?.price}€ / day
        </Text>

        <Link href={`/cars/BookingPage?id=${id}`} asChild>
          <Button mode="contained-tonal">
            Book Car
          </Button>
        </Link>
      </Card.Actions>
    </Card>
  );
}

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
    backgroundColor : "transparent",
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
