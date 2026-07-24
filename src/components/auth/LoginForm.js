import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { PasswordInput } from "../inputs/PasswordInput";

export default function LoginForm({
  setStep,
  setOtpType,
  setEmail,
  setPassword,
}) {
  const [email, setEmailInput] = useState("");

  const [password, setPasswordInput] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation", "Please enter email and password");

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://www.cgpisoftware.com/cheerytail/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const result = await response.json();

      if (result.status === true || result.status === "success") {
        Alert.alert("Success", "OTP Sent Successfully");

        setEmail?.(email);

        setPassword?.(password);

        setOtpType("login");

        setTimeout(() => {
          setStep("otp");
        }, 50);
      } else if (result.message?.toLowerCase().includes("verify email")) {
        const otpResponse = await fetch(
          "https://www.cgpisoftware.com/cheerytail/api/auth/send-email-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          },
        );

        const otpResult = await otpResponse.json();

        Alert.alert(
          "Email Not Verified",
          "Verification OTP sent to your email",
        );

        setEmail?.(email);

        setPassword?.(password);

        setOtpType("register");

        setTimeout(() => {
          setStep("otp");
        }, 50);
      } else {
        Alert.alert("Error", result.message || "Invalid Credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Validation", "Please enter your email");

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://www.cgpisoftware.com/cheerytail/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      const result = await response.json();

      if (result.status === true || result.status === "success") {
        Alert.alert("Success", "Reset OTP sent to email");

        setEmail?.(email);

        setOtpType("reset_password");

        setTimeout(() => {
          setStep("otp");
        }, 50);
      } else {
        Alert.alert("Error", result.message || "Failed to send OTP");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmailInput}
        autoCapitalize="none"
      />

      <PasswordInput
        label="Password"
        value={password}
        onChangeText={setPasswordInput}
      />

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  forgotText: {
    textAlign: "right",
    color: "#6b21a8",
    fontWeight: "600",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#6b21a8",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
