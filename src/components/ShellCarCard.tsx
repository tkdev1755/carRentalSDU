import type { Car } from "@/src/types/Car"; // si tu mets ton type à part
import React from "react";
import { Card, Text } from "react-native-paper";

type CarCardProps = {
    car: Car;
};

export const ShellCarCard: React.FC<CarCardProps> = ({ car }) => {
    return (
        <Card style={{ margin: 10 }}>
            <Card.Cover source={{ uri: car.image }} />
            <Card.Content>
                <Text variant={"titleMedium"}>{car.name}</Text>
                <Text variant={"bodyMedium"}>{car.seats} seats</Text>
                <Text variant={"bodyMedium"}>{car.transmission} • {car.engine}</Text>
                <Text variant={"bodyMedium"}>{car.price.toFixed(2)} € / day</Text>
                {car.availability === "unavailable" && (
                    <Text variant={"bodyMedium"} style={{ color: "red" }}>Not available</Text>
                )}
            </Card.Content>
        </Card>
    );
};