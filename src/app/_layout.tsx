import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CommonActions } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";
import { BottomNavigation, PaperProvider } from "react-native-paper";
import { ICONS, IconName } from "../constants/icons";

const getIcon = (color: string, size: number, name: IconName) => (
  <MaterialCommunityIcons name={name} color={color} size={size} />
);

export default function TabLayout() {
  return (
    <PaperProvider>
      {/* Theme Provider might go here */}
      <Tabs
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }
              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              return label as string;
            }}
          />
        )}
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
      </Tabs>
    </PaperProvider>
  );
}
