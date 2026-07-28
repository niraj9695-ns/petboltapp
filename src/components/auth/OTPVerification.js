import React, { useState, useEffect, useRef } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { PasswordInput } from "../inputs/PasswordInput";
import otpVerificationStyles from "../../styles/OTPVerificationStyles";

export default function OTPVerification({
  email,
  otpType,
  password,
  onSuccess,
  onBack,
  navigation,
}) {
  const [otp, setOtp] = useState("");

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);

  const [focusedIndex, setFocusedIndex] = useState(null);

  const inputRefs = useRef([]);

  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otpDigits];
    updatedOtp[index] = value;

    setOtpDigits(updatedOtp);
    setOtp(updatedOtp.join(""));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Validation", "Please enter OTP");

      return;
    }

    try {
      setLoading(true);

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
          if (navigation && user?.role) {
            const nextRoute =
              user.role === "boarding_owner" ? "BoardingOwner" : "PetOwner";

            navigation.reset({
              index: 0,
              routes: [{ name: nextRoute }],
            });
          } else {
            onSuccess?.();
          }
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

      const resendOtp =
        result?.otp ||
        result?.data?.otp ||
        result?.data?.verification_otp ||
        "OTP not returned";

      Alert.alert("Success", "OTP Resent Successfully");
      setCountdown(30);
    } catch (error) {
      Alert.alert("Error", "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={otpVerificationStyles.heading}>Verify OTP</Text>

      <Text style={otpVerificationStyles.subText}>
        OTP sent to{"\n"}
        {email}
      </Text>

      <View style={otpVerificationStyles.otpContainer}>
        {otpDigits.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[
              otpVerificationStyles.otpBox,
              focusedIndex === index && otpVerificationStyles.otpBoxActive,
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && !digit && index > 0) {
                inputRefs.current[index - 1]?.focus();
              }
            }}
          />
        ))}
      </View>

      {otpType === "reset_password" && (
        <PasswordInput
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
      )}

      {countdown > 0 ? (
        <Text style={otpVerificationStyles.resendText}>
          Resend OTP in {countdown}s
        </Text>
      ) : (
        <TouchableOpacity onPress={handleResendOtp}>
          <Text style={otpVerificationStyles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={otpVerificationStyles.button}
        onPress={handleVerifyOtp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={otpVerificationStyles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack}>
        <Text style={otpVerificationStyles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
