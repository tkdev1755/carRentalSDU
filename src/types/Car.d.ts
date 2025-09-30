export interface Car {
    uuid: string;
    name: string;
    price: number;
    seats: number;
    transmission: TransmissionType;
    engine: EngineType;
    availability: Availability;
    image: string;
}
