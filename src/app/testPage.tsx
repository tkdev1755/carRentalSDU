import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {FilterOptions} from "../components/FilterOptions";
import { Button } from 'react-native-paper';
import {FilterModal} from "@/src/components/FilterModal";
import {useFilterParams} from "@/src/hooks/useFilterParams";
import {CarFilters} from "@/src/types/CarFilters";
export const AdamTestingComponent = () => {
    return (
        <View style={styles.container}>
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                ADAM testing LAND
            </Button>
        </View>
    );
};

const AmauryTestingComponent = () => {
    return (
        <View style={styles.container}>
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                AMAURY testing LAND
            </Button>
        </View>
    );
};

const HannesTestingComponent = () => {
    return (
        <View style={styles.container}>
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                HANNES testing LAND
            </Button>
        </View>
    );
};


export const MathiasTestingComponent = () => {
    return (
        <View style={styles.container}>
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                MATHIAS testing LAND
            </Button>
        </View>
    );
}
export const TahaTestingComponent = () => {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const filtersOptions = [
        { name: "Engine", associatedFunction: () => {filterByEngine(); setActiveFilter("Engine")} },
        { name: "Price", associatedFunction: () => {filterByEngine(); setActiveFilter("Price")} },
        { name: "Seats", associatedFunction: () => {setActiveFilter("Seats")}  },
        { name: "Trunk space", associatedFunction: () => {setActiveFilter("TrunkSpace")}  },
        { name: "Transmission", associatedFunction: () => {setActiveFilter("Transmission")}  },
        { name: "Type", associatedFunction: () => {setActiveFilter("Type")}  },
    ];
    const { filters, setFilters} = useFilterParams();

    const handleApply = (updated: CarFilters) => {
        setFilters({ ...filters, ...updated });
        setActiveFilter(null);
    };

    return (
        <View style={styles.container}>
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                TAHA testing LAND
            </Button>

            <Text>Engine type : {filters.engineType}</Text>
            <Text>Price Range : {filters.minPrice} - {filters.maxPrice}</Text>
            <Text>Seats Range : {filters.seats}</Text>
            <Text>TrunkSpace : {filters.seats}</Text>
        </View>
    );
}

const testPage = () => {

    return (
        <View>
            <AdamTestingComponent>

            </AdamTestingComponent>
            <AmauryTestingComponent>

            </AmauryTestingComponent>
            <HannesTestingComponent>

            </HannesTestingComponent>

            <MathiasTestingComponent>

            </MathiasTestingComponent>
            <TahaTestingComponent>

            </TahaTestingComponent>
        </View>
    );
};




function filterByEngine() {
    console.log("Filtering by engine...");
}

function filterByPrice() {
    console.log("Filtering by price...");
}

function filterByYear() {
    console.log("Filtering by year...");
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
    },
});export default testPage;