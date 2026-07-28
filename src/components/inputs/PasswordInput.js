import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import passwordInputStyles from "../../styles/PasswordInputStyles";

export function PasswordInput({ value, onChangeText, label }) {
  const [secure, setSecure] = useState(true);

  return (
    <View style={passwordInputStyles.container}>
      <TextInput
        style={passwordInputStyles.input}
        placeholder={label}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
      />

      <TouchableOpacity
        style={passwordInputStyles.icon}
        onPress={() => setSecure(!secure)}
      >
        <Icon name={secure ? "eye-off" : "eye"} size={22} color="#666" />
      </TouchableOpacity>
    </View>
  );
}