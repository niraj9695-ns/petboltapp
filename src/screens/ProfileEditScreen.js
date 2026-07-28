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
import profileStyles from "../styles/ProfileScreenStyles";

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
      <View style={profileStyles.loaderContainer}>
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }

  return (
    <ScrollView
      style={profileStyles.wrapper}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <LinearGradient
        colors={["#fff1e6", "#ffe4f0", "#f3e8ff"]}
        style={[
          profileStyles.container,
          {
            maxWidth: isTablet ? 700 : "100%",
            alignSelf: "center",
            width: "100%",
          },
        ]}
      >
        <View style={profileStyles.headerRow}>
          <TouchableOpacity
            style={profileStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={profileStyles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={profileStyles.editTitle}>Update Profile</Text>
        </View>

        <View style={profileStyles.editCard}>
          <Text style={profileStyles.formLabel}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={profileStyles.input}
          />

          <Text style={profileStyles.formLabel}>Mobile Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={profileStyles.input}
            keyboardType="phone-pad"
          />

          <Text style={profileStyles.formLabel}>Alternate Contact Number</Text>
          <TextInput
            value={alternatePhone}
            onChangeText={setAlternatePhone}
            style={profileStyles.input}
            keyboardType="phone-pad"
          />

          <Text style={profileStyles.formLabel}>Residential Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={[profileStyles.input, profileStyles.multiLineInput]}
            multiline
          />

          <Text style={profileStyles.formLabel}>Emergency Contact Name</Text>
          <TextInput
            value={emergencyName}
            onChangeText={setEmergencyName}
            style={profileStyles.input}
          />

          <Text style={profileStyles.formLabel}>Emergency Contact Number</Text>
          <TextInput
            value={emergencyNumber}
            onChangeText={setEmergencyNumber}
            style={profileStyles.input}
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            style={profileStyles.fileButton}
            onPress={pickAadhar}
          >
            <Text style={profileStyles.fileButtonText}>
              Choose Aadhaar File
            </Text>
          </TouchableOpacity>

          {aadharFile ? (
            <Text style={profileStyles.fileName}>{aadharFile.name}</Text>
          ) : user?.aadhar_file ? (
            <TouchableOpacity
              style={profileStyles.fileAction}
              onPress={() => Linking.openURL(user.aadhar_file)}
            >
              <Text style={profileStyles.fileActionText}>
                {currentAadharIsPdf
                  ? "View current Aadhaar PDF"
                  : "View current Aadhaar image"}
              </Text>
            </TouchableOpacity>
          ) : null}

          <View style={profileStyles.btnRow}>
            <TouchableOpacity
              style={profileStyles.primaryBtn}
              onPress={handleSaveProfile}
              disabled={saving}
            >
              <Text style={profileStyles.primaryBtnText}>
                {saving ? "Saving..." : "Save Changes"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[profileStyles.secondaryBtn, profileStyles.cancelBtn]}
              onPress={() => navigation.goBack()}
            >
              <Text style={profileStyles.secondaryBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {user?.aadhar_file ? (
          <>
            <Text style={profileStyles.docTitle}>Aadhaar Document</Text>
            {currentAadharIsPdf ? (
              <TouchableOpacity
                style={profileStyles.fileAction}
                onPress={() => Linking.openURL(user.aadhar_file)}
              >
                <Text style={profileStyles.fileActionText}>
                  View Aadhaar PDF
                </Text>
              </TouchableOpacity>
            ) : (
              <Image
                source={{ uri: user.aadhar_file }}
                style={profileStyles.aadharImage}
                resizeMode="cover"
              />
            )}
          </>
        ) : null}
      </LinearGradient>
    </ScrollView>
  );
}
