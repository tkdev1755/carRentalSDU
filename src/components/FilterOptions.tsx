import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * This component will set the state in the URL and update it according to user input
 * @see https://docs.expo.dev/router/reference/url-parameters/
 */

const FilterOptions = () => {
  const params = useLocalSearchParams();
  return (
    <View>
      <Text>FilterOptions</Text>
      <Text
        onPress={() =>
          router.setParams({
            price: 34,
          })
        }
      >
        Set Price to 34
      </Text>
    </View>
  );
};

export default FilterOptions;

const styles = StyleSheet.create({});
