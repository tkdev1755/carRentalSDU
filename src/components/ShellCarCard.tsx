import React from "react";
import { Image } from "react-native";
import { Card,Text } from "react-native-paper";
import type { Car } from "../types/Car"; // si tu mets ton type à part

type CarCardProps = {
    car: Car;
};

export const ShellCarCard: React.FC<CarCardProps> = ({ car }) => {
    return (
        <Card style={{ margin: 10 }}>
            <Card.Cover source={{ uri: car.image }} />
            <Card.Content>
                <Text variant={"titleMedium"}>{car.name}</Text>
                <Text variant={"bodyMedium"}>{car.type} • {car.seats} seats</Text>
                <Text variant={"bodyMedium"}>{car.transmission_type} • {car.engine_type}</Text>
                <Text variant={"bodyMedium"}>{car.price.toFixed(2)} € / day</Text>
                {!car.is_available && (
                    <Text variant={"bodyMedium"} style={{ color: "red" }}>Not available</Text>
                )}
            </Card.Content>
        </Card>
    );
};