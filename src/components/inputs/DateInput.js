import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dateInputStyles from "../../styles/DateInputStyles";

export default function DateInput({
  label,
  value,
  onChange,
  mode = "date", // "date" | "time"
}) {
  const [show, setShow] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";
    return mode === "time"
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString();
  };

  return (
    <View style={dateInputStyles.container}>
      <Text style={dateInputStyles.label}>{label}</Text>

      <TouchableOpacity
        style={dateInputStyles.input}
        onPress={() => setShow(true)}
      >
        <Text style={{ color: value ? "#000" : "#888" }}>
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