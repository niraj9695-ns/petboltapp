import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import PremiumLoader from "../../../components/PremiumLoader";
import styles from "../styles/BoardingProfileStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRefresh } from "../../../context/RefreshContext";
import { getOwnerProfile } from "../services/boardingOwnerService";
import { boardingOwnerTheme } from "../../../styles/themeStyles";

export default function BoardingProfileScreen({ navigation }) {
  const { refreshKey } = useRefresh();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await getOwnerProfile();

      if (response?.status === "success") {
        setProfile(response.data);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to load profile");
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
  }, [navigation, refreshKey]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: boardingOwnerTheme.background }} edges={["left","right","bottom"]}>
        <View style={styles.loader}>
          <PremiumLoader size={56} color={boardingOwnerTheme.primary} label="Loading profile" fullScreen />
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }} edges={["left","right","bottom"]}>
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
      Alert.alert("Error", "Failed to open document");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }} edges={["left","right","bottom"]}>
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

          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Profile completion</Text>
              <Text style={styles.progressPercent}>{completionPercent}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${completionPercent}%` },
                ]}
              />
            </View>
            <Text style={styles.progressHint}>
              {completionPercent === 100
                ? "Your boarding profile is complete."
                : `Complete ${missingItems.length} more item${
                    missingItems.length === 1 ? "" : "s"
                  } to unlock more bookings.`}
            </Text>
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
                <Text style={styles.documentBtnText}>
                  View Aadhaar Document
                </Text>
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
              <Image
                source={{ uri: profile.profile_image }}
                style={styles.profileImage}
              />,
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
