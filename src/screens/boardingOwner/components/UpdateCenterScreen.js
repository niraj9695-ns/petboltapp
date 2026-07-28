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
import { Picker } from "@react-native-picker/picker";
import {
  buildCenterFormData,
  deleteCenterImage,
  getCenterDetails,
  updateCenter,
} from "../services/boardingOwnerService";
import { useRefresh } from "../../../context/RefreshContext";

export default function UpdateCenterScreen() {
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const route = useRoute();
  const { triggerRefresh } = useRefresh();
  const { centerId } = route.params || {};

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [deletingImageIndex, setDeletingImageIndex] = useState(null);
  const [licenseProof, setLicenseProof] = useState(null);
  const [insuranceDocument, setInsuranceDocument] = useState(null);
  const [petPriceDraft, setPetPriceDraft] = useState({
    petType: "dog",
    amount: "",
  });
  const [pickerConfig, setPickerConfig] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    operations: false,
    health: false,
    amenities: false,
    media: false,
  });
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
    website_url: "",
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
    service_area_radius: "",
    prices: {},
    amenities: "",
    accepted_pet_types: "",
    size_weight_restrictions: "",
    age_preferences: "",
    required_vaccines: "",
    boarding_services: "",
  });

  const MAX_FILE_SIZE = 100 * 1024;

  const getFileSize = async (file) => {
    if (!file) return 0;
    if (typeof file.fileSize === "number") return file.fileSize;
    if (typeof file.size === "number") return file.size;
    return 0;
  };

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
        website_url: data?.website_url || "",
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
        service_area_radius: data?.service_area_radius || "",
        prices: data?.pet_type_prices || data?.prices || {},
        amenities: Array.isArray(data?.amenities)
          ? data.amenities.join(", ")
          : data?.amenities || "",
        accepted_pet_types: Array.isArray(data?.accepted_pet_types)
          ? data.accepted_pet_types.join(", ")
          : data?.accepted_pet_types || "",
        size_weight_restrictions: data?.size_weight_restrictions || "",
        age_preferences: data?.age_preferences || "",
        required_vaccines: data?.required_vaccines || "",
        boarding_services: Array.isArray(data?.boarding_services)
          ? data.boarding_services.join(", ")
          : data?.boarding_services || "",
      });
    } catch (error) {
      Alert.alert("Error", "Unable to load center details");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const openPicker = (field, mode) => {
    setPickerConfig({ field, mode });
  };

  const getPickerDateValue = (value, mode) => {
    if (!value) return new Date();

    if (mode === "time") {
      const [hours, minutes] = String(value).split(":");
      const date = new Date();
      date.setHours(Number(hours || 0), Number(minutes || 0), 0, 0);
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

  const addPetPrice = () => {
    if (!petPriceDraft.amount) {
      Alert.alert("Missing price", "Enter a price for the selected pet type.");
      return;
    }

    const nextPrices = { ...(form.prices || {}) };
    nextPrices[petPriceDraft.petType] = Number(petPriceDraft.amount);
    updateField("prices", nextPrices);
    setPetPriceDraft({ petType: petPriceDraft.petType, amount: "" });
  };

  const removePetPrice = (petType) => {
    const nextPrices = { ...(form.prices || {}) };
    delete nextPrices[petType];
    updateField("prices", nextPrices);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = { ...form };

      if (typeof payload.amenities === "string") {
        payload.amenities = payload.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
      if (typeof payload.accepted_pet_types === "string") {
        payload.accepted_pet_types = payload.accepted_pet_types
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
      if (typeof payload.required_vaccines === "string") {
        payload.required_vaccines = payload.required_vaccines
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
      if (typeof payload.boarding_services === "string") {
        payload.boarding_services = payload.boarding_services
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
      if (typeof payload.prices === "string" && payload.prices.trim()) {
        try {
          payload.prices = JSON.parse(payload.prices);
        } catch (error) {
          payload.prices = { value: payload.prices };
        }
      }

      const formData = buildCenterFormData(payload, {
        centerId,
        licenseProof,
        centerPhotos: newImages,
      });

      await updateCenter(formData);
      triggerRefresh();

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
      Alert.alert("Error", "Failed to update center");
    } finally {
      setSaving(false);
    }
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const normalizeImagePath = (image) => {
    if (typeof image !== "string") return "";

    const trimmed = image.trim();
    if (!trimmed) return "";

    const match = trimmed.match(/(?:^|\/)(uploads\/centers\/[^?#]+)/i);
    return match ? match[1] : trimmed;
  };

  const getImageUri = (image) => {
    if (typeof image === "string") return image;
    return image?.uri || image?.url || image?.image || "";
  };

  const removeExistingImage = async (image, index) => {
    const imagePath = normalizeImagePath(getImageUri(image));

    if (!imagePath) {
      Alert.alert("Error", "Unable to resolve the image path");
      return;
    }

    Alert.alert("Delete Image", "Are you sure you want to delete this image?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            setDeletingImageIndex(index);
            const result = await deleteCenterImage(centerId, imagePath);

            setExistingImages((prev) => prev.filter((_, i) => i !== index));

            if (result?.localOnly) {
              Alert.alert(
                "Image removed locally",
                result.message ||
                  "The image was removed from this screen because the server endpoint is unavailable.",
              );
            } else {
              Alert.alert("Success", "Image deleted successfully");
            }
          } catch (error) {
            Alert.alert("Error", "Failed to delete image");
          } finally {
            setDeletingImageIndex(null);
          }
        },
      },
    ]);
  };

  const pickImages = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Gallery permission is required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const assets = result.assets || [result];
      const validImages = [];
      const oversized = [];

      for (const asset of assets) {
        const size = await getFileSize(asset);
        if (size > MAX_FILE_SIZE) {
          oversized.push(asset);
        } else {
          validImages.push(asset);
        }
      }

      if (oversized.length > 0) {
        Alert.alert(
          "File Too Large",
          "One or more selected images exceed the 100KB upload limit. Please choose smaller images.",
        );
      }

      if (validImages.length > 0) {
        setNewImages((prev) => [...prev, ...validImages]);
      }
    }
  };

  const pickDocument = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets?.[0] ?? result;
        const size = await getFileSize(file);
        if (size > MAX_FILE_SIZE) {
          Alert.alert(
            "File Too Large",
            "Selected document exceeds the 100KB upload limit. Please choose a smaller file.",
          );
          return;
        }

        if (type === "license") {
          setLicenseProof(file);
        } else {
          setInsuranceDocument(file);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Unable to select document.");
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
            <SectionBlock
              id="basic"
              title="Basic Details"
              subtitle="Core center info"
              expanded={expandedSections.basic}
              onToggle={toggleSection}
            >
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
            </SectionBlock>

            <SectionBlock
              id="operations"
              title="Operations & Contacts"
              subtitle="Hours and contact details"
              expanded={expandedSections.operations}
              onToggle={toggleSection}
            >
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
                label="Website URL"
                value={form.website_url}
                onChangeText={(v) => updateField("website_url", v)}
              />
              <Input
                label="Service Area Radius"
                value={form.service_area_radius}
                onChangeText={(v) => updateField("service_area_radius", v)}
                keyboardType="numeric"
              />
              <Input
                label="Registration License Number"
                value={form.registration_license_number}
                onChangeText={(v) =>
                  updateField("registration_license_number", v)
                }
              />
              <SelectField
                label="Property Type"
                value={form.property_type}
                onValueChange={(v) => updateField("property_type", v)}
                options={[
                  { label: "Select property type", value: "" },
                  { label: "House", value: "house" },
                  { label: "Apartment", value: "apartment" },
                  { label: "Facility", value: "facility" },
                ]}
              />
              <SelectField
                label="Fencing Status"
                value={form.fencing_status}
                onValueChange={(v) => updateField("fencing_status", v)}
                options={[
                  { label: "Select fencing", value: "" },
                  { label: "Full", value: "full" },
                  { label: "Partial", value: "partial" },
                  { label: "None", value: "none" },
                ]}
              />
              <SelectField
                label="Supervision Level"
                value={form.supervision_level}
                onValueChange={(v) => updateField("supervision_level", v)}
                options={[
                  { label: "Select supervision", value: "" },
                  { label: "24x7", value: "24x7" },
                  { label: "Limited", value: "limited" },
                  { label: "Scheduled", value: "scheduled" },
                ]}
              />
              <Input
                label="Vaccination Policy"
                value={form.vaccination_policy}
                onChangeText={(v) => updateField("vaccination_policy", v)}
                multiline
              />
              <DatePickerField
                label="Opening Time"
                value={form.opening_time}
                onPress={() => openPicker("opening_time", "time")}
                placeholder="Select opening time"
              />
              <DatePickerField
                label="Closing Time"
                value={form.closing_time}
                onPress={() => openPicker("closing_time", "time")}
                placeholder="Select closing time"
              />
              <PetPriceEditor
                value={petPriceDraft}
                onChange={(value) => setPetPriceDraft(value)}
                onAdd={addPetPrice}
                prices={form.prices || {}}
                onRemove={removePetPrice}
              />
            </SectionBlock>

            <SectionBlock
              id="health"
              title="Health & Insurance"
              subtitle="Vet and policy details"
              expanded={expandedSections.health}
              onToggle={toggleSection}
            >
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
              <DatePickerField
                label="Insurance Expiry Date"
                value={form.insurance_expiry_date}
                onPress={() => openPicker("insurance_expiry_date", "date")}
                placeholder="Select expiry date"
              />
            </SectionBlock>

            <SectionBlock
              id="amenities"
              title="Amenities & Services"
              subtitle="Special notes and service options"
              expanded={expandedSections.amenities}
              onToggle={toggleSection}
            >
              <Input
                label="Special Instructions"
                value={form.special_instructions}
                onChangeText={(v) => updateField("special_instructions", v)}
                multiline
              />
              <Input
                label="Amenities (comma separated)"
                value={form.amenities}
                onChangeText={(v) => updateField("amenities", v)}
              />
              <Input
                label="Accepted Pet Types (comma separated)"
                value={form.accepted_pet_types}
                onChangeText={(v) => updateField("accepted_pet_types", v)}
              />
              <Input
                label="Size Weight Restrictions (comma separated)"
                value={form.size_weight_restrictions}
                onChangeText={(v) => updateField("size_weight_restrictions", v)}
              />
              <Input
                label="Age Preferences (comma separated)"
                value={form.age_preferences}
                onChangeText={(v) => updateField("age_preferences", v)}
              />
              <Input
                label="Required Vaccines (comma separated)"
                value={form.required_vaccines}
                onChangeText={(v) => updateField("required_vaccines", v)}
              />
              <Input
                label="Boarding Services (comma separated)"
                value={form.boarding_services}
                onChangeText={(v) => updateField("boarding_services", v)}
              />
            </SectionBlock>

            <SectionBlock
              id="media"
              title="Media & Documents"
              subtitle="Uploads"
              expanded={expandedSections.media}
              onToggle={toggleSection}
            >
              <View style={styles.uploadActions}>
                <TouchableOpacity
                  onPress={() => pickDocument("license")}
                  style={[styles.actionButton, styles.secondaryActionButton]}
                >
                  <Text style={styles.secondaryActionButtonText}>
                    Select License File
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={pickImages}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionButtonText}>+ Add Images</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.uploadInfo}>
                Upload images and documents up to 100KB each.
              </Text>
              {licenseProof && (
                <Text style={styles.helperText}>
                  Selected: {licenseProof.name}
                </Text>
              )}

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
                        style={{ width: 104, height: 104, borderRadius: 12 }}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        onPress={() => removeNewImage(index)}
                        style={{
                          position: "absolute",
                          top: 6,
                          right: 6,
                          width: 26,
                          height: 26,
                          borderRadius: 13,
                          backgroundColor: "rgba(255,255,255,0.95)",
                          justifyContent: "center",
                          alignItems: "center",
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.2,
                          shadowRadius: 4,
                          elevation: 3,
                        }}
                      >
                        <Text style={{ color: "#dc2626", fontWeight: "800" }}>
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
                    renderItem={({ item, index }) => {
                      const imageUri = getImageUri(item);
                      const isDeleting = deletingImageIndex === index;
                      return (
                        <View
                          style={{
                            marginRight: 12,
                            borderRadius: 16,
                            overflow: "hidden",
                            backgroundColor: "#f9fafb",
                          }}
                        >
                          <Image
                            source={{ uri: imageUri }}
                            style={{
                              width: width - 102,
                              height: 160,
                              borderRadius: 16,
                            }}
                            resizeMode="cover"
                          />
                          <TouchableOpacity
                            onPress={() => removeExistingImage(item, index)}
                            disabled={isDeleting}
                            style={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              width: 32,
                              height: 32,
                              borderRadius: 16,
                              backgroundColor: "rgba(255,255,255,0.95)",
                              justifyContent: "center",
                              alignItems: "center",
                              shadowColor: "#000",
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.2,
                              shadowRadius: 4,
                              elevation: 3,
                            }}
                          >
                            {isDeleting ? (
                              <ActivityIndicator size="small" color="#dc2626" />
                            ) : (
                              <Text
                                style={{ color: "#dc2626", fontWeight: "800" }}
                              >
                                ✕
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                </>
              )}
            </SectionBlock>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {saving ? "Saving..." : "Save Changes"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {pickerConfig ? (
        <DateTimePicker
          value={getPickerDateValue(
            form[pickerConfig.field],
            pickerConfig.mode,
          )}
          mode={pickerConfig.mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handlePickerChange}
        />
      ) : null}
    </SafeAreaView>
  );
}

const SectionBlock = ({
  id,
  title,
  subtitle,
  expanded,
  onToggle,
  children,
}) => (
  <View style={styles.sectionCard}>
    <TouchableOpacity
      style={styles.sectionHeaderButton}
      onPress={() => onToggle(id)}
      activeOpacity={0.9}
    >
      <View style={styles.sectionHeaderTextWrap}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.sectionChevron}>{expanded ? "−" : "+"}</Text>
    </TouchableOpacity>
    {expanded ? <View style={styles.sectionBody}>{children}</View> : null}
  </View>
);

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

const DatePickerField = ({ label, value, onPress, placeholder }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity
      style={styles.dateButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[styles.dateButtonText, !value && styles.dateButtonPlaceholder]}
      >
        {value || placeholder}
      </Text>
      <Text style={styles.dateButtonIcon}>
        {label.includes("Time") ? "🕒" : "📅"}
      </Text>
    </TouchableOpacity>
  </View>
);

const SelectField = ({ label, value, onValueChange, options }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.selectBox}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.picker}
        dropdownIconColor="#6b21a8"
      >
        {options.map((option) => (
          <Picker.Item
            key={option.value || "placeholder"}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  </View>
);

const PetPriceEditor = ({ value, onChange, onAdd, prices, onRemove }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>Pet Prices</Text>
    <View style={styles.selectBox}>
      <Picker
        selectedValue={value.petType}
        onValueChange={(petType) => onChange({ ...value, petType })}
        style={styles.picker}
        dropdownIconColor="#6b21a8"
      >
        {[
          { label: "Dog", value: "dog" },
          { label: "Cat", value: "cat" },
          { label: "Bird", value: "bird" },
          { label: "Rabbit", value: "rabbit" },
          { label: "Turtle", value: "turtle" },
          { label: "Others", value: "others" },
        ].map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
    <TextInput
      style={[styles.input, { marginTop: 8 }]}
      value={value.amount}
      onChangeText={(amount) => onChange({ ...value, amount })}
      placeholder="Enter price"
      keyboardType="numeric"
    />
    <TouchableOpacity style={styles.addChip} onPress={onAdd}>
      <Text style={styles.addChipText}>Add Pet Price</Text>
    </TouchableOpacity>

    {Object.entries(prices || {}).length > 0 ? (
      <View style={{ marginTop: 10 }}>
        {Object.entries(prices).map(([petType, amount]) => (
          <View key={petType} style={styles.priceRow}>
            <Text style={styles.priceRowText}>
              {petType.charAt(0).toUpperCase() + petType.slice(1)}
            </Text>
            <Text style={styles.priceRowValue}>₹{amount}</Text>
            <TouchableOpacity onPress={() => onRemove(petType)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    ) : null}
  </View>
);
