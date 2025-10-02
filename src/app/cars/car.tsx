import { IconName, ICONS } from "@/src/constants/icons";
import { useCar } from "@/src/hooks/useCar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams } from "expo-router";

import { Image, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function Car() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { car, isLoading, error } = useCar(id);

  if (isLoading)  return (<Text>Loading...</Text>)
  if (error) return (<Text>Error: {error.message}</Text>)

  const VerticalSeperator = () => <View style={{ width: 1, backgroundColor: '#ccc', marginHorizontal: 8 }} />;
  
  const FeatureIcon = (text: string, icon: IconName) => (
    <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <MaterialCommunityIcons name={icon} color="#666" size={24} />
      <Text>{text}</Text>
    </View>
  );

  const handleNext = () => {
    // TODO(mathias): handle the next button press
  };

  return (
    <View style={styles.container}>
      <View style={styles.details}>
      <Image source={{ uri: car?.image }} style={styles.image} />
        <View>
          <Text style={styles.title}>{car?.name}</Text>
          <Text style={styles.description}>{car?.type}</Text>
        </View>
        <View style={[styles.detail, styles.summary]}>
          {FeatureIcon(`${car?.seats} seats`, ICONS.SEAT)}
          <VerticalSeperator />
          {FeatureIcon(`${car?.trunk_space} bags`, ICONS.BAGS)}
          <VerticalSeperator />
          {FeatureIcon(`${5} doors`, ICONS.DOOR)}
          <VerticalSeperator />
          {FeatureIcon(car?.transmission_type || "Auto", ICONS.TRANSMISSION)}
        </View>
        <View style={{ marginTop: 4, padding: 8 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16, gap: 8 }}>
            <Text>Model</Text>
            <Text>Miles: 20,000</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16, gap: 8 }}>
            <Text>Color: White</Text>
            <Text>{car?.is_available ? "Available" : "Not Available"}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16, gap: 8 }}>
            <Text>EUR {car?.price} / day</Text>
            <Pressable style={styles.button} onPress={handleNext}>
              <Text style={{textAlign: "center"}}>Next</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
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
  },
  button: {
    backgroundColor: "lightblue",
    padding: 8,
    borderRadius: 4,
    width: 100,
    textAlign: "center",
  },
  image: {
    marginHorizontal: "auto",
    borderRadius: 2,
    marginBottom: 8,
    aspectRatio: "16/9",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 8
  },
  details: {
    padding: 12,
    borderWidth: 0.5,
    backgroundColor: "white",
    borderColor: "#ccc"
  }
});

