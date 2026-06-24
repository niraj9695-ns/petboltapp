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

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      console.log("TOKEN =>", token);

      if (!token) {
        console.log("Token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/owner/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      console.log("PROFILE RESPONSE =>", response.data);

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

  const centers = profile?.centers || [];

  const openDocument = async (url) => {
    try {
      if (!url) {
        Alert.alert("Error", "Document not found");
        return;
      }

      console.log("Opening Document:", url);

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

          <Text style={styles.name}>
            {profile?.full_name || "Boarding Owner"}
          </Text>

          <Text style={styles.email}>{profile?.email}</Text>

          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>BOARDING OWNER</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Profile Information</Text>

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

          <Info label="Residential Address" value={profile.residential_address} />

          <Info label="Business Name" value={profile.business_name} />

          <Info
            label="Authorized Person Name"
            value={profile.authorized_person_name}
          />

          <Info label="Digital Signature" value={profile.digital_signature} />

          <Info label="Signature Date" value={profile.signature_date} />

          <Info label="Role" value={profile.role} />

          <Info
            label="Email Verified"
            value={profile.email_verified === "1" ? "Yes" : "No"}
          />

          <Info
            label="Phone Verified"
            value={profile.phone_verified === "1" ? "Yes" : "No"}
          />

          <Info
            label="Terms Accepted"
            value={profile.terms_accepted === "1" ? "Yes" : "No"}
          />

          <Info label="Created At" value={profile.created_at} />

          <Info label="Updated At" value={profile.updated_at} />
        </View>

        {/* Aadhaar File */}
        {profile?.aadhar_file ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Documents</Text>

            <TouchableOpacity
              style={styles.documentBtn}
              onPress={() => openDocument(profile.aadhar_file)}
            >
              <Text style={styles.documentBtnText}>View Aadhaar Document</Text>
            </TouchableOpacity>

            <Text
              style={{
                marginTop: 10,
                color: "#6b7280",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              File Type: PDF
            </Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Documents</Text>
            <Text>No Aadhaar document uploaded.</Text>
          </View>
        )}

        {/* Profile Image */}
        {profile.profile_image ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Profile Image</Text>

            <Image
              source={{ uri: profile.profile_image }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                alignSelf: "center",
              }}
            />
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.myCentersBtn}
          onPress={() => navigation.navigate("Centers")}
        >
          <Text style={styles.myCentersText}>My Centers</Text>
        </TouchableOpacity>

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
