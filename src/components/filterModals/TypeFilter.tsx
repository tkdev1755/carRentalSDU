import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {RadioButton, Text} from "react-native-paper";
import {CarFilters} from "../../types/CarFilters";
import {CAR_TYPES} from "@/src/constants/filterTypes";

type TypeFilterProps = {
    filters: CarFilters;
    onChange: (f: CarFilters) => void;
}

/**
 * Component for displaying the type filtering option in the FilterModal Component
 * Needs a TypeFilterProps which in itself is a function to execute when validating the choice and a CarFilter object
 * @example
 * <TypeFilter filters={tempFilters} onChange={f => (filters = f)} />;
 **/
export const TypeFilter: React.FC<TypeFilterProps> = ({ filters, onChange }) => {
    const [selectedType, setSelectedType] = useState<string>(filters.type ?? "SUV");
    useEffect(() => {
        onChange({ ...filters, type: selectedType});
    }, [selectedType]);
    return (
        <View>
            <Text variant="titleMedium">Choose car type</Text>
            <RadioButton.Group onValueChange={setSelectedType} value={selectedType}>
                {CAR_TYPES.map(type => (
                    <RadioButton.Item key={type} label={type} value={type} />
                ))}
            </RadioButton.Group>
        </View>
    );
};
