import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function CarDetail() {
    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.image} />
            <View>
                <Text style={styles.title}>Car Title</Text>
                <Text style={styles.description}>Car Description</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16, gap: 8 }}>
                <Text>5 seats</Text>
                <Text>Automatic</Text>
                <Text>Petrol</Text>
                <Text>GPS</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16, gap: 8 }}>
                <Text>Model</Text>
                <Text>Miles</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16, gap: 8 }}>
                <Text>Color</Text>
                <Text>Availability</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16, gap: 8 }}>
                <Text>$69 / day</Text>
                <Pressable>
                    <Text>Next</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 16,
    },
    image: {
        width: "100%",
        height: 150,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: "#666",
    },
});

