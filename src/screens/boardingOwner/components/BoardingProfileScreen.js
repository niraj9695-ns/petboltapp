import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/BoardingProfileStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loader}>
        <Text>Unable to load profile</Text>
      </View>
    );
  }

  const centers = profile?.centers || [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {profile?.full_name?.charAt(0) || "B"}
          </Text>
        </View>

        <Text style={styles.name}>
          {profile?.full_name || "Boarding Owner"}
        </Text>

        <Text style={styles.email}>{profile?.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Business Information</Text>

        <Info label="Business Name" value={profile.business_name} />

        <Info
          label="Authorized Person"
          value={profile.authorized_person_name}
        />

        <Info label="Mobile Number" value={profile.mobile_number} />

        <Info
          label="Emergency Contact"
          value={profile.emergency_contact_number}
        />
      </View>

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
  );
}

const Info = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || "-"}</Text>
  </View>
);
