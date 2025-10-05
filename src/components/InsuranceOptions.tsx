import {Text, Button, IconButton, Card, List, Divider, useTheme, MD3Theme} from "react-native-paper";
import {useInsurance} from "@/src/hooks/useInsurances";
import * as React from "react";
import {StyleSheet, FlatList, View} from "react-native";

const lightenColor = (hex: string, amount: number, themeData:MD3Theme) => {
  // Convertir la couleur de base
  const sanitizedHex = hex.replace('#', '');
  const bigint = parseInt(sanitizedHex, 16);
  let r1 = (bigint >> 16) & 255;
  let g1 = (bigint >> 8) & 255;
  let b1 = bigint & 255;

  // Convertir la couleur primaire
  const sanitizedPrimary = themeData.colors.primary.replace('#', '');
  const primaryInt = parseInt(sanitizedPrimary, 16);
  const r2 = (primaryInt >> 16) & 255;
  const g2 = (primaryInt >> 8) & 255;
  const b2 = primaryInt & 255;

  // Mélanger les deux couleurs selon le montant
  const r = Math.round(r1 + (r2 - r1) * amount);
  const g = Math.round(g1 + (g2 - g1) * amount);
  const b = Math.round(b1 + (b2 - b1) * amount);


  return `rgb(${r}, ${g}, ${b})`;
};


type InsuranceOptionProps = {
    onSelect: (insurance:any) => void;
    insurances: any;
    selectedOption?: number;
}
export const InsuranceOptions : React.FC<InsuranceOptionProps> = ({onSelect,selectedOption, insurances}) => {
    return (
        <>
            <Text>Insurance Options</Text>
            <FlatList
                data={insurances}
                contentContainerStyle={{ paddingLeft: 0 }}
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
        <Card style={[styles.card, {backgroundColor: isSelected ? lightenColor(theme.colors.onPrimary, 0.7,theme) : lightenColor(option.color, 0.1, theme)}]}>
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
                    Price: {option.price}€ / day
                </Text>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained" onPress={() => onSelect(isSelected ? undefined :option)}>
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
        margin:0,
    },
    selectedColor:{
        color : "#219EBC"
    }
});


