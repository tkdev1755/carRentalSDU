import React from "react";
import { StyleSheet } from "react-native";
import { Portal, Snackbar } from "react-native-paper";
import { SETTINGS } from "../constants/settings";
import { useSnackbar } from "../context/SnackbarContext";

/**
 * Custom Snackbar for global use.
 * Please refer to the Documentation in SnackbarContext.tsx
 * @returns <Snackbar>
 */
const CustomSnackbar = () => {
  const snackbarState = useSnackbar();
  return (
    <Portal>
      <Snackbar
        visible={snackbarState.state.isVisible}
        onDismiss={snackbarState.hideSnackbar}
        duration={SETTINGS.SNACKBAR.CLOSING_DELAY}
        action={{
          label: SETTINGS.SNACKBAR.DISMISS_TEXT,
        }}
      >
        {snackbarState.state.message}
      </Snackbar>
    </Portal>
  );
};

export default CustomSnackbar;

const styles = StyleSheet.create({});
