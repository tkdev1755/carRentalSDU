import React from "react";
import { View, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

type FilterOptionProps = {
    name: string;
    associatedFunction: () => void;
};

export const FilterOption: React.FC<FilterOptionProps> = ({ name, associatedFunction }) => {
    return (
        <Chip onPress={associatedFunction} style={{ marginRight: 8 }}>
            {name}
        </Chip>
    );
};

// ✅ Composant FilterOptions (reçoit un tableau d’options en props)
type FilterOptionsProps = {
    options: { name: string; associatedFunction: () => void }[];
};

export const FilterOptions: React.FC<FilterOptionsProps> = ({ options }) => {
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
    row: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap", // si tu veux que ça passe à la ligne
    },
});