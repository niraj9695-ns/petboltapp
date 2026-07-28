import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import customPickerStyles from "../styles/CustomPickerStyles";

export default function CustomPicker({
  selectedValue,
  onValueChange,
  items,
  style,
}) {
  return (
    <View style={[customPickerStyles.pickerContainer, style]}>
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        <Picker.Item label="Select" value="" />

        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
}

