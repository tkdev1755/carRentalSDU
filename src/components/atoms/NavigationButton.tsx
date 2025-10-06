import { ExternalPathString, RelativePathString, router } from "expo-router";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

/**
 * Button for Navigation between screens
 * Handles also routing logic
 */
const NavigationButton = ({
  pathname,
  params,
  text,
  disabled,
}: {
  pathname: RelativePathString | ExternalPathString;
  params?: Record<string, any>;
  text: string;
  disabled?: boolean;
}) => {
  return (
    <Button
      mode="contained"
      onPress={() => router.push({ pathname, params })}
      compact
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default NavigationButton;

const styles = StyleSheet.create({});
