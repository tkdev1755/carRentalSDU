import React from "react";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";
type ProfilePicProps = {
    name : string;
    image : string;

};
export const ProfilePic : React.FC<ProfilePicProps> = ({name,image}) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Avatar.Image
                size={120}
                source={{ uri: image }}
            />
            <Text variant="titleLarge" style={{ marginTop: 16 }}>
                {name}
            </Text>
        </View>
    );
};