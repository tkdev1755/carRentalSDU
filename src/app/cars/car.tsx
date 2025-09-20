import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

//page: /cars/car?id=1234

const Car = () => {
  // we use generics here to make sure that id is existing at compiletime
  const { id } = useLocalSearchParams<{ id: string }>();

  // we need some runtime safety
  if (!id || typeof id !== "string") {
    console.error("Car Page: incorrect id");
    // return REDIRECT TO ERROR PAGE / HOME PAGE
  }

  /**
   * we know from this point on that we have at least an id that is a string
   * -> still might be not existent, but thats now a problem of the component
   */

  /*
    <CarDetail data={car} />
  */

  return (
    <View>
      <Text>Car with id: {id}</Text>
    </View>
  );
};

export default Car;

const styles = StyleSheet.create({});
