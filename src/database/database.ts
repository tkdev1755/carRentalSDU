// we are going to use the plug-in 'react-native-sql-storage' and 'drizzle-orm expo-sqlite' you to do the following commands 
// npm install react-native-sqlite-storage
// npm install @types/react-native-sqlite-storage
// npm install drizzle-orm expo-sqlite

import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import * as schema from "./schema";

class DataBaseManager {
    private static instance: DataBaseManager;
    private db:ReturnType<typeof drizzle>;

    private constructor() {
        const expodb= SQLite.openDatabaseSync("carrental.db");
        this.db=drizzle(expodb, {schema});
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