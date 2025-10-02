import {Button, ScrollView, View} from "react-native";
import { useFilterParams } from "../hooks/useFilterParams";
import {FilterOptions} from "@/src/components/FilterOptions";
import {FilterModal} from "@/src/components/FilterModal";
import {CarFilters} from "@/src/types/CarFilters";
import React, {useEffect, useState} from "react";
import {MOCK_CARS} from "@/src/api/mocks/cars";
import {ShellCarCard} from "@/src/components/ShellCarCard";
import CarList from "@/src/components/CarList";
import {useAppInit} from "@/src/hooks/useAppInit";

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
