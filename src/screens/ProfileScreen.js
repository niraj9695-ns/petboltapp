import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const API_URL = "https://www.cgpisoftware.com/cheerytail";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const guestRole = await AsyncStorage.getItem("guestRole");

      // GUEST USER
      if (!token) {
        if (guestRole) {
          setIsGuest(true);
        }

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

      if (response.ok && result.status === "success") {
        const details = result.data.owner_details || {};

        setUser({
          id: result.data.id,
          role: result.data.role,
          email_verified: result.data.email_verified,

          full_name: details.full_name || "",
          email: details.email || "",
          phone: details.mobile_number || "",
          alternate_phone: details.alternate_contact_number || "",

          address: details.residential_address || "",

          emergency_name: details.emergency_contact_name || "",

          emergency_number: details.emergency_contact_number || "",

          aadhar_file: details.aadhar_file || "",

          created_at: result.data.created_at || "",

          updated_at: result.data.updated_at || "",
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }
  if (isGuest) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=12",
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 20,
          }}
        />

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Guest User
        </Text>

        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            color: "#666",
          }}
        >
          Sign in or create an account to view your profile, pets, bookings and
          other personal information.
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#6b21a8",
            paddingHorizontal: 30,
            paddingVertical: 14,
            borderRadius: 12,
            marginTop: 25,
          }}
          onPress={async () => {
            await AsyncStorage.removeItem("guestRole");
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Sign In / Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
      <LinearGradient
        colors={["#fff1e6", "#ffe4f0", "#f3e8ff"]}
        style={styles.container}
      >
        {/* Profile Image */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=12",
            }}
            style={styles.avatar}
          />
        </View>

        {/* Verification Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {user?.email_verified
              ? "⭐ Verified User"
              : "⚠️ Email Not Verified"}
          </Text>
        </View>

        {/* Name */}
        <Text style={styles.name}>{user?.full_name || "User"}</Text>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email}</Text>

          <Text style={styles.label}>Mobile Number</Text>
          <Text style={styles.value}>{user?.phone}</Text>

          <Text style={styles.label}>Alternate Contact Number</Text>
          <Text style={styles.value}>{user?.alternate_phone}</Text>

          <Text style={styles.label}>Residential Address</Text>
          <Text style={styles.value}>{user?.address}</Text>

          <Text style={styles.label}>Emergency Contact Name</Text>
          <Text style={styles.value}>{user?.emergency_name}</Text>

          <Text style={styles.label}>Emergency Contact Number</Text>
          <Text style={styles.value}>{user?.emergency_number}</Text>

          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>{user?.role}</Text>

          <Text style={styles.label}>Email Verification</Text>
          <Text style={styles.value}>
            {user?.email_verified ? "Verified ✅" : "Not Verified ❌"}
          </Text>

          <Text style={styles.label}>Account Created</Text>
          <Text style={styles.value}>{user?.created_at}</Text>

          <Text style={styles.label}>Last Updated</Text>
          <Text style={styles.value}>{user?.updated_at}</Text>
        </View>

        {user?.aadhar_file ? (
          <>
            <Text style={styles.docTitle}>Aadhaar Document</Text>

            <Image
              source={{
                uri: user.aadhar_file,
              }}
              style={styles.aadharImage}
              resizeMode="cover"
            />
          </>
        ) : null}
        {/* Description */}
        <Text style={styles.desc}>
          Manage your pets, bookings, and preferences in one place.
        </Text>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.navigate("Pets")}
          >
            <Text style={styles.secondaryBtnText}>My Pets</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    margin: 15,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  avatarWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
  },

  badge: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 50,
    marginBottom: 10,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },

  subText: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
  },

  roleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#f97316",
    marginTop: 12,
  },

  address: {
    marginTop: 12,
    textAlign: "center",
    color: "#555",
    fontSize: 14,
    lineHeight: 22,
  },

  desc: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  btnRow: {
    width: "100%",
    gap: 12,
  },

  primaryBtn: {
    backgroundColor: "#f97316",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  secondaryBtn: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  secondaryBtnText: {
    color: "#6b21a8",
    fontWeight: "bold",
    fontSize: 15,
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
  },

  label: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
    marginTop: 10,
  },

  value: {
    fontSize: 15,
    color: "#222",
    marginTop: 4,
  },

  docTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  aadharImage: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 20,
  },
});
