import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { PasswordInput } from "../inputs/PasswordInput";
import loginFormStyles from "../../styles/LoginFormStyles";

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

      const loginOtp =
        result?.otp ||
        result?.data?.otp ||
        result?.data?.verification_otp ||
        "OTP not returned";

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

        const emailOtp =
          otpResult?.otp ||
          otpResult?.data?.otp ||
          otpResult?.data?.verification_otp ||
          "OTP not returned";

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

      const forgotOtp =
        result?.otp ||
        result?.data?.otp ||
        result?.data?.verification_otp ||
        "OTP not returned";

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
      <Text style={loginFormStyles.heading}>Login</Text>

      <TextInput
        style={loginFormStyles.input}
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
        <Text style={loginFormStyles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={loginFormStyles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={loginFormStyles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
