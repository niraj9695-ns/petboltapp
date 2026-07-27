import React from "react";
import { View, Text } from "react-native";
import stepIndicatorStyles from "../styles/StepIndicatorStyles";

export default function StepIndicator({ step }) {
  return (
    <View style={stepIndicatorStyles.stepIndicatorContainer}>
      <View style={[stepIndicatorStyles.stepIndicatorCircle, step >= 1 && stepIndicatorStyles.stepIndicatorActive]}>
        <Text style={stepIndicatorStyles.stepIndicatorText}>1</Text>
      </View>

      <View style={[stepIndicatorStyles.stepIndicatorLine, step >= 2 && stepIndicatorStyles.stepIndicatorActiveLine]} />

      <View style={[stepIndicatorStyles.stepIndicatorCircle, step >= 2 && stepIndicatorStyles.stepIndicatorActive]}>
        <Text style={stepIndicatorStyles.stepIndicatorText}>2</Text>
      </View>

      <View style={[stepIndicatorStyles.stepIndicatorLine, step >= 3 && stepIndicatorStyles.stepIndicatorActiveLine]} />

      <View style={[stepIndicatorStyles.stepIndicatorCircle, step >= 3 && stepIndicatorStyles.stepIndicatorActive]}>
        <Text style={stepIndicatorStyles.stepIndicatorText}>3</Text>
      </View>
    </View>
  );
}

