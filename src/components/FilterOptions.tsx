import React from "react";
import { View, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

// Props which has to be passed to the FilterOption Component
// name : Name that will be displayed as Text in the Chip rendered by the FilterOption Component
// associatedFunction : Function that will be executed when the Chip rendered by the FilterOption Compnent is pressed
type FilterOptionProps = {
    name: string;
    associatedFunction: () => void;
};

/**
 * Component for displaying a Chip to select a filtering option
 * Needs a FilterOptionProps which in itself is a name to display on the Chip and a function to call when the chip is pressed
 * @example
 * <FilterOption
 *    key={index}
 *    name={option.name}
 *    associatedFunction={option.associatedFunction}
 * />
 **/
export const FilterOption: React.FC<FilterOptionProps> = ({ name, associatedFunction }) => {
    return (
        <Chip onPress={associatedFunction} style={styles.chip}>
            {name}
        </Chip>
    );
};

// Props which is used for the FilterOptions component
// Options : List of FilterOptionProps to automatically create the associated FilterOption component that will be rendered in the FilterOptions Component
type FilterOptionsProps = {
    options: { name: string; associatedFunction: () => void }[];
};

/**
 * Component for displaying a List of FilterOption chips
 * Needs a FilterOptionsProps which in itself is a list of FilterOptionProps
 * @example
 * <FilterOptions options={filtersOptions}/>
 **/
export const FilterOptions: React.FC<FilterOptionsProps> = ({ options}) => {
    return (
        <View style={styles.row}>
            {options.map((option, index) => (
                <FilterOption
                    key={index}
                    name={option.name}
                    associatedFunction={option.associatedFunction}
                />
            ))}
        </View>
    );
};



const styles = StyleSheet.create({
    chip: {
        marginRight: 8,
        marginBottom: 8,
    },
    row: {
        margin : 8,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap", // si tu veux que ça passe à la ligne
    },
});