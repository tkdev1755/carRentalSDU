import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {RadioButton, Text} from "react-native-paper";
import {CarFilters} from "@/src/types/CarFilters";
import {CAR_TYPES, ENGINE_TYPES} from "@/src/constants/filterTypes";
type EngineFilterProps = {
    filters: CarFilters;
    onChange: (f: CarFilters) => void;
}
/**
 * Component for displaying the Engine type filtering option in the FilterModal Component
 * Needs a EngineFilterProps which in itself is a function to execute when validating the choice and a CarFilter object
 * @example
 * <EngineFilter filters={tempFilters} onChange={f => (filters = f)} />;
 **/
export const EngineFilter: React.FC<EngineFilterProps> = ({ filters, onChange }) => {
    const [selectedEngine, setSelectedEngine] = useState<string>(filters.engineType ?? "Petrol");
    useEffect(() => {
        onChange({ ...filters, engineType: selectedEngine});
    }, [selectedEngine]);
    return (
        <View>
            <Text variant="titleMedium">Choose engine type</Text>
            <RadioButton.Group onValueChange={setSelectedEngine} value={selectedEngine}>
                {ENGINE_TYPES.map(type => (
                    <RadioButton.Item key={type} label={type} value={type} />
                ))}
            </RadioButton.Group>
        </View>
    );
};