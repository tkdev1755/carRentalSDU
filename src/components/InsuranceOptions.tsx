import {Text, Button, IconButton, Card, List, Divider, useTheme} from "react-native-paper";
import {useInsurance} from "@/src/hooks/useInsurances";
import * as React from "react";
import {StyleSheet, FlatList, View} from "react-native";

const lightenColor = (hex: string, amount: number) => {
    const sanitizedHex = hex.replace('#', '');
    const bigint = parseInt(sanitizedHex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    r = Math.round(r + (255 - r) * amount);
    g = Math.round(g + (255 - g) * amount);
    b = Math.round(b + (255 - b) * amount);

    return `rgb(${r}, ${g}, ${b})`;
};


type InsuranceOptionProps = {
    onSelect: (id: number) => void;
    selectedOption?: number;
}
export const InsuranceOptions : React.FC<InsuranceOptionProps> = ({onSelect,selectedOption}) => {
    const {insurances, isLoading, error} = useInsurance();
    if (isLoading){
        return <Text>Loading...</Text>;
    }
    else if (error){
        return <Text>Something went wrong</Text>;
    }
    return (
        <>
            <Text>Insurance Options</Text>
            <FlatList
                data={insurances}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                        <InsuranceOption option={item} onSelect={onSelect} selectedOption={selectedOption} />
                    </View>
                )}
                showsHorizontalScrollIndicator={false}
            />
        </>
    );
};


const InsuranceOption = ({ option, onSelect,selectedOption } : {option:any,onSelect:Function,selectedOption?:number}) => {
    const theme = useTheme();
    const isSelected = selectedOption === option.id;
    return (
        <Card style={[styles.card, {backgroundColor: isSelected ? lightenColor(theme.colors.onPrimary, 0.7) : lightenColor(option.color, 0.7)}]}>
            <Card.Content>
                <Text variant={"titleLarge"}>{option.name}</Text>
                <Divider style={{ marginVertical: 8 }} />
                {option.features.map((feature: { title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: any; }, index: React.Key | null | undefined) => (
                    <List.Section key={index} style={styles.featureSection}>
                        <Text style={styles.featureTitle}>{feature.title}</Text>
                        <Text variant={"bodySmall"}>{feature.description}</Text>
                    </List.Section>
                ))}
                <Text variant={"bodyMedium"} style={styles.price}>
                    Price: ${option.price}
                </Text>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained" onPress={() => onSelect(isSelected ? undefined :option.id)}>
                    {isSelected? "Unselect" : "Select"}
                </Button>
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 8,
        elevation: 3,
    },
    price: {
        marginTop: 10,
        fontWeight: "bold",
    },
    featureSection: {
        alignItems: 'flex-start', // <-- chaque feature alignée à gauche
        paddingVertical: 2,
    },
    featureTitle:{
        fontWeight: 'bold',
        textAlign: 'left',
    },
    container: {
        marginVertical: 20,
    },
    cardWrapper: {
        width: 250, // largeur de chaque carte
    },
    selectedColor:{
        color : "#219EBC"
    }
});


