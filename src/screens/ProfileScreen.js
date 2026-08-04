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
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/ProfileScreenStyles";
import { useTheme } from "../context/ThemeContext";

const API_URL = "https://www.cgpisoftware.com/cheerytail";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const { width } = useWindowDimensions();
  const { theme, isDark } = useTheme();

  const isTablet = width >= 768;
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const guestRole = await AsyncStorage.getItem("guestRole");

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

      const data = result?.data || result;
      const details =
        data?.owner_details || data?.owner || result?.owner || data || {};

      const statusSuccess =
        result?.status === "success" ||
        result?.status === true ||
        result?.status === 1 ||
        result?.status === "1" ||
        (!result?.status && !!data);

      if (response.ok && statusSuccess) {
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

          created_at: data?.created_at || result?.created_at || "",

          updated_at: data?.updated_at || result?.updated_at || "",
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const startEditing = () => {
    navigation.navigate("ProfileEdit");
  };

  const handleSignIn = async () => {
    await AsyncStorage.removeItem("guestRole");
    setIsGuest(false);
    navigation.navigate("Auth");
  };

  if (loading) {
    return (
      <View style={[styles.loaderContainer, { backgroundColor: theme.background }]}> 
        <PremiumLoader
          size={56}
          color={theme.primary}
          label="Loading profile"
          fullScreen
        />
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
          backgroundColor: theme.background,
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
            color: theme.textPrimary,
          }}
        >
          Guest User
        </Text>

        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            color: theme.textSecondary,
          }}
        >
          Sign in or create an account to view your profile, pets, bookings and
          other personal information.
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: theme.primary,
            paddingHorizontal: 30,
            paddingVertical: 14,
            borderRadius: 12,
            marginTop: 25,
          }}
          onPress={handleSignIn}
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

  const currentAadharIsPdf = user?.aadhar_file?.toLowerCase().endsWith(".pdf");

  return (
    <ScrollView
      style={[styles.wrapper, { backgroundColor: theme.background }]}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
      <LinearGradient
        colors={
          isDark
            ? [theme.background, theme.cardBackground, theme.surfaceAlt]
            : ["#fff1e6", "#ffe4f0", "#f3e8ff"]
        }
        style={[
          styles.container,
          {
            maxWidth: isTablet ? 700 : "100%",
            alignSelf: "center",
            width: "100%",
            backgroundColor: theme.cardBackground,
          },
        ]}
      >
        {/* Verification Badge */}
        <View style={[styles.badge, { backgroundColor: theme.cardBackground }]}> 
          <Text style={[styles.badgeText, { color: theme.textSecondary }]}> 
            {user?.email_verified
              ? "⭐ Verified User"
              : "⚠️ Email Not Verified"}
          </Text>
        </View>

        {/* Name */}
        <Text style={[styles.name, { color: theme.textPrimary }]}>{user?.full_name || "User"}</Text>

        <View style={[styles.infoCard, { backgroundColor: theme.cardBackground, borderColor: theme.border, borderWidth: 1 }]}> 
          <Text style={[styles.label, { color: theme.textSecondary }]}>Email</Text>
          <Text style={[styles.value, { color: theme.textPrimary }]}>{user?.email}</Text>

          <Text style={[styles.label, { color: theme.textSecondary }]}>Mobile Number</Text>
          <Text style={[styles.value, { color: theme.textPrimary }]}>{user?.phone}</Text>

          <Text style={[styles.label, { color: theme.textSecondary }]}>Alternate Contact Number</Text>
          <Text style={[styles.value, { color: theme.textPrimary }]}>{user?.alternate_phone}</Text>

          <Text style={[styles.label, { color: theme.textSecondary }]}>Residential Address</Text>
          <Text style={[styles.value, { color: theme.textPrimary }]}>{user?.address}</Text>

          <Text style={[styles.label, { color: theme.textSecondary }]}>Emergency Contact Name</Text>
          <Text style={[styles.value, { color: theme.textPrimary }]}>{user?.emergency_name}</Text>

          <Text style={[styles.label, { color: theme.textSecondary }]}>Emergency Contact Number</Text>
          <Text style={[styles.value, { color: theme.textPrimary }]}>{user?.emergency_number}</Text>

          <Text style={[styles.label, { color: theme.textSecondary }]}>Email Verification</Text>
          <Text style={[styles.value, { color: theme.textPrimary }]}> 
            {user?.email_verified ? "Verified ✅" : "Not Verified ❌"}
          </Text>
        </View>

        {user?.aadhar_file ? (
          <View style={[styles.documentCard, { backgroundColor: theme.cardBackground, borderColor: theme.border, borderWidth: 1 }]}> 
            <View style={styles.documentInfo}>
              <Text style={styles.documentIcon}>🪪</Text>

              <View style={{ flex: 1 }}>
                <Text style={[styles.documentTitle, { color: theme.textPrimary }]}>Aadhaar Document</Text>
                <Text style={[styles.documentSubTitle, { color: theme.textSecondary }]}> 
                  Identity document uploaded
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.viewDocumentBtn, { backgroundColor: theme.primary }]}
              onPress={() => Linking.openURL(user.aadhar_file)}
            >
              <Text style={styles.viewDocumentText}>View Aadhaar</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {/* Description */}
        <Text style={[styles.desc, { color: theme.textSecondary }]}> 
          Manage your pets, bookings, and preferences in one place.
        </Text>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: theme.primary }]} onPress={startEditing}>
            <Text style={styles.primaryBtnText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.secondaryBtn,
              { backgroundColor: theme.cardBackground, borderColor: theme.border },
            ]}
            onPress={() =>
              navigation.navigate("Pets", {
                screen: "PetList",
              })
            }
          >
            <Text style={styles.secondaryBtnText}>My Pets</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
