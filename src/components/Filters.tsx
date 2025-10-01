import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon, Modal, Portal, RadioButton, TextInput } from 'react-native-paper';

type NumberProps = {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  display?: (value: number) => string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

function Number({ display, label, value, onChange, placeholder, min = 0, max = 100, step = 1 }: NumberProps) {
    const [visible, setVisible] = useState(false);
    
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const reset = () => {
      onChange(null);
      hideModal();
    }

    const addAmount = (amount: number) => {
      if (value === null) {
        onChange(min);
      } else {
        const newValue = Math.min(max, Math.max(min, value + amount));
        onChange(newValue);
      }
    }

    const mode = value !== null ? "contained" : "outlined";
    const displayValue = value !== null ? (display ? display(value) : `€ ${value}`) : label;

    return (
      <View style={styles.option}>
        <Button mode={mode} onPress={showModal} onLongPress={reset} icon="chevron-down">{label}</Button>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={[styles.modal, {gap: 20}]}>
            <Text style={styles.modal_title}>Select {label}</Text>
            <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10}}>
              <Button mode="outlined" onPress={() => addAmount(-step)}>-{step}</Button>
              <TextInput
                mode="outlined"
                label={label}
                value={value !== null ? String(value) : ''}
                onChangeText={(text) => {
                  const num = parseInt(text, 10);
                  if (!isNaN(num) && num >= min && num <= max) {
                    onChange(num);
                  } else if (text === '') {
                    onChange(null);
                  }
                }}
                keyboardType="numeric"
                style={{ flex: 1, textAlign: 'center' }}
                placeholder={placeholder}
              />
              <Button mode="outlined" onPress={() => addAmount(step)}>+{step}</Button>
            </View>
            <Button mode="contained" onPress={hideModal}>Done</Button>
          </Modal>
        </Portal>
      </View>
    )
}

type ToggleProps = {
    label: string;
    toggled: boolean;
    onToggle: (value: boolean) => void;
}

function Toggle({ label, toggled, onToggle}: ToggleProps) {
    const mode = toggled ? "contained" : "outlined";

    return (
        <Button mode={mode} onPress={() => onToggle(!toggled)}>
            {label}
        </Button>
    )
}

type SingleSelectProps<T> = {
  label: string;
  options: T[];
  selected: T | null;
  onSelect: (selected: T | null) => void;
  renderOption?: (option: T) => string;
};

function SingleSelect<T>({ label, options, selected, onSelect, renderOption }: SingleSelectProps<T>) {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const reset = () => {
    onSelect(null);
    hideModal();
  }

  const getOptionLabel = (option: T) => (renderOption ? renderOption(option) : String(option));

  const handleSelect = (value: string) => {
    const selectedOption = options.find(opt => getOptionLabel(opt) === value) || null;
    onSelect(selectedOption);
    hideModal();
  };

  const selectedLabel = selected ? getOptionLabel(selected) : `${label}`;
  const mode = selected ? "contained" : "outlined";

  return (
    <View style={styles.option}>
      <Button mode={mode} onPress={showModal} onLongPress={reset} icon="chevron-down">
        {label}
      </Button>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <Text style={styles.modal_title}>Select {label}</Text>
          <RadioButton.Group onValueChange={handleSelect} value={selected ? getOptionLabel(selected) : ''}>
            {options.map((option, index) => (
              <RadioButton.Item key={index} label={getOptionLabel(option)} value={getOptionLabel(option)} />
            ))}
          </RadioButton.Group>
        </Modal>
      </Portal>
    </View>
  );
}

type ResetProps = {
  onPress: () => void;
  icon?: string;
};

function Reset({ onPress, icon }: ResetProps) {
  return (
    <Button onPress={onPress}>
      <Icon source={icon ?? "refresh"} size={24} />
    </Button>
  );
}

type FiltersComposition = {
  SingleSelect: typeof SingleSelect;
  Reset: typeof Reset;
  Toggle: typeof Toggle;
  Number: typeof Number;
};

export const Filters: React.FC<{ children: React.ReactNode }> & FiltersComposition = ({ children }) => {
  return <View>{children}</View>;
};

Filters.SingleSelect = SingleSelect;
Filters.Reset = Reset;
Filters.Toggle = Toggle;
Filters.Number = Number;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modal_title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    // marginBottom: 10,
  },
});
