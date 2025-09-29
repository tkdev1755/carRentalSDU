import {Button, ScrollView, View} from "react-native";
import { useFilterParams } from "../hooks/useFilterParams";
import {FilterOptions} from "@/src/components/FilterOptions";
import {FilterModal} from "@/src/components/FilterModal";
import {CarFilters} from "@/src/types/CarFilters";
import React, {useState} from "react";
import {MOCK_CARS} from "@/src/api/mocks/cars";
import {ShellCarCard} from "@/src/components/ShellCarCard";
import CarList from "@/src/components/CarList";

export default function Index() {
  // //const params: CarFilters = useLocalSearchParams();
  // //const { cars, isLoading, error } = useCars(params);

  let f = {
    trunkSpace: 12,
    engineType: "petrol",
    isAvailable: false,
  };
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const filtersOptions = [
        { name: "Engine", associatedFunction: () => {setActiveFilter("Engine")} },
        { name: "Price", associatedFunction: () => {setActiveFilter("Price")} },
        { name: "Seats", associatedFunction: () => {setActiveFilter("Seats")}  },
        { name: "Trunk space", associatedFunction: () => {setActiveFilter("TrunkSpace")}  },
        { name: "Transmission", associatedFunction: () => {setActiveFilter("Transmission")}  },
        { name: "Type", associatedFunction: () => {setActiveFilter("Type")}  },
    ];
    const {filters, setFilters} = useFilterParams();

    const handleApply = (updated: CarFilters) => {
        setFilters({ ...filters, ...updated });
        setActiveFilter(null);
    };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
        <ScrollView>
            <FilterOptions options={filtersOptions}/>
            <FilterModal
                visible={activeFilter !== null}
                filter={activeFilter}
                filters={filters}
                onApply={handleApply}
                onDismiss={() => setActiveFilter(null)}
            />
            <CarList filters={filters}></CarList>
        </ScrollView>

    </View>
  );
}
