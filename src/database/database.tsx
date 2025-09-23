// we are going to use the plug-in 'react-native-sql-storage' you to do the following commands 
// npm install react-native-sqlite-storage
// npm install @types/react-native-sqlite-storage

import * as SQLite from 'react-native-sqlite-storage';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);


interface Car {
    id: number;
    name: string;
    price: number;
    transmission : 'manual' | 'automatic';
    type_car: string;
    trunk_space: number;
    //TODO engine rediscuss with taha and adam
    is_available: boolean;
}

interface User {
    id: string;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    email: string;
    //TODO rediscuss paymentinfo with taha and adam
}

interface Agency {
    name: string;
    location: string;
    phone_number: string;
    cars : Car[]; //list of cars in typescript
}

interface Booking {
    start_date: Date;
    end_time: Date;
    selectedCar: Car;
    user: User;
    agency: Agency;
}