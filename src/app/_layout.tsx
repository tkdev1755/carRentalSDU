import CustomAppbar from "@/src/components/CustomAppbar";
import CustomTabbar from "@/src/components/CustomTabbar";
import { ICONS, IconName } from "@/src/constants/icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import React from "react";
import { PaperProvider } from "react-native-paper";
import CustomSnackbar from "../components/CustomSnackbar";
import { SnackbarProvider } from "../context/SnackbarContext";

const getIcon = (color: string, size: number, name: IconName) => (
  <MaterialCommunityIcons name={name} color={color} size={size} />
);

export default function TabLayout() {
  return (
    <PaperProvider>
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
function useMaterial3Theme(): { theme: any } {
  throw new Error("Function not implemented.");
}
