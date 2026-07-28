import React, { useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import floatingInputStyles from "../../styles/FloatingInputStyles";

export default function FloatingInput({
  label,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize = "sentences",
  multiline = false,
  height = 50,
}) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const active =
    focused || String(internalValue || "").trim().length > 0;

  return (
    <View style={[floatingInputStyles.container, multiline && { height }]}>
      <Text style={[floatingInputStyles.label, active && floatingInputStyles.labelActive]}>
        {label}
      </Text>

      <TextInput
        style={[
          floatingInputStyles.input,
          multiline && { height, textAlignVertical: "top" },
        ]}
        value={internalValue}
        onChangeText={(text) => {
          setInternalValue(text);
          onChangeText?.(text);
        }}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}