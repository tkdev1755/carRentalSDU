import { router } from "expo-router";
import React from "react";
import { Card, Text, Button, Chip } from "react-native-paper";
import {View, StyleSheet } from "react-native";

type CarCardProps = {
    car: any
};

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
    const handlePress = () => {
        router.push(`/cars/car?id=${car.id}`);
    }

    return (
        <Card style={styles.card} onPress={handlePress}>
            <Card.Cover source={{ uri: car.image }} style={styles.cover}/>
            <Card.Content style={styles.content}>
                <View>
                    <Text variant="titleLarge" style={styles.title}>{car.name}</Text>
                    {!car.is_available && (<Chip mode="flat" style={styles.unavailableChip}>Not available</Chip>)
                    }
                </View>
                <View style={styles.details}>
                    <View style={styles.detailsRow}>
                        <Text variant="bodyMedium">
                            Type : {car.type}
                        </Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text variant="bodyMedium">
                            Seats : {car.seats}
                        </Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text variant="bodyMedium" >
                            Engine : {car.engine}
                        </Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text variant="bodyMedium" style={styles.price}>
                        {car.price.toFixed(2)} €<Text style={styles.perDay}>/day</Text>
                    </Text>
                    <Button mode="contained" onPress={handlePress} style={styles.button} compact>
                        View details
                    </Button>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin : 10,
        borderRadius: 12,
        elevation: 3,
    },
    cover: {
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        margin : 16,
        backgroundColor: 'transparent',
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    title: {
        fontWeight: "bold",
        flex: 1,
        textAlign: "left",
    },
    unavailableChip: {
        backgroundColor: 'transparent',
    },
    unavailableText: {
        color: 'transparent',
        fontSize: 12,
    },
    details: {
        marginBottom: 16,
        gap: 6,
    },
    detailsRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 12,
        borderTopWidth:1,
        borderTopColor: 'grey',
    },
    price: {
        fontSize: 20,
        fontWeight: "bold",
    },
    perDay: {
        fontSize: 20,
        fontWeight: "normal",
    },
    button:{
        borderRadius: 8,
    }
})
