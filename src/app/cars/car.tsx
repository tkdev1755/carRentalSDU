import CarDetail from "@/src/components/CarDetail";
import { useAgency } from "@/src/hooks/useAgency";
import { useCar } from "@/src/hooks/useCar";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, useTheme } from "react-native-paper";

export default function Car() {
  //Hooks
  const theme = useTheme();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { car, isLoading, error } = useCar(Number(id));
  const { agency } = useAgency(car?.agency_id ?? -1);

  //Console logs 🍿


  //Page title setting
  useEffect(() => {
    navigation.setOptions({ title: `Details: ${car?.name}` });
  }, [navigation]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return <CarDetail car={car} agency={agency} id={id} />;
}
