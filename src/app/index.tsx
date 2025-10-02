import CarList from "@/src/components/CarList";
import { FilterModal } from "@/src/components/FilterModal";
import { FilterOptions } from "@/src/components/FilterOptions";
import { useAppInit } from "@/src/hooks/useAppInit";
import { CarFilters } from "@/src/types/CarFilters";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useFilterParams } from "../hooks/useFilterParams";

export default function Index() {
  // //const params: CarFilters = useLocalSearchParams();
  // //const { cars, isLoading, error } = useCars(params);
    useAppInit();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
        <ScrollView>

        </ScrollView>

    </View>
  );
}
