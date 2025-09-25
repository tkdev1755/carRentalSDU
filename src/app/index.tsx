import { View } from "react-native";
import FilterOptions from "../components/FilterOptions";
import { useCars } from "../hooks/useCars";

export default function Index() {
  // const params = useLocalSearchParams();
  const { filters, setFilters } = useFilterParams();
  const { cars, isLoading, error } = useCars(filters);

  // const parsedFilters = useMemo(
  //   () => ({
  //     price: 2,
  //   }),
  //   [params]
  // ); // if params change, the filters will get updated

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FilterOptions /> {/* URL State set here */}
      {/* <FlatList /> */}
    </View>
  );
}
