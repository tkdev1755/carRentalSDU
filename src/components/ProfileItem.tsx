import React from "react";
import { List } from "react-native-paper";
import { ViewStyle } from "react-native";

type ProfileItemProps = {
    label: string;
    value: string;
    onPress: () => void;
    style?: ViewStyle;
};

export const ProfileItem: React.FC<ProfileItemProps> = ({
                                                            label,
                                                            value,
                                                            onPress,
                                                            style,
                                                        }) => {
    return (
        <List.Item
            style={style}
            title={label}
            description={value}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={onPress}
        />
    );
};