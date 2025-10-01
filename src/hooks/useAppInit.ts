// src/hooks/useAppInit.ts

/// Temporary hook for filling the database on first start, without it the app wouldn't load correctly
import { useEffect } from "react";
import {seedDatabase} from "@/src/database/seed";

export const useAppInit = () => {
    useEffect(() => {
        const init = async () => {
            try {
                console.log("Initializing app");
                await seedDatabase();
            } catch (e) {
                console.error(e);
            }
        };
        init();
    }, []);
};
