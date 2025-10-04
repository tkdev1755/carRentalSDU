import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {RadioButton, Text} from "react-native-paper";
import {CarFilters} from "@/src/types/CarFilters";
import {TRANSMISSION_TYPES} from "@/src/constants/filterTypes";

type TransmissionFilterProps = {
    filters: CarFilters;
    onChange: (f: CarFilters) => void;
}
/**
 * Component for displaying the Transmission filtering options in the FilterModal Component
 * Needs a TransmissionFilterProps which in itself is a function to execute when validating the choice and a CarFilter object
 * @example
 * <TransmissionFilter filters={tempFilters} onChange={f => (filters = f)} />;
 **/
export const TransmissionFilter: React.FC<TransmissionFilterProps> = ({ filters, onChange }) => {
    const [selectedTransmission, setSelectedTransmission] = useState<string>(filters.transmissionType ?? "Manual");
    useEffect(() => {
        onChange({ ...filters, transmissionType: selectedTransmission});
    }, [selectedTransmission]);
    return (
        <View>
            <Text variant="titleMedium">Choose transmission type</Text>
            <RadioButton.Group onValueChange={setSelectedTransmission} value={selectedTransmission}>
                {TRANSMISSION_TYPES.map(type => (
                    <RadioButton.Item key={type} label={type} value={type} />
                ))}
            </RadioButton.Group>
        </View>
    );
};
