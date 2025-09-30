import { getFilteredCars } from "@/src/api/services";
import { CarFilters } from "@/src/types/CarFilters";
import { ScrollView, StyleSheet, Text } from "react-native";
import useSwr from "swr";
import { ShellCarCard } from "./ShellCarCard";

type CarListProps = {
    filters: CarFilters;
};

export default function CarList({ filters }: CarListProps) {
    const { data: cars, error, isLoading } = useSwr(
        ["filteredCars", filters], 
        ([_, filters]) => getFilteredCars(filters as CarFilters)
    );

    if (error) return <Text style={styles.error}>Error loading cars</Text>;
    if (isLoading) return <Text style={styles.loading}>Loading...</Text>;
    if (!cars || cars.length === 0) return <Text style={styles.empty}>No cars found with the given filters</Text>;

    return (
        <ScrollView style={{flex: 1}} >
            {cars.map((car) => (
                <ShellCarCard key={car.uuid} car={car} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    loading: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 20,
    },
    empty: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 20,
    },
})