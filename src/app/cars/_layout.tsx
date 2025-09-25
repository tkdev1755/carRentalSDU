import CustomAppbar from "@/src/components/CustomAppbar";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <CustomAppbar {...props} />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "CarList" }} />
      <Stack.Screen name="car_detail" options={{ title: "Nested Page!!" }} />
    </Stack>
  );
}
