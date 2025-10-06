import { getHeaderTitle } from "@react-navigation/elements";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

/**
 * - This component returns our header bar
 * - Its reading the {title} property of Tabs.Screen / Stack.Screen
 * - Used in both _layout.tsx files
 * 
 * @example
 * ```
 * <Tabs
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
        ...
    />
 * ```
 *
 * @params {route, options} -> given automaticcaly by react-navigation
 * @return a beautiful App-Header
 *
 * this is quite a mix of (bad documented) technologies
 * @see https://reactnavigation.org/docs/bottom-tab-navigator/#api-definition
 * @see https://docs.expo.dev/router/migrate/from-react-navigation/#replace-the-navigationcontainer
 *
 * @todo check if a more "expo-routerish-base-approach" is available
 */

const CustomAppbar = ({ route, options }: any) => {
  const title = getHeaderTitle(options, route);

  return (
    <Appbar.Header>
      {router.canGoBack() ? <Appbar.BackAction onPress={router.back} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default CustomAppbar;

const styles = StyleSheet.create({});
