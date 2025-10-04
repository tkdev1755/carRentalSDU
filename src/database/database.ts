// we are going to use the plug-in 'react-native-sql-storage' and 'drizzle-orm expo-sqlite' you to do the following commands
// npm install react-native-sqlite-storage
// npm install @types/react-native-sqlite-storage
// npm install drizzle-orm expo-sqlite



//import 'dotenv/config';
//import { drizzle } from 'drizzle-orm/postgres-js';
//import { createClient } from '@supabase/supabase-js';
//import postgres from 'postgres';
//import { drizzle } from 'drizzle-orm/supabase-js';
//import {createClient} from ''

//import { drizzle } from "drizzle-orm/node-postgres";
//import { Pool } from "pg";
import { SupabaseDrizzleWrapper } from './supabaseDrizzleWrapper';

class DataBaseManager {
  private static instance: DataBaseManager;
  private db: SupabaseDrizzleWrapper;

  private constructor() {


    this.db = new SupabaseDrizzleWrapper();
  }

  public static getinstance(): DataBaseManager {
    if (!DataBaseManager.instance) {
      DataBaseManager.instance = new DataBaseManager();
    }
    return DataBaseManager.instance;
  }

  public getdb() {
    return this.db;
  }
}

export default DataBaseManager;
