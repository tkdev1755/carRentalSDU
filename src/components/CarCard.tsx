
import { Image, StyleSheet, Text, View } from "react-native";

export default function CarCard() {
    // TODO: retrieve from props
    const image = { uri: "https://www.evspecifications.info/wp-content/uploads/2020/01/volvo-xc90-t8-evchargeplus-00-1-1024x680.png" };
    const title = "Tesla Model S (2020)";

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image} />
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        aspectRatio: "16/9",
        height: "100%",

        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "green"
    },
    image: {
        aspectRatio: "16/9",
        backgroundColor: "blue"
    },
    details: {
        padding: 8,
        aspectRatio: "5/1",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    }
});
