import React from "react";
import { Image } from "react-native";
import { Card,Text } from "react-native-paper";

type CarCardProps = {
    car: any

};

export const ShellCarCard: React.FC<CarCardProps> = ({ car }) => {
    return (
        <Card style={{ margin: 10 }}>
            <Card.Cover source={{ uri: car.image }} />
            <Card.Content>
                <Text variant={"titleMedium"}>{car.name}</Text>
                <Text variant={"bodyMedium"}>{car.type} • {car.seats} seats</Text>
                <Text variant={"bodyMedium"}>{car.transmission} • {car.engine}</Text>
                <Text variant={"bodyMedium"}>{car.price.toFixed(2)} € / day</Text>
                {!car.is_available && (
                    <Text variant={"bodyMedium"} style={{ color: "red" }}>Not available</Text>
                )}
            </Card.Content>
        </Card>
    );
};