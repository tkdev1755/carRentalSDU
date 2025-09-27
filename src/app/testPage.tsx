import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from 'react-native-paper';
import { getAvailableCars } from "../api/services";
import { seedDatabase } from "../database/seed";


const handleAdamsPress = async () => {

    await seedDatabase();

    const cars = await getAvailableCars();
    console.log("Available cars:", cars);

};

export const AdamTestingComponent = () => {
    return (
        <View style={styles.container}>
            <Button icon="camera" mode="contained" onPress={handleAdamsPress}>
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
    const filters = [
        { name: "Engine", associatedFunction: filterByEngine },
        { name: "Price", associatedFunction: filterByPrice },
        { name: "Year", associatedFunction: filterByYear },
    ];

    return (
        <View style={styles.container}>
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                TAHA testing LAND
            </Button>
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