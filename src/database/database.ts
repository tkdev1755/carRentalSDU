// we are going to use the plug-in 'react-native-sql-storage' and 'drizzle-orm expo-sqlite' you to do the following commands 
// npm install react-native-sqlite-storage
// npm install @types/react-native-sqlite-storage
// npm install drizzle-orm expo-sqlite

import { drizzle } from "drizzle-orm/expo-sqlite";
//import 'dotenv/config';
//import { drizzle } from 'drizzle-orm/postgres-js';
//import { createClient } from '@supabase/supabase-js';
//import postgres from 'postgres';
//import { drizzle } from 'drizzle-orm/supabase-js';
//import {createClient} from ''

//import { drizzle } from "drizzle-orm/node-postgres";
//import { Pool } from "pg";
import * as SQLite from "expo-sqlite";
import * as schema from "./schema";

//const connectionString = process.env.EXPO_PUBLIC_DATABASE_URL ?? "";


class DataBaseManager {
    private static instance: DataBaseManager;
    private db:ReturnType<typeof drizzle>;

    private constructor() {
        const expodb= SQLite.openDatabaseSync("carrental.db");
        this.db= drizzle(expodb, {schema});
        
        //const client = postgres("", { prepare: false });
        //const client = postgres(connectionString);
        //this.db = drizzle(client);
    }

    static getinstance(): DataBaseManager {
        if(!DataBaseManager.instance) {
            DataBaseManager.instance=new DataBaseManager();
        }
        return DataBaseManager.instance;
    }

    getdb(){
        return this.db;
    }
}

export default DataBaseManager;