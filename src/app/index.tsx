import { Text, View } from "react-native";
import Button from "../components/Button";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button />
      <Text>Edit app/index.tsx to edit this screen. Test.</Text>
    </View>
  );
}
