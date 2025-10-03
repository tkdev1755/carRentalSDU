import * as React from "react";
import {Text} from "react-native-paper";
import {View, StyleSheet} from "react-native";

type Props = { userName:string; };

export default function WelcomeMessage({userName}:Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.NameText}>{userName||"_"}</Text>
        </View>
    );
 }

 const styles = StyleSheet.create({
     container: {
         alignItems: "flex-start",
         marginBottom: 16,
     },
     welcomeText: {
             fontSize: 45,
            fontWeight: "bold",
     },
     NameText: {
         fontSize: 45,
         fontWeight: "bold",
     }
 });
