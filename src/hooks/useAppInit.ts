// src/hooks/useAppInit.ts

/// Temporary hook for filling the database on first start, without it the app wouldn't load correctly
import { useEffect } from "react";
import {seedDatabase} from "@/src/database/seed";
import {setupDateTranslations} from "@/src/config/translations";

export const useAppInit = () => {
    useEffect(() => {
        const init = async () => {
            try {
                setupDateTranslations();
                console.log("Initializing app");
            } catch (e) {
                console.error(e);
            }
        };
        init();
    }, []);
};
