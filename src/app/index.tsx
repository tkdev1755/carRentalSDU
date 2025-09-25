import { Button, View } from "react-native";
import { useFilterParams } from "../hooks/useFilterParams";

export default function Index() {
  const { filters, setFilters } = useFilterParams();
  // //const params: CarFilters = useLocalSearchParams();
  // //const { cars, isLoading, error } = useCars(params);

  let f = {
    trunkSpace: 12,
    engineType: "petrol",
    isAvailable: false,
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/*<FilterOptions options={} /> URL State set here
       <FlatList /> */}
      <Button title="learn more" onPress={() => setFilters(f)} />
    </View>
  );
}
