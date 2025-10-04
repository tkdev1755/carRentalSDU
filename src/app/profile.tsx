import React, { useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { ProfileItem } from "../components/ProfileItem";
import { EditFieldModal } from "../components/ProfileEditModal";
import { ProfilePic } from "@/src/components/ProfilePic";
import { useUser, type ProfileField } from "@/src/hooks/useUser";

export default function ProfileScreen() {
    const userId = "1";
    const { profileData, handleSave, loading } = useUser(userId);

    const [editingField, setEditingField] = useState<ProfileField | null>(null);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ee" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ProfilePic
                name={"John Doe"}
                image="https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg"
            />

            <View style={styles.cardContainer}>
                <FlatList
                    data={profileData}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (
                        <ProfileItem
                            label={item.label}
                            value={item.value}
                            onPress={() => setEditingField(item)}
                            style={styles.item}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </View>

            <EditFieldModal
                visible={!!editingField}
                label={editingField?.label || ""}
                value={editingField?.value || ""}
                onDismiss={() => setEditingField(null)}
                onSave={(newValue) => {
                    if (editingField) {
                        handleSave(editingField.key, newValue);
                        setEditingField(null);
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    cardContainer: {
        borderRadius: 16,
        padding: 8,
        overflow: "hidden",
    },
    item: {
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    separator: {
        height: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
