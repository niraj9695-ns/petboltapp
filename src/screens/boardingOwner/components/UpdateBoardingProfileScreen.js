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

export default function UpdateBoardingProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    emergency_contact_name: "",
    emergency_contact_number: "",
    business_name: "",
    authorized_person_name: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getOwnerProfile();

      const profile = response?.data || {};

      const center = profile?.centers?.[0] || {};

      setForm({
        full_name: profile.full_name || "",

        email: profile.email || "",

        mobile_number: profile.mobile_number || "",

        emergency_contact_name: profile.emergency_contact_name || "",

        emergency_contact_number: profile.emergency_contact_number || "",

        business_name: profile.business_name || "",

        authorized_person_name: profile.authorized_person_name || "",
      });
    } catch (error) {
      console.log(error);

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
      console.log(error);

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

          <View style={styles.card}>
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
              label="Emergency Contact Name"
              value={form.emergency_contact_name}
              onChangeText={(v) => updateField("emergency_contact_name", v)}
            />

            <Input
              label="Emergency Contact Number"
              value={form.emergency_contact_number}
              onChangeText={(v) => updateField("emergency_contact_number", v)}
            />

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
          </View>

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

const Input = ({ label, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>

    <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
  </View>
);
