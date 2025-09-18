import { Link } from "expo-router";
import React from "react";
import { Button, StyleSheet, View } from "react-native";

const index = () => {
  return (
    <View>
      <Link href="/cars/car_detail" push asChild>
        <Button title="go to car details" />
      </Link>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
