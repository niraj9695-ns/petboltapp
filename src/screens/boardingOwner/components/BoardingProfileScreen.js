import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import styles from "../styles/BoardingProfileStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE_URL = "https://www.cgpisoftware.com/cheerytail";

export default function BoardingProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState("personal");

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/owner/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.status === "success") {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.log("PROFILE ERROR =>", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();

    const unsubscribe = navigation.addListener("focus", () => {
      fetchProfile();
    });

    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#6b21a8" />
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        <View style={styles.loader}>
          <Text>Unable to load profile</Text>
        </View>
      </SafeAreaView>
    );
  }

  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? "" : section));
  };

  const renderSection = (sectionKey, title, content) => {
    const isExpanded = expandedSection === sectionKey;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(sectionKey)}
          activeOpacity={0.9}
        >
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionChevron}>{isExpanded ? "−" : "+"}</Text>
        </TouchableOpacity>

        {isExpanded ? <View style={styles.sectionBody}>{content}</View> : null}
      </View>
    );
  };

  const openDocument = async (url) => {
    try {
      if (!url) {
        Alert.alert("Error", "Document not found");
        return;
      }

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Unable to Open",
          "No application found to open this document.",
        );
      }
    } catch (error) {
      console.log("DOCUMENT OPEN ERROR =>", error);
      Alert.alert("Error", "Failed to open document");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile?.full_name?.charAt(0)?.toUpperCase() || "B"}
            </Text>
          </View>

          <Text style={styles.name}>{profile?.full_name || "Boarding Owner"}</Text>
          <Text style={styles.email}>{profile?.email}</Text>

          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>BOARDING OWNER</Text>
          </View>
        </View>

        {renderSection(
          "personal",
          "Personal Details",
          <>
            <Info label="Full Name" value={profile.full_name} />
            <Info label="Email" value={profile.email} />
            <Info label="Mobile Number" value={profile.mobile_number} />
            <Info
              label="Alternate Contact Number"
              value={profile.alternate_contact_number}
            />
            <Info
              label="Emergency Contact Name"
              value={profile.emergency_contact_name}
            />
            <Info
              label="Emergency Contact Number"
              value={profile.emergency_contact_number}
            />
          </>,
        )}

        {renderSection(
          "business",
          "Business & Legal",
          <>
            <Info label="Business Name" value={profile.business_name} />
            <Info
              label="Authorized Person"
              value={profile.authorized_person_name}
            />
            <Info label="Digital Signature" value={profile.digital_signature} />
            <Info label="Signature Date" value={profile.signature_date} />
            <Info
              label="Registration License Number"
              value={profile.registration_license_number}
            />
            <Info
              label="Insurance Policy Number"
              value={profile.insurance_policy_number}
            />
            <Info
              label="Insurance Provider"
              value={profile.insurance_provider_name}
            />
            <Info
              label="Insurance Expiry Date"
              value={profile.insurance_expiry_date}
            />
          </>,
        )}

        {renderSection(
          "operations",
          "Vet & Operations",
          <>
            <Info label="Vet Clinic Name" value={profile.vet_clinic_name} />
            <Info label="Vet Clinic Address" value={profile.vet_clinic_address} />
            <Info label="Vet Clinic Contact" value={profile.vet_clinic_contact} />
            <Info label="Opening Time" value={profile.opening_time} />
            <Info label="Closing Time" value={profile.closing_time} />
            <Info
              label="Special Instructions"
              value={profile.special_instructions}
            />
          </>,
        )}

        {renderSection(
          "documents",
          "Documents",
          profile?.aadhar_file ? (
            <>
              <TouchableOpacity
                style={styles.documentBtn}
                onPress={() => openDocument(profile.aadhar_file)}
              >
                <Text style={styles.documentBtnText}>View Aadhaar Document</Text>
              </TouchableOpacity>
              <Text style={styles.documentHint}>File Type: PDF</Text>
            </>
          ) : (
            <Text style={styles.emptyText}>No Aadhaar document uploaded.</Text>
          ),
        )}

        {profile.profile_image
          ? renderSection(
              "image",
              "Profile Image",
              <Image source={{ uri: profile.profile_image }} style={styles.profileImage} />,
            )
          : null}

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate("UpdateBoardingProfile")}
        >
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const Info = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || "-"}</Text>
  </View>
);
