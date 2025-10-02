/// Temporary code while Hannes finishes this part
import { useEffect, useState } from "react";
import { getUserInfo, updateUserInfo } from "@/src/api/services";

export type ProfileField = {
    key: string;
    label: string;
    value: string;
};

export function useUser(userId: string) {
    const [profileData, setProfileData] = useState<ProfileField[]>([
        { key: "name", label: "Name", value: "" },
        { key: "email", label: "Email", value: "" },
        { key: "phone", label: "Phone number", value: "" },
    ]);

    const [loading, setLoading] = useState(true);

    // Charger les données utilisateur au montage
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo(userId);
                setProfileData((prev) =>
                    prev.map((field) => ({
                        ...field,
                        value: userInfo[field.key] ?? field.value,
                    }))
                );
            } catch (error) {
                console.error("Erreur lors du chargement du profil:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [userId]);

    const handleSave = async (fieldKey: string, newValue: string) => {
        console.log(fieldKey, newValue);
        try {
            setProfileData((prev) =>
                prev.map((field) =>
                    field.key === fieldKey ? { ...field, value: newValue } : field
                )
            );
            await updateUserInfo({ key: fieldKey, value: newValue });
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
        }
    };

    return { profileData, handleSave, loading };
}