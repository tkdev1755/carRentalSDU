import CustomAppbar from "@/src/components/CustomAppbar";
import { Stack } from "expo-router";

/**
 * Component for displaying a stack inside the tab layout.
 * Users get a back button to cykle back to the index page.
 * @returns <Stack>
 */
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <CustomAppbar {...props} />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "CarList" }} />
      <Stack.Screen name="car" options={{ title: "" }} />
      {/* screen options are set dynamicaly in car.tsx */}
    </Stack>
  );
}
