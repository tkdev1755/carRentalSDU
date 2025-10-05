import CustomAppbar from "@/src/components/CustomAppbar";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

/**
 * Component for displaying a stack inside the tab layout.
 * Users get a back button to cykle back to the index page.
 * @returns <Stack>
 */
export default function Layout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        header: (props) => <CustomAppbar {...props} />,
      }}
      screenLayout={({ children }) => (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          {children}
        </View>
      )}
    >
      <Stack.Screen name="index" options={{ title: "Book a Ride" }} />
      <Stack.Screen name="car" options={{ title: "" }} />
      <Stack.Screen
        name="BookingPage"
        options={{ title: "Create reservation" }}
      />
      {/* screen options are set dynamicaly in car.tsx */}
    </Stack>
  );
}
