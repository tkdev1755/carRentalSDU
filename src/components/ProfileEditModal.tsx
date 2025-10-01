import React from "react";
import { StyleSheet } from "react-native";
import { Modal, Portal, Text, TextInput, Button } from "react-native-paper";

type EditFieldModalProps = {
    visible: boolean;
    label: string;
    value: string;
    onDismiss: () => void;
    onSave: (newValue: string) => void;
};

export const EditFieldModal: React.FC<EditFieldModalProps> = ({
                                                                  visible,
                                                                  label,
                                                                  value,
                                                                  onDismiss,
                                                                  onSave,
                                                              }) => {
    const [tempValue, setTempValue] = React.useState(value);

    React.useEffect(() => {
        setTempValue(value); // reset quand modal change
    }, [value]);

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
                <Text variant="titleMedium" style={{ marginBottom: 16 }}>
                    Modify your {label}
                </Text>
                <TextInput
                    mode="outlined"
                    value={tempValue}
                    onChangeText={setTempValue}
                    style={{ marginBottom: 16 }}
                />
                <Button mode="contained" onPress={() => onSave(tempValue)}>
                    Apply
                </Button>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "white",
        padding: 20,
        margin: 20,
        borderRadius: 12,
    },
});