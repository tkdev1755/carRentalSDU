export interface Car {
    id: number;
    name: string;
    price: number;
    seats: number;
    transmission_type: string; // "Manual" | "Automatic"
    type: string;
    trunk_space: number;
    engine_type: string;       // "Hybrid" | "Electric" | "Petrol"
    is_available: boolean;
    agency_id: number;
    image: string;
}