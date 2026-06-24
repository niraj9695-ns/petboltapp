import React, { useState } from "react";
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
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { createCenter } from "../services/boardingOwnerService";

export default function CreateCenterScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [centerImages, setCenterImages] = useState([]);
  const [licenseFile, setLicenseFile] = useState(null);
  const [form, setForm] = useState({
    center_name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    latitude: "",
    longitude: "",
    center_type: "both",
    description: "",
    price_per_day: "",
    daily_capacity: "",
    total_capacity: "",
    is_active: "1",
    address_line_2: "",
    registration_license_number: "",
    opening_time: "",
    closing_time: "",
    primary_contact_number: "",
    email_address: "",
    property_type: "",
    fencing_status: "",
    supervision_level: "",
    vaccination_policy: "",
    vet_clinic_name: "",
    vet_clinic_address: "",
    vet_clinic_contact: "",
    insurance_policy_number: "",
    insurance_provider_name: "",
    insurance_expiry_date: "",
    special_instructions: "",
    amenities: "",
    accepted_pet_types: "",
    size_weight_restrictions: "",
    age_preferences: "",
    required_vaccines: "",
    boarding_services: "",
  });

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const pickImages = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Gallery permission is required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      setCenterImages([result.assets[0]]);
    }
  };

  const pickLicense = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setLicenseFile(result.assets[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        const value = form[key];
        if (value !== "") {
          if (
            [
              "amenities",
              "accepted_pet_types",
              "size_weight_restrictions",
              "age_preferences",
              "required_vaccines",
              "boarding_services",
            ].includes(key)
          ) {
            formData.append(key, JSON.stringify(value.split(",").map((item) => item.trim()).filter(Boolean)));
          } else {
            formData.append(key, value);
          }
        }
      });

      if (licenseFile) {
        formData.append("license_proof", {
          uri: licenseFile.uri,
          name: licenseFile.name,
          type: licenseFile.mimeType || "application/pdf",
        });
      }

      centerImages.forEach((img) => {
        formData.append("center_photos", {
          uri: img.uri,
          name: img.fileName || `photo_${Date.now()}.jpg`,
          type: img.mimeType || "image/jpeg",
        });
      });

      const response = await createCenter(formData);
      if (response?.status === "success" || response?.success) {
        Alert.alert("Success", "Center created successfully", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("Error", response?.message || "Failed to create center");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to create center");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
          <View style={{ marginBottom: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: "#6b21a8", fontWeight: "700" }}>← Back</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: "700", marginTop: 12, color: "#111827" }}>
              Create Center
            </Text>
          </View>

          <View style={{ backgroundColor: "#fff", borderRadius: 16, padding: 16 }}>
            <Input label="Center Name" value={form.center_name} onChangeText={(v) => updateField("center_name", v)} />
            <Input label="Address" value={form.address} onChangeText={(v) => updateField("address", v)} />
            <Input label="Address Line 2" value={form.address_line_2} onChangeText={(v) => updateField("address_line_2", v)} />
            <Input label="City" value={form.city} onChangeText={(v) => updateField("city", v)} />
            <Input label="State" value={form.state} onChangeText={(v) => updateField("state", v)} />
            <Input label="Zip Code" value={form.zip_code} onChangeText={(v) => updateField("zip_code", v)} />
            <Input label="Latitude" value={form.latitude} onChangeText={(v) => updateField("latitude", v)} />
            <Input label="Longitude" value={form.longitude} onChangeText={(v) => updateField("longitude", v)} />
            <Input label="Center Type" value={form.center_type} onChangeText={(v) => updateField("center_type", v)} />
            <Input label="Description" value={form.description} onChangeText={(v) => updateField("description", v)} multiline />
            <Input label="Price Per Day" value={form.price_per_day} onChangeText={(v) => updateField("price_per_day", v)} keyboardType="numeric" />
            <Input label="Daily Capacity" value={form.daily_capacity} onChangeText={(v) => updateField("daily_capacity", v)} keyboardType="numeric" />
            <Input label="Total Capacity" value={form.total_capacity} onChangeText={(v) => updateField("total_capacity", v)} keyboardType="numeric" />
            <Input label="Registration License Number" value={form.registration_license_number} onChangeText={(v) => updateField("registration_license_number", v)} />
            <Input label="Opening Time" value={form.opening_time} onChangeText={(v) => updateField("opening_time", v)} />
            <Input label="Closing Time" value={form.closing_time} onChangeText={(v) => updateField("closing_time", v)} />
            <Input label="Primary Contact Number" value={form.primary_contact_number} onChangeText={(v) => updateField("primary_contact_number", v)} />
            <Input label="Email Address" value={form.email_address} onChangeText={(v) => updateField("email_address", v)} />
            <Input label="Property Type" value={form.property_type} onChangeText={(v) => updateField("property_type", v)} />
            <Input label="Fencing Status" value={form.fencing_status} onChangeText={(v) => updateField("fencing_status", v)} />
            <Input label="Supervision Level" value={form.supervision_level} onChangeText={(v) => updateField("supervision_level", v)} />
            <Input label="Vaccination Policy" value={form.vaccination_policy} onChangeText={(v) => updateField("vaccination_policy", v)} multiline />
            <Input label="Vet Clinic Name" value={form.vet_clinic_name} onChangeText={(v) => updateField("vet_clinic_name", v)} />
            <Input label="Vet Clinic Address" value={form.vet_clinic_address} onChangeText={(v) => updateField("vet_clinic_address", v)} />
            <Input label="Vet Clinic Contact" value={form.vet_clinic_contact} onChangeText={(v) => updateField("vet_clinic_contact", v)} />
            <Input label="Insurance Policy Number" value={form.insurance_policy_number} onChangeText={(v) => updateField("insurance_policy_number", v)} />
            <Input label="Insurance Provider Name" value={form.insurance_provider_name} onChangeText={(v) => updateField("insurance_provider_name", v)} />
            <Input label="Insurance Expiry Date" value={form.insurance_expiry_date} onChangeText={(v) => updateField("insurance_expiry_date", v)} />
            <Input label="Special Instructions" value={form.special_instructions} onChangeText={(v) => updateField("special_instructions", v)} multiline />
            <Input label="Amenities (comma separated)" value={form.amenities} onChangeText={(v) => updateField("amenities", v)} />
            <Input label="Accepted Pet Types (comma separated)" value={form.accepted_pet_types} onChangeText={(v) => updateField("accepted_pet_types", v)} />
            <Input label="Size Weight Restrictions (comma separated)" value={form.size_weight_restrictions} onChangeText={(v) => updateField("size_weight_restrictions", v)} />
            <Input label="Age Preferences (comma separated)" value={form.age_preferences} onChangeText={(v) => updateField("age_preferences", v)} />
            <Input label="Required Vaccines (comma separated)" value={form.required_vaccines} onChangeText={(v) => updateField("required_vaccines", v)} />
            <Input label="Boarding Services (comma separated)" value={form.boarding_services} onChangeText={(v) => updateField("boarding_services", v)} />

            <View style={{ marginTop: 8, marginBottom: 12 }}>
              <Text style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>License File</Text>
              <TouchableOpacity style={{ backgroundColor: "#f3f4f6", padding: 12, borderRadius: 12, marginBottom: 8 }} onPress={pickLicense}>
                <Text style={{ color: "#6b21a8", fontWeight: "700", textAlign: "center" }}>Upload License File</Text>
              </TouchableOpacity>
              {licenseFile ? <Text style={{ color: "#16a34a", fontSize: 12 }}>Selected: {licenseFile.name}</Text> : null}
            </View>

            <View style={{ marginTop: 8, marginBottom: 12 }}>
              <Text style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Center Image</Text>
              <TouchableOpacity style={{ backgroundColor: "#f3f4f6", padding: 12, borderRadius: 12, marginBottom: 8 }} onPress={pickImages}>
                <Text style={{ color: "#6b21a8", fontWeight: "700", textAlign: "center" }}>Upload Image</Text>
              </TouchableOpacity>
              {centerImages.length > 0 ? (
                <Image source={{ uri: centerImages[0].uri }} style={{ width: 140, height: 140, borderRadius: 12, marginTop: 8 }} />
              ) : null}
            </View>
          </View>

          <TouchableOpacity style={{ backgroundColor: "#6b21a8", paddingVertical: 16, borderRadius: 14, marginTop: 16, alignItems: "center" }} onPress={handleCreate}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Create Center</Text>}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Input = ({ label, value, onChangeText, multiline = false, keyboardType = "default" }) => (
  <View style={{ marginBottom: 14 }}>
    <Text style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>{label}</Text>
    <TextInput
      style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, backgroundColor: "#fff", fontSize: 15, color: "#111827", minHeight: multiline ? 100 : 44, textAlignVertical: multiline ? "top" : "center" }}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      keyboardType={keyboardType}
    />
  </View>
);
