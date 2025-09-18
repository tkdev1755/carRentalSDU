import { View } from "react-native";
import CarDetail from "../components/CarDetail";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CarDetail></CarDetail>
    </View>
  );
}
