import React, { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import PremiumLoader from "../../../components/PremiumLoader";

import styles from "../styles/UpdateBoardingProfileStyles";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getOwnerProfile,
  updateOwnerProfile,
} from "../services/boardingOwnerService";
import { useRefresh } from "../../../context/RefreshContext";
import BackButton from "../../../components/BackButton";
import { boardingOwnerTheme } from "../../../styles/themeStyles";

export default function UpdateBoardingProfileScreen({ navigation }) {
  const { triggerRefresh } = useRefresh();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedSection, setExpandedSection] = useState("personal");
  const [documentFiles, setDocumentFiles] = useState({
    aadhar: null,
    license: null,
    insurance: null,
  });
  const [pickerConfig, setPickerConfig] = useState(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    alternate_contact_number: "",
    emergency_contact_name: "",
    emergency_contact_number: "",
    business_name: "",
    authorized_person_name: "",
    digital_signature: "",
    signature_date: "",
    vet_clinic_name: "",
    vet_clinic_address: "",
    vet_clinic_contact: "",
    opening_time: "",
    closing_time: "",
    special_instructions: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getOwnerProfile();
      const profile = response?.data || {};

      setForm({
        full_name: profile.full_name || "",
        email: profile.email || "",
        mobile_number: profile.mobile_number || "",
        alternate_contact_number: profile.alternate_contact_number || "",
        emergency_contact_name: profile.emergency_contact_name || "",
        emergency_contact_number: profile.emergency_contact_number || "",
        business_name: profile.business_name || "",
        authorized_person_name: profile.authorized_person_name || "",
        digital_signature: profile.digital_signature || "",
        signature_date: profile.signature_date || "",
        vet_clinic_name: profile.vet_clinic_name || "",
        vet_clinic_address: profile.vet_clinic_address || "",
        vet_clinic_contact: profile.vet_clinic_contact || "",
        opening_time: profile.opening_time || "",
        closing_time: profile.closing_time || "",
        special_instructions: profile.special_instructions || "",
      });
    } catch (error) {
      Alert.alert("Error", "Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? "" : section));
  };

  const pickDocument = async (fieldKey) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const asset = result.assets?.[0];
      if (asset) {
        setDocumentFiles((prev) => ({ ...prev, [fieldKey]: asset }));
      }
    } catch (error) {
      Alert.alert("Error", "Unable to pick document");
    }
  };

  const normalizeDocumentFile = (file) => {
    if (!file) return null;

    const uri = file.uri || file;
    if (!uri) return null;

    const name =
      file.name ||
      file.fileName ||
      file.filename ||
      `file.${(uri.split(".").pop() || "jpg").split(/[#?]/)[0]}`;

    const type =
      file.mimeType ||
      file.type ||
      (name.toLowerCase().endsWith(".pdf") ? "application/pdf" : "image/jpeg");

    return { uri, name, type };
  };

  const openPicker = (field, mode) => {
    setPickerConfig({ field, mode });
  };

  const getPickerValue = (value, mode) => {
    if (!value) return new Date();

    if (mode === "time") {
      const [hours = "0", minutes = "0"] = String(value).split(":");
      const date = new Date();
      date.setHours(Number(hours), Number(minutes), 0, 0);
      return date;
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  };

  const handlePickerChange = (event, selectedDate) => {
    if (event?.type === "dismissed") {
      setPickerConfig(null);
      return;
    }

    if (selectedDate && pickerConfig) {
      const formattedValue =
        pickerConfig.mode === "time"
          ? selectedDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : selectedDate.toISOString().split("T")[0];
      updateField(pickerConfig.field, formattedValue);
    }

    setPickerConfig(null);
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

  const goToProfileScreen = () => {
    try {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "BoardingOwner",
            params: {
              screen: "Main",
              params: {
                screen: "BoardingTabs",
                params: { screen: "Profile" },
              },
            },
          },
        ],
      });
    } catch (error) {
      navigation.navigate("BoardingOwner", {
        screen: "Main",
        params: {
          screen: "BoardingTabs",
          params: { screen: "Profile" },
        },
      });
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);

      const formData = new FormData();

      const appendValue = (key, value) => {
        if (value === undefined || value === null) return;
        formData.append(key, value);
      };

      Object.entries(form).forEach(([key, value]) => {
        appendValue(key, value ?? "");
      });

      const aadharFile = normalizeDocumentFile(documentFiles.aadhar);
      if (aadharFile) {
        formData.append("aadhar_file", aadharFile);
      }

      const licenseFile = normalizeDocumentFile(documentFiles.license);
      if (licenseFile) {
        formData.append("license_proof", licenseFile);
      }

      const insuranceFile = normalizeDocumentFile(documentFiles.insurance);
      if (insuranceFile) {
        formData.append("insurance_proof", insuranceFile);
      }

      formData.append("accepted_pet_types", JSON.stringify(["Dogs"]));
      formData.append("terms_accepted", "1");

      const response = await updateOwnerProfile(formData);

      if (response.status === "success") {
        triggerRefresh();
        goToProfileScreen();
        Alert.alert("Success", "Profile Updated Successfully");
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      Alert.alert("Error", "Update Failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: boardingOwnerTheme.background }} edges={["left","right","bottom"]}>
        <View style={styles.loader}>
          <PremiumLoader size={56} color={boardingOwnerTheme.primary} label="Loading profile" fullScreen />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }} edges={["left","right","bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 80 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16 }}>
            <BackButton
              fallbackRoute={"BoardingOwner"}
              fallbackParams={{ screen: "Main", params: { screen: "BoardingTabs", params: { screen: "Profile" } } }}
            />
            <Text style={styles.heading}>Update Boarding Profile</Text>
          </View>
          <Text style={styles.subHeading}>Tap a section to edit details.</Text>

          {renderSection(
            "personal",
            "Personal Details",
            <>
              <Input label="Full Name" value={form.full_name} onChangeText={(v) => updateField("full_name", v)} />
              <Input label="Email" value={form.email} onChangeText={(v) => updateField("email", v)} />
              <Input label="Mobile Number" value={form.mobile_number} onChangeText={(v) => updateField("mobile_number", v)} />
              <Input label="Alternate Contact Number" value={form.alternate_contact_number} onChangeText={(v) => updateField("alternate_contact_number", v)} />
              <Input label="Emergency Contact Name" value={form.emergency_contact_name} onChangeText={(v) => updateField("emergency_contact_name", v)} />
              <Input label="Emergency Contact Number" value={form.emergency_contact_number} onChangeText={(v) => updateField("emergency_contact_number", v)} />
            </>,
          )}

          {renderSection(
            "business",
            "Business & Legal",
            <>
              <Input label="Business Name" value={form.business_name} onChangeText={(v) => updateField("business_name", v)} />
              <Input label="Authorized Person" value={form.authorized_person_name} onChangeText={(v) => updateField("authorized_person_name", v)} />
              <Input label="Digital Signature" value={form.digital_signature} onChangeText={(v) => updateField("digital_signature", v)} />
              <Input label="Signature Date" value={form.signature_date} onChangeText={(v) => updateField("signature_date", v)} />
            </>,
          )}

          {renderSection(
            "documents",
            "Documents",
            <>
              <DocumentPickerRow
                label="Aadhaar Document"
                file={documentFiles.aadhar}
                onPress={() => pickDocument("aadhar")}
              />
              <DocumentPickerRow
                label="License Proof"
                file={documentFiles.license}
                onPress={() => pickDocument("license")}
              />
              <DocumentPickerRow
                label="Insurance Proof"
                file={documentFiles.insurance}
                onPress={() => pickDocument("insurance")}
              />
            </>,
          )}

          <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
            <Text style={styles.saveButtonText}>{saving ? "Updating..." : "Update Profile"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {pickerConfig ? (
        <DateTimePicker
          value={getPickerValue(form[pickerConfig.field], pickerConfig.mode)}
          mode={pickerConfig.mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handlePickerChange}
        />
      ) : null}
    </SafeAreaView>
  );
}

const Input = ({ label, value, onChangeText, multiline = false }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={[styles.input, multiline && styles.inputMultiline]} value={value} onChangeText={onChangeText} multiline={multiline} textAlignVertical={multiline ? "top" : "center"} />
  </View>
);

const DocumentPickerRow = ({ label, file, onPress }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.uploadButton} onPress={onPress} activeOpacity={0.9}>
      <Text style={styles.uploadButtonText}>{file?.name || "Pick document"}</Text>
    </TouchableOpacity>
    <Text style={styles.uploadHint}>PDF or image files are supported.</Text>
  </View>
);

const PickerRow = ({ label, value, onPress, placeholder }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.uploadButton} onPress={onPress} activeOpacity={0.9}>
      <Text style={styles.uploadButtonText}>{value || placeholder}</Text>
    </TouchableOpacity>
  </View>
);
