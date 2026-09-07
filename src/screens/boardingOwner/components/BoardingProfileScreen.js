import { appAlert } from "../../../utils/alert";
import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PremiumLoader from "../../../components/PremiumLoader";
import ProfileScreen from "../../ProfileScreen";
import styles from "../styles/BoardingProfileStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRefresh } from "../../../context/RefreshContext";
import { getOwnerProfile } from "../services/boardingOwnerService";
import { boardingOwnerTheme } from "../../../styles/themeStyles";

const palette = {
  primaryText: boardingOwnerTheme.text || "#24104F",
  secondary: boardingOwnerTheme.textMuted || "#716B91",
  purple: boardingOwnerTheme.primary || "#7B2CBF",
  card: boardingOwnerTheme.surface || "#FFFFFF",
  border: boardingOwnerTheme.border || "#F0E7F7",
  iconBackground: "#F8EEFF",
};

export default function BoardingProfileScreen({ navigation }) {
  const { refreshKey } = useRefresh();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState("");
  const [guestRole, setGuestRole] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await getOwnerProfile();

      if (response?.status === "success") {
        setProfile(response.data);
      }
    } catch (error) {
      appAlert.alert("Error", "Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      const storedGuestRole = await AsyncStorage.getItem("guestRole");
      setGuestRole(storedGuestRole);

      if (storedGuestRole) {
        setLoading(false);
        return;
      }

      fetchProfile();
    };

    loadProfile();

    const unsubscribe = navigation.addListener("focus", async () => {
      const storedGuestRole = await AsyncStorage.getItem("guestRole");
      if (!storedGuestRole) {
        fetchProfile();
      }
    });

    return unsubscribe;
  }, [navigation, refreshKey]);

  if (guestRole) {
    return <ProfileScreen navigation={navigation} />;
  }

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: boardingOwnerTheme.background }}
        edges={["left", "right", "bottom"]}
      >
        <View style={styles.loader}>
          <PremiumLoader
            size={56}
            color={boardingOwnerTheme.primary}
            label="Loading profile"
            fullScreen
          />
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#FDF9FF" }}
        edges={["left", "right", "bottom"]}
      >
        <View style={styles.loader}>
          <Text>Unable to load profile</Text>
        </View>
      </SafeAreaView>
    );
  }

  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? "" : section));
  };

  const isFieldFilled = (value) => {
    if (value === undefined || value === null) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object") return Object.keys(value).length > 0;
    return !!value;
  };

  const completionItems = [
    { key: "full_name", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "mobile_number", label: "Mobile Number" },
    { key: "alternate_contact_number", label: "Alternate Contact" },
    { key: "emergency_contact_name", label: "Emergency Contact Name" },
    { key: "emergency_contact_number", label: "Emergency Contact Number" },
    { key: "business_name", label: "Business Name" },
    { key: "authorized_person_name", label: "Authorized Person" },
    { key: "digital_signature", label: "Digital Signature" },
    { key: "signature_date", label: "Signature Date" },
    { key: "aadhar_file", label: "Aadhaar Document" },
  ];

  const completedCount = completionItems.filter((item) =>
    isFieldFilled(profile[item.key]),
  ).length;

  const completionPercent = Math.round(
    (completedCount / completionItems.length) * 100,
  );

  const missingItems = completionItems
    .filter((item) => !isFieldFilled(profile[item.key]))
    .map((item) => item.label);

  const renderSection = (sectionKey, title, icon, content) => {
    const isExpanded = expandedSection === sectionKey;

    return (
      <View
        style={[
          styles.card,
          { backgroundColor: palette.card, borderColor: palette.border },
        ]}
      >
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(sectionKey)}
          activeOpacity={0.9}
        >
          <View style={styles.sectionHeading}>
            <View style={styles.sectionIcon}>{icon}</View>
            <Text style={[styles.sectionTitle, { color: palette.primaryText }]}>
              {title}
            </Text>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color={palette.purple}
          />
        </TouchableOpacity>

        {isExpanded ? <View style={styles.sectionBody}>{content}</View> : null}
      </View>
    );
  };

  const openDocument = async (url) => {
    try {
      if (!url) {
        appAlert.alert("Error", "Document not found");
        return;
      }

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        appAlert.alert(
          "Unable to Open",
          "No application found to open this document.",
        );
      }
    } catch (error) {
      appAlert.alert("Error", "Failed to open document");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHero}>
          <View style={styles.avatarArea}>
            <Image
              source={
                profile.profile_image
                  ? { uri: profile.profile_image }
                  : require("../../../../assets/ProfileIcon.png")
              }
              style={styles.avatar}
            />
          </View>

          <View style={styles.profileIdentity}>
            <View style={styles.roleBadge}>
              <Ionicons name="checkmark" size={15} color="#6A1B9A" />
              <Text style={styles.roleText}>Verified User</Text>
            </View>
            <Text
              style={[styles.name, { color: palette.primaryText }]}
              numberOfLines={2}
            >
              {profile?.full_name || "Boarding Owner"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileOptionsButton}
            onPress={() => navigation.navigate("UpdateBoardingProfile")}
            activeOpacity={0.8}
            accessibilityLabel="Edit profile"
          >
            <Ionicons name="options-outline" size={24} color={palette.purple} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View
            style={[
              styles.progressCard,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <View style={styles.progressHeader}>
              <View style={styles.progressTitleRow}>
                <View style={styles.progressIcon}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={18}
                    color={palette.purple}
                  />
                </View>
                <Text
                  style={[styles.progressTitle, { color: palette.primaryText }]}
                >
                  Profile completion
                </Text>
              </View>
              <Text style={[styles.progressPercent, { color: palette.purple }]}>
                {completionPercent}%
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${completionPercent}%` },
                ]}
              />
            </View>
            <Text style={[styles.progressHint, { color: palette.secondary }]}>
              {completionPercent === 100
                ? "Your boarding profile is complete."
                : `Complete ${missingItems.length} more item${missingItems.length === 1 ? "" : "s"} to unlock more bookings.`}
            </Text>
          </View>

          {renderSection(
            "personal",
            "Personal Details",
            <Ionicons name="person-outline" size={18} color={palette.purple} />,
            <>
              <Info
                icon="person-outline"
                label="Full Name"
                value={profile.full_name}
              />
              <Info icon="mail-outline" label="Email" value={profile.email} />
              <Info
                icon="call-outline"
                label="Mobile Number"
                value={profile.mobile_number}
              />
              <Info
                icon="phone-portrait-outline"
                label="Alternate Contact Number"
                value={profile.alternate_contact_number}
              />
              <Info
                icon="person-add-outline"
                label="Emergency Contact Name"
                value={profile.emergency_contact_name}
              />
              <Info
                icon="alert-circle-outline"
                label="Emergency Contact Number"
                value={profile.emergency_contact_number}
              />
            </>,
          )}

          {renderSection(
            "business",
            "Business & Legal",
            <MaterialCommunityIcons
              name="briefcase-outline"
              size={18}
              color={palette.purple}
            />,
            <>
              <Info
                icon="business-outline"
                label="Business Name"
                value={profile.business_name}
              />
              <Info
                icon="person-outline"
                label="Authorized Person"
                value={profile.authorized_person_name}
              />
              <Info
                icon="create-outline"
                label="Digital Signature"
                value={profile.digital_signature}
              />
              <Info
                icon="calendar-outline"
                label="Signature Date"
                value={profile.signature_date}
              />
            </>,
          )}

          {renderSection(
            "documents",
            "Documents",
            <MaterialCommunityIcons
              name="file-document-outline"
              size={18}
              color={palette.purple}
            />,
            profile?.aadhar_file ? (
              <View style={styles.documentCard}>
                <View style={styles.documentHeader}>
                  <View style={styles.documentIcon}>
                    <MaterialCommunityIcons
                      name="file-pdf-box"
                      size={32}
                      color={palette.purple}
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
                        styles.documentHint,
                        { color: palette.secondary },
                      ]}
                    >
                      Identity document uploaded
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.documentBtn}
                  onPress={() => openDocument(profile.aadhar_file)}
                  activeOpacity={0.85}
                >
                  <Ionicons name="eye-outline" size={17} color="#FFFFFF" />
                  <Text style={styles.documentBtnText}>
                    View Aadhaar Document
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.emptyDocument}>
                <MaterialCommunityIcons
                  name="file-alert-outline"
                  size={22}
                  color={palette.secondary}
                />
                <Text style={[styles.emptyText, { color: palette.secondary }]}>
                  No Aadhaar document uploaded.
                </Text>
              </View>
            ),
          )}

          {profile.profile_image
            ? renderSection(
                "image",
                "Profile Image",
                <Ionicons
                  name="image-outline"
                  size={18}
                  color={palette.purple}
                />,
                <Image
                  source={{ uri: profile.profile_image }}
                  style={styles.profileImage}
                />,
              )
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Info = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIcon}>
      <Ionicons name={icon} size={17} color={palette.purple} />
    </View>
    <View style={styles.infoCopy}>
      <Text style={[styles.label, { color: palette.secondary }]}>{label}</Text>
      <Text style={[styles.value, { color: palette.primaryText }]}>
        {value || "-"}
      </Text>
    </View>
  </View>
);
