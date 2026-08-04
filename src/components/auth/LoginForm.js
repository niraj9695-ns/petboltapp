import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

import { PasswordInput } from "../inputs/PasswordInput";
import loginFormStyles from "../../styles/LoginFormStyles";
import PremiumLoader from "../PremiumLoader";

export default function LoginForm({
  setStep,
  setOtpType,
  setEmail,
  setPassword,
}) {
  const [email, setEmailInput] = useState("");

  const [password, setPasswordInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { theme } = useTheme();

  const validateLogin = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) {
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
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
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
      <Text style={[loginFormStyles.heading, { color: theme.textPrimary }]}>Login</Text>

      {errors.email || errors.password ? (
        <Text style={loginFormStyles.errorTopText}>
          {errors.email || errors.password}
        </Text>
      ) : null}

      <TextInput
        style={[
          loginFormStyles.input,
          {
            backgroundColor: theme.inputBackground,
            borderColor: theme.border,
            color: theme.textPrimary,
          },
        ]}
        placeholder="Email"
        placeholderTextColor={theme.placeholder}
        value={email}
        onChangeText={(text) => {
          setEmailInput(text);
          setErrors((prev) => ({ ...prev, email: "" }));
        }}
        autoCapitalize="none"
        selectionColor={theme.primary}
      />

      <PasswordInput
        label="Password"
        value={password}
        onChangeText={(text) => {
          setPasswordInput(text);
          setErrors((prev) => ({ ...prev, password: "" }));
        }}
      />

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={[loginFormStyles.forgotText, { color: theme.primary }]}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[loginFormStyles.button, { backgroundColor: theme.primary }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <PremiumLoader size={28} color="#fff" showLabel={false} />
        ) : (
          <Text style={loginFormStyles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
