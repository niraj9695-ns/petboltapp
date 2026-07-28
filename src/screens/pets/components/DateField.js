import React, { useState } from "react";

import { TouchableOpacity, Text } from "react-native";
import dateFieldStyles from "../styles/DateFieldStyles";

import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function DateField({ value, onChange, placeholder, style }) {
  const [visible, setVisible] = useState(false);

  const handleConfirm = (date) => {
    const formatted = date.toISOString().split("T")[0];

    onChange(formatted);

    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={style} onPress={() => setVisible(true)}>
        <Text style={value ? dateFieldStyles.dateFieldText : dateFieldStyles.dateFieldPlaceholder}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
        maximumDate={new Date()}
      />
    </>
  );
}

