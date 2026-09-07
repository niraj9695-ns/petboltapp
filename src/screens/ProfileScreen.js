import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import PremiumLoader from "../components/PremiumLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/ProfileScreenStyles";
import { useTheme } from "../context/ThemeContext";

const API_URL = "https://www.cgpisoftware.com/cheerytail";

function InfoRow({ icon, label, value, colors, last }) {
  if (!value) return null;
  return (
    <View style={[styles.infoRow, !last && styles.infoRowDivider]}>
      <View
        style={[styles.infoIcon, { backgroundColor: colors.iconBackground }]}
      >
        {icon}
      </View>
      <View style={styles.infoCopy}>
        <Text style={[styles.label, { color: colors.secondary }]}>{label}</Text>
        <Text style={[styles.value, { color: colors.primaryText }]}>
          {value}
        </Text>
      </View>
    </View>
  );
}

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  const isTablet = width >= 768;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const guestRole = await AsyncStorage.getItem("guestRole");

      if (!token) {
        if (guestRole) setIsGuest(true);
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

  const startEditing = () => navigation.navigate("ProfileEdit");

  const handleSignIn = async () => {
    await AsyncStorage.removeItem("guestRole");
    setIsGuest(false);
    navigation.navigate("Auth");
  };

  const openMenu = () => navigation.openDrawer?.();
  const openNotifications = () => navigation.navigate("NotificationView");

  if (loading) {
    return (
      <View
        style={[styles.loaderContainer, { backgroundColor: theme.background }]}
      >
        <PremiumLoader
          size={56}
          color={theme.primary}
          label="Loading profile"
          fullScreen
        />
      </View>
    );
  }

  const palette = {
    primaryText: theme.textPrimary || "#24104F",
    secondary: theme.textSecondary || "#716B91",
    purple: theme.primary || "#7B2CBF",
    card: theme.cardBackground || "#FFFFFF",
    border: theme.border || "#F0E7F7",
    iconBackground: "#F8EEFF",
  };

  if (isGuest) {
    return (
      <LinearGradient
        colors={["#FDF9FF", "#FDF9FF"]}
        style={styles.guestContainer}
      >
        <View style={styles.guestDecor}>
          <MaterialCommunityIcons name="paw" size={76} color="#E9C8F4" />
        </View>
        <Image
          source={require("../../assets/GuestIcon.png")}
          style={styles.guestAvatar}
        />
        <View style={styles.guestBadge}>
          <Ionicons name="person-outline" size={16} color="#7B2CBF" />
          <Text style={styles.guestBadgeText}>Guest mode</Text>
        </View>
        <Text style={styles.guestTitle}>Guest User</Text>
        <Text style={styles.guestText}>
          Sign in or create an account to view your profile and other personal
          information.
        </Text>
        <TouchableOpacity
          onPress={handleSignIn}
          activeOpacity={0.85}
          style={styles.guestButtonWrap}
        >
          <LinearGradient
            colors={["#6A1B9A", "#8E3CC7"]}
            style={styles.guestButton}
          >
            <Ionicons name="log-in-outline" size={22} color="#FFFFFF" />
            <Text style={styles.guestButtonText}>Sign In / Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  const currentAadharIsPdf = user?.aadhar_file?.toLowerCase().endsWith(".pdf");
  const alternatePhone = String(user?.alternate_phone ?? "").trim();
  const infoRows = [
    {
      label: "Email",
      value: user?.email,
      icon: <Ionicons name="mail-outline" size={16} color={palette.purple} />,
    },
    {
      label: "Mobile Number",
      value: user?.phone,
      icon: <Ionicons name="call-outline" size={16} color={palette.purple} />,
    },
    ...(alternatePhone
      ? [
          {
            label: "Alternate Contact Number",
            value: alternatePhone,
            icon: (
              <Ionicons
                name="phone-portrait-outline"
                size={16}
                color={palette.purple}
              />
            ),
          },
        ]
      : []),
    {
      label: "Residential Address",
      value: user?.address,
      icon: (
        <Ionicons name="location-outline" size={16} color={palette.purple} />
      ),
    },
    {
      label: "Emergency Contact Name",
      value: user?.emergency_name,
      icon: <Ionicons name="person-outline" size={16} color={palette.purple} />,
    },
    {
      label: "Emergency Contact Number",
      value: user?.emergency_number,
      icon: (
        <MaterialCommunityIcons
          name="phone-alert-outline"
          size={16}
          color={palette.purple}
        />
      ),
    },
  ].filter((item) => item.value);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[styles.profileHero, isTablet && styles.profileHeroTablet]}
        >
          <View style={styles.avatarArea}>
            <Image
              source={require("../../assets/ProfileIcon.png")}
              style={styles.avatar}
            />
          </View>
          <View style={styles.profileIdentity}>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={15} color="#6A1B9A" />
              <Text style={styles.verifiedText}>
                {user?.email_verified ? "Verified User" : "Email Not Verified"}
              </Text>
            </View>
            <Text
              style={[styles.name, { color: palette.primaryText }]}
              numberOfLines={2}
            >
              {user?.full_name || "User"}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.profileOptionsButton}
            onPress={startEditing}
            activeOpacity={0.8}
            accessibilityLabel="Edit profile"
          >
            <Ionicons name="options-outline" size={24} color="#6b21a8" />
          </TouchableOpacity>
        </View>

        <View style={[styles.content, isTablet && styles.contentTablet]}>
          <View
            style={[
              styles.infoCard,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            {infoRows.map((item, index) => (
              <InfoRow
                key={item.label}
                {...item}
                colors={palette}
                last={index === infoRows.length - 1}
              />
            ))}
          </View>

          {!!user?.aadhar_file && (
            <View
              style={[
                styles.documentCard,
                { backgroundColor: palette.card, borderColor: palette.border },
              ]}
            >
              <View style={styles.documentHeader}>
                <View style={styles.pdfIcon}>
                  <MaterialCommunityIcons
                    name={
                      currentAadharIsPdf
                        ? "file-pdf-box"
                        : "file-document-outline"
                    }
                    size={33}
                    color="#7B2CBF"
                  />
                </View>
                <View style={styles.documentCopy}>
                  <Text
                    style={[
                      styles.documentTitle,
                      { color: palette.primaryText },
                    ]}
                  >
                    Aadhaar Document
                  </Text>
                  <Text
                    style={[
                      styles.documentSubTitle,
                      { color: palette.secondary },
                    ]}
                  >
                    Identity document uploaded
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => Linking.openURL(user.aadhar_file)}
                activeOpacity={0.85}
                style={styles.viewDocumentBtn}
              >
                <Ionicons name="eye-outline" size={16} color="#6A1B9A" />
                <Text style={styles.viewDocumentText}>View Aadhaar</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.petsCard,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
            onPress={() => navigation.navigate("Pets", { screen: "PetList" })}
            activeOpacity={0.82}
          >
            <View style={styles.petsIcon}>
              <MaterialCommunityIcons name="paw" size={25} color="#7B2CBF" />
            </View>

            <Text
              style={[styles.descriptionText, { color: palette.secondary }]}
            >
              Manage your pets, bookings, and preferences in one place.
            </Text>

            <Ionicons name="chevron-forward" size={25} color="#7B2CBF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
