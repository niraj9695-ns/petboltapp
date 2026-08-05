import React, { useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import floatingInputStyles from "../../styles/FloatingInputStyles";
import { useTheme } from "../../context/ThemeContext";

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
  const { theme } = useTheme();

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const active =
    focused || String(internalValue || "").trim().length > 0;

  return (
    <View style={[floatingInputStyles.container, multiline && { height }]}>
      <Text
        style={[
          floatingInputStyles.label,
          active && floatingInputStyles.labelActive,
          {
            color: active ? theme.primary : theme.placeholder,
            backgroundColor: theme.inputBackground,
          },
        ]}
      >
        {label}
      </Text>

      <TextInput
        style={[
          floatingInputStyles.input,
          multiline && { height, textAlignVertical: "top" },
          {
            backgroundColor: theme.inputBackground,
            borderColor: focused ? theme.primary : theme.border,
            color: theme.textPrimary,
          },
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
        placeholderTextColor={theme.placeholder}
        selectionColor={theme.primary}
      />
    </View>
  );
}