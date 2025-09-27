import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

//page: /cars/car?id=1234

const Car = () => {
  // derive id from link
  const { id } = useLocalSearchParams<{ id: string }>();

  // setting the correct page title
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: "Car: <car.name>" });
  }, [navigation]);

  // we need some runtime safety
  // do we??
  if (!id || typeof id !== "string") {
    console.error("Car Page: incorrect id");
    <Redirect href="/" />; //if we later build an error page put it in here
  }

  /**
   * we know from this point on that we have at least an id that is a string
   * -> still might be not existent, but thats now a problem of the component
   */

  return (
    <View>
      <Text>Car with id: {id}</Text>
      {/* <CarDetail data={car} */}
    </View>
  );
};

export default Car;

const styles = StyleSheet.create({});
