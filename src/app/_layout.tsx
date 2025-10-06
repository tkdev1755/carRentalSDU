import CustomAppbar from "@/src/components/organisms/CustomAppbar";
import CustomTabbar from "@/src/components/organisms/CustomTabbar";
import { IconName, ICONS } from "@/src/constants/icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { Tabs } from "expo-router";
import React, { useMemo } from "react";
import { useColorScheme, View } from "react-native";
import {
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  useTheme,
} from "react-native-paper";
import CustomSnackbar from "../components/molecules/CustomSnackbar";
import { SETTINGS } from "../constants/settings";
import { SnackbarProvider } from "../context/SnackbarContext";
import {useFonts} from "expo-font";

const getIcon = (color: string, size: number, name: IconName) => (
  <MaterialCommunityIcons name={name} color={color} size={size} />
);

export default function TabLayout() {
  /**
   * theming options 💅
   * please set sourceColor in settings.ts file
   */
  const [loaded] = useFonts({
    'ClashGrotesk-Extralight': require('@/assets/fonts/ClashGrotesk-Extralight.otf'),
    'ClashGrotesk-Bold': require('@/assets/fonts/ClashGrotesk-Semibold.otf'),
    'ClashGrotesk-Medium': require('@/assets/fonts/ClashGrotesk-Medium.otf'),
    'ClashGrotesk-Regular': require('@/assets/fonts/ClashGrotesk-Regular.otf'),
  });
  const colorScheme = useColorScheme();
  const baseFont = {
    fontFamily: 'ClashGrotesk-Regular',
  } as const;
  const baseVariants = configureFonts({ config: baseFont });
  const customVariants = {
    // Customize individual base variants:
    titleMedium: {
      ...baseVariants.titleMedium,
      fontFamily: 'ClashGrotesk-Medium',
    },
    displayLarge: {
      ...baseVariants.displayLarge,
      fontFamily: 'ClashGrotesk-Extralight',
    },
    bodyMedium: {
      ...baseVariants.bodyMedium,
      fontFamily: 'ClashGrotesk-Regular',
    },
    bodySmall: {
      ...baseVariants.bodySmall,
      fontFamily: 'ClashGrotesk-Medium',
    },


    // Add own tokens if required:

  } as const;

  const fonts = configureFonts({
    config: {
      ...baseVariants,
      ...customVariants,
    },
  });
  const { theme } = useMaterial3Theme({
    sourceColor: SETTINGS.THEME.SOURCE_COLOR,
  });
  const paperTheme = useMemo(
    () =>
      colorScheme === "dark" // remove false when the whole app is finally in react nativ paper 🫠
        ? { ...MD3DarkTheme, colors: theme.dark, fonts}
        : { ...MD3LightTheme, colors: theme.light,fonts },
    [colorScheme, theme]
  );

  const appTheme = useTheme();

  return (
    <PaperProvider theme={paperTheme}>
      <SnackbarProvider>
        <Tabs
          screenOptions={{
            header: (props) => <CustomAppbar {...props} />,
          }}
          screenLayout={({ children }) => (
            <View
              style={{ flex: 1, backgroundColor: paperTheme.colors.background }}
            >
              {children}
            </View>
          )}
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
        </Tabs>
        <CustomSnackbar />
      </SnackbarProvider>
    </PaperProvider>
  );
}
