import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  Linking,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import profileEditStyles from "../styles/ProfileEditScreenStyles";

const API_URL = "https://www.cgpisoftware.com/cheerytail";

export default function ProfileEditScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [aadharFile, setAadharFile] = useState(null);
  const [user, setUser] = useState(null);
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.goBack();
        return;
      }

      const response = await fetch(`${API_URL}/api/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const result = await response.json();
      const data = result?.data || result;
      const details =
        data?.owner_details || data?.owner || result?.owner || data || {};

      const isSuccess =
        response.ok &&
        (result?.status === "success" ||
          result?.status === true ||
          !result?.status);

      if (isSuccess) {
        setUser({
          id: data?.id || result?.user_id || result?.id || null,
          role: data?.role || result?.role || "",
          email_verified:
            data?.email_verified || result?.email_verified || false,
          full_name: details.full_name || "",
          email: details.email || "",
          phone: details.mobile_number || "",
          alternate_phone: details.alternate_contact_number || "",
          address: details.residential_address || "",
          emergency_name: details.emergency_contact_name || "",
          emergency_number: details.emergency_contact_number || "",
          aadhar_file: details.aadhar_file || "",
        });

        setFullName(details.full_name || "");
        setPhone(details.mobile_number || "");
        setAlternatePhone(details.alternate_contact_number || "");
        setAddress(details.residential_address || "");
        setEmergencyName(details.emergency_contact_name || "");
        setEmergencyNumber(details.emergency_contact_number || "");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to load your profile.");
    } finally {
      setLoading(false);
    }
  };

  const pickAadhar = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
      });

      if (!result.canceled) {
        setAadharFile(result.assets[0]);
      }
    } catch (error) {}
  };

  const handleSaveProfile = async () => {
    if (!fullName || !phone || !address || !emergencyName || !emergencyNumber) {
      Alert.alert("Validation", "Please fill all required fields.");
      return;
    }

    setSaving(true);

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert(
          "Session Required",
          "Please sign in again to update your profile.",
        );
        return;
      }

      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("mobile_number", phone);
      formData.append("alternate_contact_number", alternatePhone);
      formData.append("residential_address", address);
      formData.append("emergency_contact_name", emergencyName);
      formData.append("emergency_contact_number", emergencyNumber);

      if (aadharFile) {
        formData.append("aadhar_file", {
          uri: aadharFile.uri,
          name:
            aadharFile.name ||
            `aadhar.${aadharFile.uri.split(".").pop() || "jpg"}`,
          type: aadharFile.mimeType || "application/octet-stream",
        });
      }

      const response = await fetch(`${API_URL}/api/user/profile/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      if (
        response.ok &&
        (result.status === true || result.status === "success")
      ) {
        Alert.alert("Success", "Profile updated successfully.");
        navigation.goBack();
      } else {
        Alert.alert(
          "Update Failed",
          result.message || "Unable to update profile.",
        );
      }
    } catch (error) {
      Alert.alert("Error", "Unable to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const currentAadharIsPdf = user?.aadhar_file?.toLowerCase().endsWith(".pdf");

  if (loading) {
    return (
      <View style={profileEditStyles.loaderContainer}>
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }

  return (
    <ScrollView
      style={profileEditStyles.wrapper}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <LinearGradient
        colors={["#fff1e6", "#ffe4f0", "#f3e8ff"]}
        style={[
          profileEditStyles.container,
          {
            maxWidth: isTablet ? 700 : "100%",
            alignSelf: "center",
            width: "100%",
          },
        ]}
      >
        <View style={profileEditStyles.headerRow}>
          <TouchableOpacity
            style={profileEditStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={profileEditStyles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={profileEditStyles.editTitle}>Update Profile</Text>
        </View>

        <View style={profileEditStyles.editCard}>
          <Text style={profileEditStyles.formLabel}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={profileEditStyles.input}
          />

          <Text style={profileEditStyles.formLabel}>Mobile Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={profileEditStyles.input}
            keyboardType="phone-pad"
          />

          <Text style={profileEditStyles.formLabel}>Alternate Contact Number</Text>
          <TextInput
            value={alternatePhone}
            onChangeText={setAlternatePhone}
            style={profileEditStyles.input}
            keyboardType="phone-pad"
          />

          <Text style={profileEditStyles.formLabel}>Residential Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={[profileEditStyles.input, profileEditStyles.multiLineInput]}
            multiline
          />

          <Text style={profileEditStyles.formLabel}>Emergency Contact Name</Text>
          <TextInput
            value={emergencyName}
            onChangeText={setEmergencyName}
            style={profileEditStyles.input}
          />

          <Text style={profileEditStyles.formLabel}>Emergency Contact Number</Text>
          <TextInput
            value={emergencyNumber}
            onChangeText={setEmergencyNumber}
            style={profileEditStyles.input}
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            style={profileEditStyles.fileButton}
            onPress={pickAadhar}
          >
            <Text style={profileEditStyles.fileButtonText}>
              Choose Aadhaar File
            </Text>
          </TouchableOpacity>

          <View style={profileEditStyles.btnRow}>
            <TouchableOpacity
              style={profileEditStyles.primaryBtn}
              onPress={handleSaveProfile}
              disabled={saving}
            >
              <Text style={profileEditStyles.primaryBtnText}>
                {saving ? "Saving..." : "Save Changes"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[profileEditStyles.secondaryBtn, profileEditStyles.cancelBtn]}
              onPress={() => navigation.goBack()}
            >
              <Text style={profileEditStyles.secondaryBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {user?.aadhar_file ? (
          <View style={profileEditStyles.documentCard}>
            <View style={profileEditStyles.documentInfo}>
              <Text style={profileEditStyles.documentIcon}>🪪</Text>

              <View style={{ flex: 1 }}>
                <Text style={profileEditStyles.documentTitle}>
                  Aadhaar Document
                </Text>

                <Text style={profileEditStyles.documentSubTitle}>
                  Uploaded and verified document
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={profileEditStyles.viewDocumentBtn}
              onPress={() => Linking.openURL(user.aadhar_file)}
            >
              <Text style={profileEditStyles.viewDocumentText}>View Aadhaar</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </LinearGradient>
    </ScrollView>
  );
}
