import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { PasswordInput } from "../inputs/PasswordInput";
import FloatingInput from "../inputs/FloatingInput";
import petOwnerRegisterStyles from "../../styles/PetOwnerRegisterStyles";
export default function PetOwnerRegister({ setStep, setOtpType, setEmail }) {
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");

  const [formEmail, setFormEmail] = useState("");

  const [password, setPassword] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");

  const [alternateContactNumber, setAlternateContactNumber] = useState("");

  const [residentialAddress, setResidentialAddress] = useState("");

  const [emergencyContactName, setEmergencyContactName] = useState("");

  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");

  const [aadharFile, setAadharFile] = useState(null);

  const [errors, setErrors] = useState({});

  const [serverError, setServerError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const mobileRegex = /^[6-9]\d{9}$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateForm = () => {
    const newErrors = {};

    const cleanMobile = mobileNumber.replace(/\D/g, "");
    const cleanAlternate = alternateContactNumber.replace(/\D/g, "");
    const cleanEmergency = emergencyContactNumber.replace(/\D/g, "");

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = "Minimum 3 characters required";
    }

    if (!emailRegex.test(formEmail.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Minimum 8 chars, uppercase, lowercase, number & special character";
    }

    if (!mobileRegex.test(cleanMobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (cleanAlternate && !mobileRegex.test(cleanAlternate)) {
      newErrors.alternate = "Invalid alternate number";
    }

    if (cleanAlternate && cleanAlternate === cleanMobile) {
      newErrors.alternate = "Alternate number should be different from mobile";
    }

    if (!emergencyContactName.trim()) {
      newErrors.emergencyName = "Emergency contact name is required";
    }

    if (!mobileRegex.test(cleanEmergency)) {
      newErrors.emergencyNumber = "Invalid emergency contact number";
    }

    if (cleanEmergency === cleanMobile) {
      newErrors.emergencyNumber =
        "Emergency number should be different from mobile";
    }

    if (residentialAddress.trim().length < 10) {
      newErrors.address = "Address must contain at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const pickAadhar = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
    });

    if (!result.canceled) {
      setAadharFile(result.assets[0]);
    }
  };

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length <= 5) return cleaned;

    return `${cleaned.slice(0, 5)} ${cleaned.slice(5, 10)}`;
  };

  const handleRegister = async () => {
    setServerError("");
    setErrors({});
    if (!validateForm()) {
      return;
    }

    const cleanMobile = mobileNumber.replace(/\D/g, "");
    const cleanAlternate = alternateContactNumber.replace(/\D/g, "");
    const cleanEmergency = emergencyContactNumber.replace(/\D/g, "");

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("full_name", fullName);

      formData.append("email", formEmail);

      formData.append("password", password);

      formData.append("mobile_number", cleanMobile);

      formData.append("alternate_contact_number", cleanAlternate);

      formData.append("residential_address", residentialAddress);

      formData.append("emergency_contact_name", emergencyContactName);

      formData.append("emergency_contact_number", cleanEmergency);

      formData.append("role", "pet_owner");

      if (aadharFile) {
        formData.append("aadhar_file", {
          uri: aadharFile.uri,
          name: aadharFile.name || "aadhar.jpg",
          type: aadharFile.mimeType || "image/jpeg",
        });
      }

      const response = await fetch(
        "https://www.cgpisoftware.com/cheerytail/api/auth/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "User-Agent": "PostmanRuntime/7.29.0",
          },
          body: formData,
        },
      );

      const text = await response.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        setServerError("Server returned an invalid response");
        return;
      }

      if (result.status === true || result.status === "success") {
        try {
          const otpResponse = await fetch(
            "https://www.cgpisoftware.com/cheerytail/api/auth/send-email-otp",
            {
              method: "POST",
              body: (() => {
                const form = new FormData();
                form.append("email", formEmail);
                return form;
              })(),
            },
          );

          const otpResult = await otpResponse.json();

          if (otpResult.status === true || otpResult.status === "success") {
            Alert.alert("Success", "OTP sent to your email");

            setEmail(formEmail);
            setOtpType("register");
            setStep("otp");
          } else {
            setServerError(otpResult.message || "Failed to send OTP");
          }
        } catch (error) {
          setServerError(error.message || "Something went wrong");
        }
      } else {
        setServerError(result.message || "Unable to register");
      }
    } catch (error) {
      setServerError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {serverError ? (
        <View style={petOwnerRegisterStyles.errorBanner}>
          <Text style={petOwnerRegisterStyles.errorBannerTitle}>
            Registration Error
          </Text>
          <Text style={petOwnerRegisterStyles.errorBannerText}>
            {serverError}
          </Text>
        </View>
      ) : null}

      {errors.fullName ? (
        <Text style={petOwnerRegisterStyles.errorTopText}>
          {errors.fullName}
        </Text>
      ) : null}

      <FloatingInput
        label="Full Name *"
        value={fullName}
        onChangeText={(text) => {
          setFullName(text);
          setErrors((prev) => ({ ...prev, fullName: "" }));
        }}
      />

      {errors.email ? (
        <Text style={petOwnerRegisterStyles.errorTopText}>{errors.email}</Text>
      ) : null}

      <FloatingInput
        label="Email *"
        value={formEmail}
        onChangeText={(text) => {
          setFormEmail(text);
          setErrors((prev) => ({ ...prev, email: "" }));
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {errors.password ? (
        <Text style={petOwnerRegisterStyles.errorTopText}>
          {errors.password}
        </Text>
      ) : null}

      <PasswordInput
        label="Password *"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors((prev) => ({ ...prev, password: "" }));
        }}
      />

      {errors.mobile ? (
        <Text style={petOwnerRegisterStyles.errorTopText}>{errors.mobile}</Text>
      ) : null}

      <View style={petOwnerRegisterStyles.phoneWrapper}>
        <View style={petOwnerRegisterStyles.countryPicker}>
          <Text style={petOwnerRegisterStyles.countryText}>+91</Text>
        </View>

        <TextInput
          style={petOwnerRegisterStyles.phoneInput}
          placeholder="Enter mobile number"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          maxLength={10}
          value={mobileNumber}
          onChangeText={(text) => {
            const cleaned = text.replace(/\D/g, "").slice(0, 10);
            setMobileNumber(cleaned);
            setErrors((prev) => ({ ...prev, mobile: "" }));
          }}
        />
      </View>

      {errors.alternate ? (
        <Text style={petOwnerRegisterStyles.errorTopText}>
          {errors.alternate}
        </Text>
      ) : null}

      <View style={petOwnerRegisterStyles.phoneWrapper}>
        <View style={petOwnerRegisterStyles.countryPicker}>
          <Text style={petOwnerRegisterStyles.countryText}>+91</Text>
        </View>

        <TextInput
          style={petOwnerRegisterStyles.phoneInput}
          placeholder="Alternate Contact Number"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          maxLength={10}
          value={alternateContactNumber}
          onChangeText={(text) => {
            const cleaned = text.replace(/\D/g, "").slice(0, 10);
            setAlternateContactNumber(cleaned);
            setErrors((prev) => ({ ...prev, alternate: "" }));
          }}
        />
      </View>

      {errors.address ? (
        <Text style={petOwnerRegisterStyles.errorTopText}>
          {errors.address}
        </Text>
      ) : null}

      <FloatingInput
        label="Residential Address *"
        value={residentialAddress}
        onChangeText={(text) => {
          setResidentialAddress(text);
          setErrors((prev) => ({ ...prev, address: "" }));
        }}
        multiline
        height={100}
      />

      {errors.emergencyName ? (
        <Text style={petOwnerRegisterStyles.errorTopText}>
          {errors.emergencyName}
        </Text>
      ) : null}

      <FloatingInput
        label="Emergency Contact Name *"
        value={emergencyContactName}
        onChangeText={(text) => {
          setEmergencyContactName(text);
          setErrors((prev) => ({ ...prev, emergencyName: "" }));
        }}
      />

      {errors.emergencyNumber ? (
        <Text style={petOwnerRegisterStyles.errorTopText}>
          {errors.emergencyNumber}
        </Text>
      ) : null}

      <View style={petOwnerRegisterStyles.phoneWrapper}>
        <View style={petOwnerRegisterStyles.countryPicker}>
          <Text style={petOwnerRegisterStyles.countryText}>+91</Text>
        </View>

        <TextInput
          style={petOwnerRegisterStyles.phoneInput}
          placeholder="Emergency Contact Number"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          maxLength={10}
          value={emergencyContactNumber}
          onChangeText={(text) => {
            const cleaned = text.replace(/\D/g, "").slice(0, 10);
            setEmergencyContactNumber(cleaned);
            setErrors((prev) => ({ ...prev, emergencyNumber: "" }));
          }}
        />
      </View>

      <TouchableOpacity
        style={petOwnerRegisterStyles.fileButton}
        onPress={pickAadhar}
      >
        <Text>
          {aadharFile
            ? `📄 ${aadharFile.name}`
            : "📎 Upload Aadhaar File (Optional)"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={petOwnerRegisterStyles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={petOwnerRegisterStyles.btnText}>
          {loading ? "Registering..." : "Register Pet Owner"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
