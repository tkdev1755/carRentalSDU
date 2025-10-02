import {CarFilters} from "@/src/types/CarFilters";
import {useEffect, useState} from "react";
import { TextInput, IconButton, Text} from "react-native-paper";
import { View, StyleSheet} from "react-native";

type SeatsFilterProps = {
    filters: CarFilters;
    onChange: (f: CarFilters) => void;
}
/**
 * Component for displaying the Seats filtering option in the FilterModal Component
 * Needs a SeatsFilterProps which in itself is a function to execute when validating the choice and a CarFilter object
 * @example
 * <SeatsFilter filters={tempFilters} onChange={f => (filters = f)} />;
 **/
export const SeatsFilter: React.FC<SeatsFilterProps> = ({filters,onChange}) => {
    const [selectedSeats, setSelectedSeats] = useState<number>(filters.seats ?? 5);
    useEffect(() => {
        onChange({ ...filters, seats: selectedSeats });
    }, [selectedSeats]);
    return (
        <View>
            <Text variant="titleMedium">How many seats ?</Text>
            <NumericInput value={selectedSeats} onChange={setSelectedSeats} min={2} max={7}/>
        </View>

    );
};



/**
 * Component for displaying the Numeric Picker with buttons and max-min limits
 * Needs a NumericInputProps which in itself is the value to modify, an onChange function eachTime the value is changed, a minimum  and maximum value and a step
 * @example
 * <NumericInput value={selectedSeats} onChange={setSelectedSeats} min={2} max={7}/>
 **/
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