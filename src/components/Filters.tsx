import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Icon, Modal, Portal, RadioButton } from 'react-native-paper';

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
    <View className="mb-4">
      <Button mode={mode} onPress={showModal} onLongPress={reset} icon="chevron-down">
        {label}
      </Button>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 8 }}>
          <Text className="text-lg font-bold mb-4">Select {label}</Text>
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
};

export const Filters: React.FC<{ children: React.ReactNode }> & FiltersComposition = ({ children }) => {
  return <View className="p-4">{children}</View>;
};

Filters.SingleSelect = SingleSelect;
Filters.Reset = Reset;
Filters.Toggle = Toggle;
