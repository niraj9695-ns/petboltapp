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
import { LinearGradient } from "expo-linear-gradient";
import profileStyles from "../styles/ProfileScreenStyles";

const API_URL = "https://www.cgpisoftware.com/cheerytail";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const { width } = useWindowDimensions();

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
      style={styles.wrapper}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
      <LinearGradient
        colors={["#fff1e6", "#ffe4f0", "#f3e8ff"]}
        style={[
          styles.container,
          {
            maxWidth: isTablet ? 700 : "100%",
            alignSelf: "center",
            width: "100%",
          },
        ]}
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

            {currentAadharIsPdf ? (
              <TouchableOpacity
                style={styles.fileAction}
                onPress={() => Linking.openURL(user.aadhar_file)}
              >
                <Text style={styles.fileActionText}>View Aadhaar PDF</Text>
              </TouchableOpacity>
            ) : (
              <Image
                source={{
                  uri: user.aadhar_file,
                }}
                style={styles.aadharImage}
                resizeMode="cover"
              />
            )}
          </>
        ) : null}
        {/* Description */}
        <Text style={styles.desc}>
          Manage your pets, bookings, and preferences in one place.
        </Text>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.primaryBtn} onPress={startEditing}>
            <Text style={styles.primaryBtnText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
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

const styles = profileStyles;
