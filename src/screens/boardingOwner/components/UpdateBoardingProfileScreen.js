import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import styles from "../styles/UpdateBoardingProfileStyles";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getOwnerProfile,
  updateOwnerProfile,
} from "../services/boardingOwnerService";
import { useRefresh } from "../../../context/RefreshContext";

export default function UpdateBoardingProfileScreen({ navigation }) {
  const { triggerRefresh } = useRefresh();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedSection, setExpandedSection] = useState("personal");

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
    registration_license_number: "",
    insurance_policy_number: "",
    insurance_provider_name: "",
    insurance_expiry_date: "",
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
        registration_license_number: profile.registration_license_number || "",
        insurance_policy_number: profile.insurance_policy_number || "",
        insurance_provider_name: profile.insurance_provider_name || "",
        insurance_expiry_date: profile.insurance_expiry_date || "",
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

  const handleUpdate = async () => {
    try {
      setSaving(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append("accepted_pet_types", JSON.stringify(["Dogs"]));
      formData.append("terms_accepted", "1");

      const response = await updateOwnerProfile(formData);

      if (response.status === "success") {
        triggerRefresh();
        Alert.alert("Success", "Profile Updated Successfully", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#6b21a8" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
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
          <Text style={styles.heading}>Update Boarding Profile</Text>
          <Text style={styles.subHeading}>Tap a section to edit details.</Text>

          {renderSection(
            "personal",
            "Personal Details",
            <>
              <Input
                label="Full Name"
                value={form.full_name}
                onChangeText={(v) => updateField("full_name", v)}
              />
              <Input
                label="Email"
                value={form.email}
                onChangeText={(v) => updateField("email", v)}
              />
              <Input
                label="Mobile Number"
                value={form.mobile_number}
                onChangeText={(v) => updateField("mobile_number", v)}
              />
              <Input
                label="Alternate Contact Number"
                value={form.alternate_contact_number}
                onChangeText={(v) => updateField("alternate_contact_number", v)}
              />
              <Input
                label="Emergency Contact Name"
                value={form.emergency_contact_name}
                onChangeText={(v) => updateField("emergency_contact_name", v)}
              />
              <Input
                label="Emergency Contact Number"
                value={form.emergency_contact_number}
                onChangeText={(v) => updateField("emergency_contact_number", v)}
              />
            </>,
          )}

          {renderSection(
            "business",
            "Business & Legal",
            <>
              <Input
                label="Business Name"
                value={form.business_name}
                onChangeText={(v) => updateField("business_name", v)}
              />
              <Input
                label="Authorized Person"
                value={form.authorized_person_name}
                onChangeText={(v) => updateField("authorized_person_name", v)}
              />
              <Input
                label="Digital Signature"
                value={form.digital_signature}
                onChangeText={(v) => updateField("digital_signature", v)}
              />
              <Input
                label="Signature Date"
                value={form.signature_date}
                onChangeText={(v) => updateField("signature_date", v)}
              />
              <Input
                label="Registration License Number"
                value={form.registration_license_number}
                onChangeText={(v) =>
                  updateField("registration_license_number", v)
                }
              />
              <Input
                label="Insurance Policy Number"
                value={form.insurance_policy_number}
                onChangeText={(v) => updateField("insurance_policy_number", v)}
              />
              <Input
                label="Insurance Provider"
                value={form.insurance_provider_name}
                onChangeText={(v) => updateField("insurance_provider_name", v)}
              />
              <Input
                label="Insurance Expiry Date"
                value={form.insurance_expiry_date}
                onChangeText={(v) => updateField("insurance_expiry_date", v)}
              />
            </>,
          )}

          {renderSection(
            "operations",
            "Vet & Operations",
            <>
              <Input
                label="Vet Clinic Name"
                value={form.vet_clinic_name}
                onChangeText={(v) => updateField("vet_clinic_name", v)}
              />
              <Input
                label="Vet Clinic Address"
                value={form.vet_clinic_address}
                onChangeText={(v) => updateField("vet_clinic_address", v)}
              />
              <Input
                label="Vet Clinic Contact"
                value={form.vet_clinic_contact}
                onChangeText={(v) => updateField("vet_clinic_contact", v)}
              />
              <Input
                label="Opening Time"
                value={form.opening_time}
                onChangeText={(v) => updateField("opening_time", v)}
              />
              <Input
                label="Closing Time"
                value={form.closing_time}
                onChangeText={(v) => updateField("closing_time", v)}
              />
              <Input
                label="Special Instructions"
                value={form.special_instructions}
                onChangeText={(v) => updateField("special_instructions", v)}
                multiline
              />
            </>,
          )}

          <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
            <Text style={styles.saveButtonText}>
              {saving ? "Updating..." : "Update Profile"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Input = ({ label, value, onChangeText, multiline = false }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.inputMultiline]}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      textAlignVertical={multiline ? "top" : "center"}
    />
  </View>
);
