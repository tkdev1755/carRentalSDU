import {useAgency} from "@/src/hooks/useAgency";
import {StyleSheet, View} from "react-native";
import  {useState} from "react";
import {
  ActivityIndicator,
  Text,
  Menu,
  Button,
  Divider,
  Provider,
  List,
  MD3Theme,
  useTheme} from "react-native-paper"
import {Dropdown} from "react-native-paper-dropdown";
type LocationSelectorProps = {
    agencyId: number
}
export const LocationSelector : React.FC<LocationSelectorProps> = ({agencyId}) => {
    const {agency, isLoading, error} = useAgency(agencyId);
    const [expanded, setExpanded] = useState(false);
    const styles = createStyles(useTheme());
    if (isLoading){
        return (<View style={styles.loading}>
            <ActivityIndicator size="large"/>
        </View>);
    }
    else if (error){
        return (<Text>Something went wrong</Text>);
    }
    return (
        <View>
            <Text variant={"titleMedium"} style={styles.text}>Pickup & Drop-off Location</Text>
            <List.Accordion
                theme={{colors: {background:'transparent'}}}
                title={agency?.name}
                right={props => <List.Icon {...props} icon={expanded ? "chevron-up" : "chevron-down"} />}
                onPress={() => setExpanded(!expanded)}
                style={styles.accordion}
            >
                <List.Item title={() => (
                    <Text style={styles.multilineText} variant={"bodyLarge"}>
                        Address : {agency?.location}
                    </Text>
                )} />
                <List.Item title={`Phone number : ${agency?.phone_number}`} />
            </List.Accordion>
        </View>
    );
};

const createStyles = (theme:MD3Theme) => StyleSheet.create({
    loading : {
        flex: 1, justifyContent: "center", alignItems: "center"
    },
    accordion: {
        borderRadius: 8,
        overflow: "hidden",
        borderStyle: "solid",
        borderColor : theme.colors.inversePrimary,
        borderWidth: 1.5,

    },
    multilineText: {
        flexWrap: "wrap",
    },
    text : {
        paddingBottom :10,
    }
})
