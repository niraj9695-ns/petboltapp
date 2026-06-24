import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  FlatList,
  Dimensions,
  Linking,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import styles from "../styles/UpdateCenterScreenStyles";
import {
  getCenterDetails,
  updateCenter,
} from "../services/boardingOwnerService";

export default function UpdateCenterScreen() {
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const route = useRoute();
  const { centerId } = route.params || {};

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [licenseProof, setLicenseProof] = useState(null);
  const [insuranceDocument, setInsuranceDocument] = useState(null);
  const [form, setForm] = useState({
    center_name: "",
    description: "",
    center_type: "",
    price_per_day: "",
    daily_capacity: "",
    total_capacity: "",
    address: "",
    address_line_2: "",
    city: "",
    state: "",
    zip_code: "",
    primary_contact_number: "",
    email_address: "",
    registration_license_number: "",
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
    opening_time: "",
    closing_time: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (centerId) {
      loadCenter();
    }
  }, [centerId]);

  const loadCenter = async () => {
    try {
      const response = await getCenterDetails(centerId);
      const data = response?.data || response;
      setCenter(data);
      setExistingImages(data?.center_photos || []);
      setForm({
        center_name: data?.center_name || "",
        description: data?.description || "",
        center_type: data?.center_type || "",
        price_per_day: data?.price_per_day || "",
        daily_capacity: data?.daily_capacity || "",
        total_capacity: data?.total_capacity || "",
        address: data?.address || "",
        address_line_2: data?.address_line_2 || "",
        city: data?.city || "",
        state: data?.state || "",
        zip_code: data?.zip_code || "",
        primary_contact_number: data?.primary_contact_number || "",
        email_address: data?.email_address || "",
        registration_license_number: data?.registration_license_number || "",
        property_type: data?.property_type || "",
        fencing_status: data?.fencing_status || "",
        supervision_level: data?.supervision_level || "",
        vaccination_policy: data?.vaccination_policy || "",
        vet_clinic_name: data?.vet_clinic_name || "",
        vet_clinic_address: data?.vet_clinic_address || "",
        vet_clinic_contact: data?.vet_clinic_contact || "",
        insurance_policy_number: data?.insurance_policy_number || "",
        insurance_provider_name: data?.insurance_provider_name || "",
        insurance_expiry_date: data?.insurance_expiry_date || "",
        special_instructions: data?.special_instructions || "",
        opening_time: data?.opening_time || "",
        closing_time: data?.closing_time || "",
        latitude: data?.latitude || "",
        longitude: data?.longitude || "",
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to load center details");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("center_id", centerId);
      Object.keys(form).forEach((key) => formData.append(key, form[key] || ""));

      if (licenseProof) {
        formData.append("license_proof", {
          uri: licenseProof.uri,
          name: licenseProof.name,
          type: licenseProof.mimeType || "application/pdf",
        });
      }

      newImages.forEach((img) => {
        formData.append("center_photos", {
          uri: img.uri,
          name: img.fileName || `photo_${Date.now()}.jpg`,
          type: img.mimeType || "image/jpeg",
        });
      });

      const response = await updateCenter(formData);
      console.log("Update Response:", response);
      Alert.alert("Success", "Center updated successfully", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("CenterDetails", {
              centerId,
              refreshKey: Date.now(),
            }),
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to update center");
    } finally {
      setSaving(false);
    }
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
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
      setNewImages([result.assets[0]]);
    }
  };

  const pickDocument = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        if (type === "license") {
          setLicenseProof(file);
        } else {
          setInsuranceDocument(file);
        }
      }
    } catch (error) {
      console.log(error);
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
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>
              {center?.center_name || "Update Center"}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Center Information</Text>

            <TouchableOpacity
              onPress={() => pickDocument("license")}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>Select License File</Text>
            </TouchableOpacity>
            {licenseProof && (
              <Text style={styles.helperText}>
                Selected: {licenseProof.name}
              </Text>
            )}

            <TouchableOpacity onPress={pickImages} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>+ Add Images</Text>
            </TouchableOpacity>

            {newImages.length > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 20,
                }}
              >
                {newImages.map((image, index) => (
                  <View
                    key={index}
                    style={{
                      position: "relative",
                      marginRight: 10,
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      source={{ uri: image.uri }}
                      style={{ width: 100, height: 100, borderRadius: 10 }}
                    />
                    <TouchableOpacity
                      onPress={() => removeNewImage(index)}
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        width: 25,
                        height: 25,
                        borderRadius: 15,
                        backgroundColor: "red",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        ✕
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {existingImages.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Existing Images</Text>
                <FlatList
                  data={existingImages}
                  horizontal
                  pagingEnabled
                  nestedScrollEnabled
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Image
                      source={{ uri: item }}
                      style={{
                        width: width - 64,
                        height: 220,
                        borderRadius: 16,
                        marginRight: 12,
                      }}
                      resizeMode="cover"
                    />
                  )}
                />
              </>
            )}

            <Input
              label="Center Name"
              value={form.center_name}
              onChangeText={(v) => updateField("center_name", v)}
            />
            <Input
              label="Description"
              value={form.description}
              onChangeText={(v) => updateField("description", v)}
              multiline
            />
            <Input
              label="Price per day"
              value={form.price_per_day}
              onChangeText={(v) => updateField("price_per_day", v)}
              keyboardType="numeric"
            />
            <Input
              label="Total capacity"
              value={form.total_capacity}
              onChangeText={(v) => updateField("total_capacity", v)}
              keyboardType="numeric"
            />
            <Input
              label="Address"
              value={form.address}
              onChangeText={(v) => updateField("address", v)}
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
              label="Zip code"
              value={form.zip_code}
              onChangeText={(v) => updateField("zip_code", v)}
            />
            <Input
              label="Address Line 2"
              value={form.address_line_2}
              onChangeText={(v) => updateField("address_line_2", v)}
            />
            <Input
              label="Primary Contact"
              value={form.primary_contact_number}
              onChangeText={(v) => updateField("primary_contact_number", v)}
            />
            <Input
              label="Email"
              value={form.email_address}
              onChangeText={(v) => updateField("email_address", v)}
            />
            <Input
              label="Registration License Number"
              value={form.registration_license_number}
              onChangeText={(v) =>
                updateField("registration_license_number", v)
              }
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
              label="Vaccination Policy"
              value={form.vaccination_policy}
              onChangeText={(v) => updateField("vaccination_policy", v)}
              multiline
            />
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
            <Input
              label="Special Instructions"
              value={form.special_instructions}
              onChangeText={(v) => updateField("special_instructions", v)}
              multiline
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
              label="Latitude"
              value={form.latitude}
              onChangeText={(v) => updateField("latitude", v)}
            />
            <Input
              label="Longitude"
              value={form.longitude}
              onChangeText={(v) => updateField("longitude", v)}
            />
          </View>

          <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
            <Text style={styles.actionButtonText}>
              {saving ? "Saving..." : "Save Changes"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Input = ({
  label,
  value,
  onChangeText,
  multiline = false,
  keyboardType = "default",
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.multilineInput]}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      keyboardType={keyboardType}
    />
  </View>
);
