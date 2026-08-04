import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dateInputStyles from "../../styles/DateInputStyles";
import { useTheme } from "../../context/ThemeContext";

export default function DateInput({
  label,
  value,
  onChange,
  mode = "date", // "date" | "time"
}) {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();

  const formatDate = (date) => {
    if (!date) return "";
    return mode === "time"
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString();
  };

  return (
    <View style={dateInputStyles.container}>
      <Text style={[dateInputStyles.label, { color: theme.textPrimary }]}>{label}</Text>

      <TouchableOpacity
        style={[
          dateInputStyles.input,
          {
            backgroundColor: theme.inputBackground,
            borderColor: theme.border,
          },
        ]}
        onPress={() => setShow(true)}
      >
        <Text style={{ color: value ? theme.textPrimary : theme.placeholder }}>
          {value ? formatDate(value) : "Select"}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShow(false);
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}