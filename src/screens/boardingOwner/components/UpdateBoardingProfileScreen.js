import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import styles from "../styles/UpdateBoardingProfileStyles";

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
    residential_address: "",
    city: "",
    state: "",
    pin_code: "",
    property_type: "",
    fencing_status: "",
    supervision_level: "",
    total_capacity: "",
    vaccination_policy: "",
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

        residential_address: profile.current_address || "",

        city: center.city || "",

        state: center.state || "",

        pin_code: center.zip_code || "",

        property_type: center.property_type || "",

        fencing_status: center.fencing_status || "",

        supervision_level: center.supervision_level || "",

        total_capacity: center.total_capacity || "",

        vaccination_policy: center.vaccination_policy || "",
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
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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

        <Input
          label="Address"
          value={form.residential_address}
          onChangeText={(v) => updateField("residential_address", v)}
        />

        <Input
          label="City"
          value={form.city}
          onChangeText={(v) => updateField("city", v)}
        />

        <Input
          label="State"
          value={form.state}
          onChangeText={(v) => updateField("state", v)}
        />

        <Input
          label="Pin Code"
          value={form.pin_code}
          onChangeText={(v) => updateField("pin_code", v)}
        />

        <Input
          label="Property Type"
          value={form.property_type}
          onChangeText={(v) => updateField("property_type", v)}
        />

        <Input
          label="Fencing Status"
          value={form.fencing_status}
          onChangeText={(v) => updateField("fencing_status", v)}
        />

        <Input
          label="Supervision Level"
          value={form.supervision_level}
          onChangeText={(v) => updateField("supervision_level", v)}
        />

        <Input
          label="Total Capacity"
          value={form.total_capacity}
          onChangeText={(v) => updateField("total_capacity", v)}
        />

        <Input
          label="Vaccination Policy"
          value={form.vaccination_policy}
          onChangeText={(v) => updateField("vaccination_policy", v)}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveButtonText}>
          {saving ? "Updating..." : "Update Profile"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const Input = ({ label, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>

    <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
  </View>
);
