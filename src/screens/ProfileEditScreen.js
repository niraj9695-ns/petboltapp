import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Linking,
  useWindowDimensions,
} from "react-native";
import PremiumLoader from "../components/PremiumLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import profileEditStyles from "../styles/ProfileEditScreenStyles";
import { useTheme } from "../context/ThemeContext";

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
  const { theme } = useTheme();

  const isTablet = width >= 768;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("Profile");
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
        navigation.navigate("Profile");
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
      <View style={[profileEditStyles.loaderContainer, { backgroundColor: theme.background }]}> 
        <PremiumLoader size={56} color={theme.primary} label="Loading profile" />
      </View>
    );
  }

  return (
    <ScrollView
      style={[profileEditStyles.wrapper, { backgroundColor: theme.background }]}
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
            backgroundColor: theme.cardBackground,
          },
        ]}
      >
        <View style={profileEditStyles.headerRow}>
          <TouchableOpacity
            style={[profileEditStyles.backButton, { backgroundColor: theme.cardBackground }]}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={[profileEditStyles.backButtonText, { color: theme.primary }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[profileEditStyles.editTitle, { color: theme.textPrimary }]}>Update Profile</Text>
        </View>

        <View style={[profileEditStyles.editCard, { backgroundColor: theme.cardBackground, borderColor: theme.border, borderWidth: 1 }]}> 
          <Text style={[profileEditStyles.formLabel, { color: theme.textSecondary }]}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={[
              profileEditStyles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.textPrimary,
              },
            ]}
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.primary}
          />

          <Text style={[profileEditStyles.formLabel, { color: theme.textSecondary }]}>Mobile Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={[
              profileEditStyles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.textPrimary,
              },
            ]}
            keyboardType="phone-pad"
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.primary}
          />

          <Text style={[profileEditStyles.formLabel, { color: theme.textSecondary }]}> 
            Alternate Contact Number
          </Text>
          <TextInput
            value={alternatePhone}
            onChangeText={setAlternatePhone}
            style={[
              profileEditStyles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.textPrimary,
              },
            ]}
            keyboardType="phone-pad"
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.primary}
          />

          <Text style={[profileEditStyles.formLabel, { color: theme.textSecondary }]}>Residential Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={[
              profileEditStyles.input,
              profileEditStyles.multiLineInput,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.textPrimary,
              },
            ]}
            multiline
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.primary}
          />

          <Text style={[profileEditStyles.formLabel, { color: theme.textSecondary }]}> 
            Emergency Contact Name
          </Text>
          <TextInput
            value={emergencyName}
            onChangeText={setEmergencyName}
            style={[
              profileEditStyles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.textPrimary,
              },
            ]}
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.primary}
          />

          <Text style={[profileEditStyles.formLabel, { color: theme.textSecondary }]}> 
            Emergency Contact Number
          </Text>
          <TextInput
            value={emergencyNumber}
            onChangeText={setEmergencyNumber}
            style={[
              profileEditStyles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.textPrimary,
              },
            ]}
            keyboardType="phone-pad"
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.primary}
          />

          <TouchableOpacity
            style={[
              profileEditStyles.fileButton,
              {
                backgroundColor: theme.muted,
                borderColor: theme.border,
              },
            ]}
            onPress={pickAadhar}
          >
            <Text style={[profileEditStyles.fileButtonText, { color: theme.primary }]}> 
              Choose Aadhaar File
            </Text>
          </TouchableOpacity>
          <View style={profileEditStyles.buttonContainer}>
            <View style={profileEditStyles.btnRow}>
              <TouchableOpacity
                style={[profileEditStyles.primaryBtn, { backgroundColor: theme.primary }]}
                onPress={handleSaveProfile}
                disabled={saving}
              >
                <Text style={profileEditStyles.primaryBtnText}>
                  {saving ? "Saving..." : "Save Changes"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  profileEditStyles.secondaryBtn,
                  profileEditStyles.cancelBtn,
                  { backgroundColor: theme.cardBackground, borderColor: theme.border },
                ]}
                onPress={() => navigation.navigate("Profile")}
              >
                <Text style={[profileEditStyles.secondaryBtnText, { color: theme.primary }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
