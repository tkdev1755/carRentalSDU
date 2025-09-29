import {CarFilters} from "@/src/types/CarFilters";
import {useEffect, useState} from "react";
import { TextInput, IconButton, Text} from "react-native-paper";
import { View, StyleSheet} from "react-native";

type TrunkSpaceFilterProps = {
    filters: CarFilters;
    onChange: (f: CarFilters) => void;
}
/**
 * Component for displaying the Trunk space filtering option in the FilterModal Component
 * Needs a TrunkSpaceFilterProps which in itself is a function to execute when validating the choice and a CarFilter object
 * @example
 * <TrunkSpaceFilter filters={tempFilters} onChange={f => (filters = f)} />;
 **/
export const TrunkSpaceFilter: React.FC<TrunkSpaceFilterProps> = ({filters,onChange}) => {
    const [selectedSeats, setSelectedSeats] = useState<number>(filters.trunkSpace ?? 5);
    useEffect(() => {
        onChange({ ...filters, trunkSpace: selectedSeats });
    }, [selectedSeats]);
    return (
        <View>
            <Text variant="titleMedium">How many luggages in the trunk ?</Text>
            <NumericInput value={selectedSeats} onChange={setSelectedSeats} min={2} max={7}/>
        </View>

    );
};




type NumericInputProps = {
    value: number;
    onChange: (newValue: number) => void;
    min?: number;
    max?: number;
    step?: number;
};

export function NumericInput({
                                 value,
                                 onChange,
                                 min = -Infinity,
                                 max = Infinity,
                                 step = 1,
                             }: NumericInputProps) {
    const handleChange = (text: string) => {
        const num = parseInt(text, 10);
        if (!isNaN(num)) {
            onChange(Math.max(min, Math.min(max, num)));
        } else if (text === "") {
            onChange(0); // ou laisser vide selon besoin
        }
    };

    const decrement = () => onChange(Math.max(min, value - step));
    const increment = () => onChange(Math.min(max, value + step));

    return (
        <View style={styles.container}>
            <TextInput
                mode="outlined"
                value={String(value)}
                onChangeText={handleChange}
                keyboardType="numeric"
                style={{ width: 120 }}
                left={<TextInput.Icon icon="minus" onPress={decrement} />}
                right={<TextInput.Icon icon="plus" onPress={increment} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
    },
    input: {
        width: 70,
        textAlign: "center",
    },
});