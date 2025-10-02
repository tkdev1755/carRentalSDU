import { useRouter } from "expo-router";
import {Button, ScrollView, View,StyleSheet} from "react-native";
import { useFilterParams } from "@/src/hooks/useFilterParams";
import {FilterOptions} from "@/src/components/FilterOptions";
import {FilterModal} from "@/src/components/FilterModal";
import {CarFilters} from "@/src/types/CarFilters";
import React, {useEffect, useState} from "react";
import {MOCK_CARS} from "@/src/api/mocks/cars";
import {ShellCarCard} from "@/src/components/ShellCarCard";
import CarList from "@/src/components/CarList";
import {useAppInit} from "@/src/hooks/useAppInit";
import {Filters} from "@/src/components/Filters"

const Index = () => {
  const router = useRouter();
    const {filters} = useFilterParams();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
            }}
        >
            <ScrollView>
                <Filters filters={filters}/>
                <CarList filters={filters}></CarList>
            </ScrollView>

        </View>
    );
};

export default Index;

const styles = StyleSheet.create({});
