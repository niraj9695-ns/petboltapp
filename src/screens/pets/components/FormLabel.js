import React from "react";
import { Text } from "react-native";
import formLabelStyles from "../styles/FormLabelStyles";

export default function FormLabel({ title, required, error }) {
  return (
    <Text style={[formLabelStyles.formLabel, error && formLabelStyles.formLabelError]}>
      {title}
      {required && <Text style={formLabelStyles.formLabelRequired}> *</Text>}
    </Text>
  );
}

