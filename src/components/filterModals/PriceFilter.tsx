import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { CarFilters } from "../../types/CarFilters";

type PriceFilterProps = {
    filters: CarFilters;
    onChange: (f: CarFilters) => void;
};
/**
 * Component for displaying the Price filtering option in the FilterModal Component
 * Needs a PriceFilterProps which in itself is a function to execute when validating the choice and a CarFilter object
 * @example
 * <PriceFilter filters={tempFilters} onChange={f => (filters = f)} />;
 **/
export const PriceFilter: React.FC<PriceFilterProps> = ({ filters, onChange }) => {
    const [min, setMin] = useState<string>(filters.minPrice?.toString() ?? "");
    const [max, setMax] = useState<string>(filters.maxPrice?.toString() ?? "");

    useEffect(() => {
        const newFilters: CarFilters = {
            ...filters,
            minPrice: min ? Number(min) : undefined,
            maxPrice: max ? Number(max) : undefined,
        };
        onChange(newFilters);
    }, [min, max]);

    return (
        <View style={{ padding: 16 }}>
            <Text variant="titleMedium" style={{ marginBottom: 10 }}>
                Select price range
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TextInput
                    mode="outlined"
                    label="Min (€)"
                    value={min}
                    onChangeText={setMin}
                    keyboardType="numeric"
                    style={{ flex: 1, marginRight: 8 }}
                />
                <TextInput
                    mode="outlined"
                    label="Max (€)"
                    value={max}
                    onChangeText={setMax}
                    keyboardType="numeric"
                    style={{ flex: 1, marginLeft: 8 }}
                />
            </View>
        </View>
    );
};