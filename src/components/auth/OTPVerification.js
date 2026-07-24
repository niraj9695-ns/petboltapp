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

import AsyncStorage from "@react-native-async-storage/async-storage";

import { PasswordInput } from "../inputs/PasswordInput";

export default function OTPVerification({
  email,
  otpType,
  password,
  onSuccess,
  onBack,
}) {
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Validation", "Please enter OTP");

      return;
    }

    try {
      setLoading(true);

      // ====================================
      // RESET PASSWORD FLOW
      // ====================================

      if (otpType === "reset_password") {
        if (!newPassword) {
          Alert.alert("Validation", "Please enter new password");

          return;
        }

        const response = await fetch(
          "https://www.cgpisoftware.com/cheerytail/api/auth/reset-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              otp,
              new_password: newPassword,
            }),
          },
        );

        const result = await response.json();

        if (result.status === true || result.status === "success") {
          Alert.alert("Success", "Password reset successfully");

          onBack?.();
        } else {
          Alert.alert("Error", result.message || "Failed to reset password");
        }

        return;
      }

      // ====================================
      // LOGIN / REGISTER FLOW
      // ====================================

      const endpoint =
        otpType === "login"
          ? "https://www.cgpisoftware.com/cheerytail/api/auth/verify-login-otp"
          : "https://www.cgpisoftware.com/cheerytail/api/auth/verify-email-otp";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const result = await response.json();

      if (result.status === true || result.status === "success") {
        const token = result?.data?.token || result?.token;

        const user = result?.data?.user || result?.user;

        if (user?.role) {
          await AsyncStorage.setItem("role", user.role);
        }

        if (token) {
          await AsyncStorage.setItem("token", token);
        }

        if (user) {
          await AsyncStorage.setItem("user", JSON.stringify(user));
        }

        Alert.alert("Success", "OTP Verified");

        setTimeout(() => {
          onSuccess?.();
        }, 100);
      } else {
        Alert.alert("Error", result.message || "Invalid OTP");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);

      const endpoint =
        otpType === "login"
          ? "https://www.cgpisoftware.com/cheerytail/api/auth/login"
          : otpType === "reset_password"
            ? "https://www.cgpisoftware.com/cheerytail/api/auth/forgot-password"
            : "https://www.cgpisoftware.com/cheerytail/api/auth/send-email-otp";

      const payload =
        otpType === "login"
          ? {
              email,
              password,
            }
          : {
              email,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      Alert.alert("Success", "OTP Resent Successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Verify OTP</Text>

      <Text style={styles.subText}>
        OTP sent to{"\n"}
        {email}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      {otpType === "reset_password" && (
        <PasswordInput
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
      )}

      <TouchableOpacity onPress={handleResendOtp}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerifyOtp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },

  subText: {
    color: "#666",
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

  resendText: {
    color: "#6b21a8",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#6b21a8",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },

  backText: {
    textAlign: "center",
    marginTop: 15,
    color: "#666",
  },
});
