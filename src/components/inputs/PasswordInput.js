import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import passwordInputStyles from "../../styles/PasswordInputStyles";
import { useTheme } from "../../context/ThemeContext";

export function PasswordInput({ value, onChangeText, label }) {
  const [secure, setSecure] = useState(true);
  const { theme } = useTheme();

  return (
    <View style={passwordInputStyles.container}>
      <TextInput
        style={[
          passwordInputStyles.input,
          {
            backgroundColor: theme.inputBackground,
            borderColor: theme.border,
            color: theme.textPrimary,
          },
        ]}
        placeholder={label}
        placeholderTextColor={theme.placeholder}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor={theme.primary}
      />

      <TouchableOpacity
        style={passwordInputStyles.icon}
        onPress={() => setSecure(!secure)}
      >
        <Icon name={secure ? "eye-off" : "eye"} size={22} color={theme.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}
