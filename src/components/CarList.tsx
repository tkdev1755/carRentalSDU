import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, ScrollView } from "react-native";
import { ShellCarCard } from "./ShellCarCard";
import {getFilteredCars} from "@/src/api/services";
import {CarFilters} from "@/src/types/CarFilters";

type CarListProps = {
    filters: CarFilters;
};

export default function CarList({ filters }: CarListProps) {
    const [cars, setCars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            const data = await getFilteredCars(filters);
            setCars(data);
            setLoading(false);
        };
        fetchCars();
    }, [filters]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ScrollView>
            {cars.map((car) => (
                <ShellCarCard key={car.id} car={car} />
            ))}
        </ScrollView>
    );
}