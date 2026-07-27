import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

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

  const pickAadhar = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
    });

    if (!result.canceled) {
      setAadharFile(result.assets[0]);
    }
  };

  const handleRegister = async () => {
    if (
      !fullName ||
      !formEmail ||
      !password ||
      !mobileNumber ||
      !residentialAddress ||
      !emergencyContactName ||
      !emergencyContactNumber
    ) {
      Alert.alert("Validation", "Fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("full_name", fullName);

      formData.append("email", formEmail);

      formData.append("password", password);

      formData.append("mobile_number", mobileNumber);

      formData.append("alternate_contact_number", alternateContactNumber);

      formData.append("residential_address", residentialAddress);

      formData.append("emergency_contact_name", emergencyContactName);

      formData.append("emergency_contact_number", emergencyContactNumber);

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
        Alert.alert("Server Error");
        return;
      }

      if (result.status === true || result.status === "success") {
        Alert.alert("Success", "OTP sent to your email");

        setEmail(formEmail);
        setOtpType("register");
        setStep("otp");
      } else {
        Alert.alert("Error", result.message || "Registration Failed");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <FloatingInput
        label="Full Name *"
        value={fullName}
        onChangeText={setFullName}
      />

      <FloatingInput
        label="Email *"
        value={formEmail}
        onChangeText={setFormEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <PasswordInput
        label="Password"
        value={password}
        onChangeText={setPassword}
      />

      <FloatingInput
        label="Mobile Number *"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
      />

      <FloatingInput
        label="Alternate Contact Number"
        value={alternateContactNumber}
        onChangeText={setAlternateContactNumber}
        keyboardType="phone-pad"
      />

      <FloatingInput
        label="Residential Address *"
        value={residentialAddress}
        onChangeText={setResidentialAddress}
        multiline
        height={100}
      />

      <FloatingInput
        label="Emergency Contact Name *"
        value={emergencyContactName}
        onChangeText={setEmergencyContactName}
      />

      <FloatingInput
        label="Emergency Contact Number *"
        value={emergencyContactNumber}
        onChangeText={setEmergencyContactNumber}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={petOwnerRegisterStyles.fileButton}
        onPress={pickAadhar}
      >
        <Text>
          {aadharFile ? aadharFile.name : "Upload Aadhar File (optional)"}
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
