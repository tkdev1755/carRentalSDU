import CustomAppbar from "@/src/components/CustomAppbar";
import CustomTabbar from "@/src/components/CustomTabbar";
import { ICONS, IconName } from "@/src/constants/icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { Tabs } from "expo-router";
import React, { useMemo } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import CustomSnackbar from "../components/CustomSnackbar";
import { SETTINGS } from "../constants/settings";
import { SnackbarProvider } from "../context/SnackbarContext";

const getIcon = (color: string, size: number, name: IconName) => (
  <MaterialCommunityIcons name={name} color={color} size={size} />
);

export default function TabLayout() {
  /**
   * theming options 💅
   * please set sourceColor in settings.ts file
   */
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({
    sourceColor: SETTINGS.THEME.SOURCE_COLOR,
  });
  const paperTheme = useMemo(
    () =>
      colorScheme === "dark" && false // remove false when the whole app is finally in react nativ paper 🫠
        ? { ...MD3DarkTheme, colors: theme.dark }
        : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

  return (
    <PaperProvider theme={paperTheme}>
      <SnackbarProvider>
        <Tabs
          screenOptions={{
            header: (props) => <CustomAppbar {...props} />,
          }}
          backBehavior="none" // we don't want to be able to "go back" -> use tabs instead
          tabBar={(props) => <CustomTabbar {...props} />}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => getIcon(color, size, ICONS.HOME),
            }}
          />
          <Tabs.Screen
            name="cars"
            options={{
              title: "Cars",
              headerShown: false, //prevent double header as /cars is directory with stack view
              tabBarIcon: ({ color, size }) => getIcon(color, size, ICONS.CARS),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, size }) =>
                getIcon(color, size, ICONS.PROFIILE),
            }}
          />
          <Tabs.Screen
            name="testPage"
            options={{
              title: "test page",
              tabBarIcon: ({ color, size }) =>
                getIcon(color, size, ICONS.PROFIILE),
            }}
          />
        </Tabs>
        <CustomSnackbar />
      </SnackbarProvider>
    </PaperProvider>
  );
}
