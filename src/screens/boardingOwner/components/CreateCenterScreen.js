import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
} from "react-native";
import PremiumLoader from "../../../components/PremiumLoader";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import { boardingOwnerTheme } from "../../../styles/themeStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import FloatingInput from "../../../components/inputs/FloatingInput";
import {
  buildCenterFormData,
  createCenter,
} from "../services/boardingOwnerService";
import { useRefresh } from "../../../context/RefreshContext";
import styles from "../styles/CreateCenterStyles";

export default function CreateCenterScreen() {
  const navigation = useNavigation();
  const { triggerRefresh } = useRefresh();
  const [loading, setLoading] = useState(false);
  const [centerImages, setCenterImages] = useState([]);
  const [licenseFile, setLicenseFile] = useState(null);
  const [pickerConfig, setPickerConfig] = useState(null);
  const [errors, setErrors] = useState({});
  const [petPriceDraft, setPetPriceDraft] = useState({
    petType: "dog",
    amount: "",
  });
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    operations: false,
    vet: false,
    amenities: false,
    uploads: false,
  });
  const PET_TYPES = ["dog", "cat", "bird", "rabbit", "turtle", "others"];
  const [form, setForm] = useState({
    center_name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    center_type: "both",
    description: "",
    price_per_day: "",
    daily_capacity: "",
    total_capacity: "",
    is_active: "1",
    address_line_2: "",
    registration_license_number: "",
    opening_time: "10:00",
    closing_time: "22:00",
    primary_contact_number: "",
    email_address: "",
    website_url: "",
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
    service_area_radius: "",
    prices: {},
  });

  const getFileSize = async (file) => {
    if (!file) return 0;
    if (typeof file.fileSize === "number") return file.fileSize;
    if (typeof file.size === "number") return file.size;
    return 0;
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAcceptedPetType = (petType) => {
    const currentValues = normalizeListValue(form.accepted_pet_types);
    const nextValues = currentValues.includes(petType)
      ? currentValues.filter((value) => value !== petType)
      : [...currentValues, petType];

    updateField("accepted_pet_types", nextValues);
  };

  const normalizeListValue = (value) => {
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) return [];

      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.filter(Boolean);
        }
      } catch (error) {
        // Fall through to comma splitting for plain strings.
      }

      return trimmed
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    if (Array.isArray(value)) {
      return value.filter(Boolean);
    }

    return [];
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmedCenterName = form.center_name?.trim() || "";
    const trimmedAddress = form.address?.trim() || "";
    const trimmedCity = form.city?.trim() || "";
    const trimmedState = form.state?.trim() || "";
    const zipCode = String(form.zip_code || "").replace(/\D/g, "");
    const dailyCapacity = Number(form.daily_capacity);
    const totalCapacity = Number(form.total_capacity);

    if (!trimmedCenterName) {
      newErrors.center_name = "Center name is required";
    } else if (trimmedCenterName.length < 3) {
      newErrors.center_name = "Minimum 3 characters required";
    }

    if (!trimmedAddress) newErrors.address = "Address is required";
    if (!trimmedCity) newErrors.city = "City is required";
    if (!trimmedState) newErrors.state = "State is required";
    if (!/^\d{5,6}$/.test(zipCode)) {
      newErrors.zip_code = "Enter a valid 5-6 digit ZIP code";
    }
    if (!form.property_type) {
      newErrors.property_type = "Property type is required";
    }
    if (!form.fencing_status) {
      newErrors.fencing_status = "Fencing status is required";
    }
    if (!form.supervision_level) {
      newErrors.supervision_level = "Supervision level is required";
    }
    if (!form.daily_capacity || Number.isNaN(dailyCapacity) || dailyCapacity <= 0) {
      newErrors.daily_capacity = "Daily capacity is required";
    }
    if (!form.total_capacity || Number.isNaN(totalCapacity) || totalCapacity <= 0) {
      newErrors.total_capacity = "Total capacity is required";
    }

    const priceEntries = Object.entries(form.prices || {}).filter(
      ([, amount]) => amount !== "" && amount !== null && amount !== undefined,
    );

    if (priceEntries.length === 0) {
      newErrors.prices = "Add at least one pet price";
    } else if (
      priceEntries.some(
        ([, amount]) => Number.isNaN(Number(amount)) || Number(amount) <= 0,
      )
    ) {
      newErrors.prices = "Enter valid pet prices";
    }

    if (!form.closing_time) newErrors.closing_time = "Closing time is required";
    if (
      form.opening_time &&
      form.closing_time &&
      form.closing_time <= form.opening_time
    ) {
      newErrors.closing_time = "Closing time must be after opening time";
    }
    if (!licenseFile) {
      newErrors.licenseFile = "License proof is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
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
    setErrors((prev) => ({ ...prev, prices: "" }));
  };

  const removePetPrice = (petType) => {
    const nextPrices = { ...(form.prices || {}) };
    delete nextPrices[petType];
    updateField("prices", nextPrices);
    setErrors((prev) => ({ ...prev, prices: "" }));
  };

  const removeSelectedImage = (index) => {
    setCenterImages((prev) => prev.filter((_, i) => i !== index));
  };

  const pickImages = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const assets = result.assets || [];
        if (assets.length > 0) {
          setCenterImages((prev) => [...prev, ...assets]);
          setErrors((prev) => ({ ...prev, imageUpload: "" }));
        }
      }
    } catch (error) {
      Alert.alert("Error", "Unable to select image.");
    }
  };

  const pickLicense = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets?.[0] ?? result;
        setLicenseFile(file);
        setErrors((prev) => ({ ...prev, licenseFile: "" }));
      }
    } catch (error) {
      Alert.alert("Error", "Unable to select document.");
    }
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fix the highlighted fields");
      return;
    }

    try {
      setLoading(true);
      const payload = { ...form };

      if (typeof payload.amenities === "string") {
        payload.amenities = normalizeListValue(payload.amenities);
      }
      if (typeof payload.accepted_pet_types === "string") {
        payload.accepted_pet_types = normalizeListValue(payload.accepted_pet_types);
      }
      if (typeof payload.required_vaccines === "string") {
        payload.required_vaccines = normalizeListValue(payload.required_vaccines);
      }
      if (typeof payload.boarding_services === "string") {
        payload.boarding_services = normalizeListValue(payload.boarding_services);
      }
      if (typeof payload.prices === "string" && payload.prices.trim()) {
        try {
          payload.prices = JSON.parse(payload.prices);
        } catch (error) {
          payload.prices = { value: payload.prices };
        }
      }

      const formData = buildCenterFormData(payload, {
        licenseProof: licenseFile,
        centerPhotos: centerImages,
      });

      const response = await createCenter(formData);
      const success =
        response?.status === true ||
        response?.status === "success" ||
        response?.success === true ||
        response?.success === "success";
      if (success) {
        triggerRefresh();
        const centerId =
          response?.data?.id ||
          response?.data?.center_id ||
          response?.id ||
          response?.center_id ||
          response?.center?.id ||
          response?.center?.center_id;

        Alert.alert("Success", "Center created successfully", [
          {
            text: "OK",
            onPress: () => {
              if (centerId) {
                navigation.replace("CenterDetails", { centerId, refreshKey: Date.now() });
              } else {
                navigation.navigate("BoardingTabs", { screen: "Centers" });
              }
            },
          },
        ]);
      } else {
        Alert.alert("Error", response?.message || "Failed to create center");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to create center");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["left","right","bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
        >
          <LinearGradient
            colors={["#6b21a8", "#8b5cf6"]}
            style={styles.heroCard}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.heroTitle}>Create Center</Text>
            <Text style={styles.heroSubtitle}>
              Set up a polished boarding center profile with all the key
              details.
            </Text>
          </LinearGradient>

          <View style={styles.formCard}>
            <SectionBlock
              id="basic"
              title="Center Details"
              subtitle="Basic information"
              expanded={expandedSections.basic}
              onToggle={toggleSection}
            >
              <Input
                label="Center Name"
                value={form.center_name}
                onChangeText={(v) => updateField("center_name", v)}
                placeholder="Enter center name"
                error={errors.center_name}
                helperText="Use your official business center name"
              />
              <Input
                label="Address"
                value={form.address}
                onChangeText={(v) => updateField("address", v)}
                placeholder="Street address"
                error={errors.address}
              />
              <Input
                label="Address Line 2"
                value={form.address_line_2}
                onChangeText={(v) => updateField("address_line_2", v)}
                placeholder="Apartment, suite, or landmark"
              />
              <Input
                label="City"
                value={form.city}
                onChangeText={(v) => updateField("city", v)}
                placeholder="City"
                error={errors.city}
              />
              <Input
                label="State"
                value={form.state}
                onChangeText={(v) => updateField("state", v)}
                placeholder="State"
                error={errors.state}
              />
              <Input
                label="Zip Code"
                value={form.zip_code}
                onChangeText={(v) => updateField("zip_code", v)}
                placeholder="ZIP code"
                error={errors.zip_code}
                keyboardType="numeric"
              />
              <SelectField
                label="Center Type"
                value={form.center_type}
                onValueChange={(v) => updateField("center_type", v)}
                options={[
                  { label: "Both", value: "both" },
                  { label: "Boarding", value: "boarding" },
                  { label: "Daycare", value: "daycare" },
                ]}
              />
              <Input
                label="Description"
                value={form.description}
                onChangeText={(v) => updateField("description", v)}
                multiline
                placeholder="Describe your center"
              />
              <Input
                label="Daily Capacity"
                value={form.daily_capacity}
                onChangeText={(v) => updateField("daily_capacity", v)}
                keyboardType="numeric"
                placeholder="Daily capacity"
                error={errors.daily_capacity}
              />
              <Input
                label="Total Capacity"
                value={form.total_capacity}
                onChangeText={(v) => updateField("total_capacity", v)}
                keyboardType="numeric"
                placeholder="Total capacity"
                error={errors.total_capacity}
              />
            </SectionBlock>

            <SectionBlock
              id="operations"
              title="Operations"
              subtitle="Hours and contacts"
              expanded={expandedSections.operations}
              onToggle={toggleSection}
            >
              <Input
                label="Registration License Number"
                value={form.registration_license_number}
                onChangeText={(v) =>
                  updateField("registration_license_number", v)
                }
                placeholder="License number"
              />
              <DatePickerField
                label="Opening Time"
                value={form.opening_time}
                onPress={() => openPicker("opening_time", "time")}
                placeholder="Select opening time"
                error={errors.opening_time}
              />
              <DatePickerField
                label="Closing Time"
                value={form.closing_time}
                onPress={() => openPicker("closing_time", "time")}
                placeholder="Select closing time"
                error={errors.closing_time}
              />
              <Input
                label="Primary Contact Number"
                value={form.primary_contact_number}
                onChangeText={(v) => updateField("primary_contact_number", v)}
                placeholder="Phone number"
                keyboardType="phone-pad"
              />
              <Input
                label="Email Address"
                value={form.email_address}
                onChangeText={(v) => updateField("email_address", v)}
                placeholder="Email address"
                keyboardType="email-address"
              />
              <Input
                label="Website URL"
                value={form.website_url}
                onChangeText={(v) => updateField("website_url", v)}
                placeholder="https://petboard.com"
                keyboardType="url"
              />
              <Input
                label="Service Area Radius"
                value={form.service_area_radius}
                onChangeText={(v) => updateField("service_area_radius", v)}
                placeholder="e.g. 10"
                keyboardType="numeric"
              />
              <PetPriceEditor
                value={petPriceDraft}
                onChange={(value) => setPetPriceDraft(value)}
                onAdd={addPetPrice}
                prices={form.prices || {}}
                onRemove={removePetPrice}
                error={errors.prices}
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
                error={errors.property_type}
                helperText="Suggested options: House, Apartment, or Facility"
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
                error={errors.fencing_status}
                helperText="Suggested options: Full, Partial, or None"
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
                error={errors.supervision_level}
                helperText="Suggested options: 24x7, Limited, or Scheduled"
              />
              <Input
                label="Vaccination Policy"
                value={form.vaccination_policy}
                onChangeText={(v) => updateField("vaccination_policy", v)}
                multiline
                placeholder="Vaccination requirements"
                error={errors.vaccination_policy}
              />
            </SectionBlock>

            <SectionBlock
              id="vet"
              title="Veterinary & Insurance"
              subtitle="Coverage details"
              expanded={expandedSections.vet}
              onToggle={toggleSection}
            >
              <Input
                label="Vet Clinic Name"
                value={form.vet_clinic_name}
                onChangeText={(v) => updateField("vet_clinic_name", v)}
                placeholder="Clinic name"
              />
              <Input
                label="Vet Clinic Address"
                value={form.vet_clinic_address}
                onChangeText={(v) => updateField("vet_clinic_address", v)}
                placeholder="Clinic address"
              />
              <Input
                label="Vet Clinic Contact"
                value={form.vet_clinic_contact}
                onChangeText={(v) => updateField("vet_clinic_contact", v)}
                placeholder="Clinic phone"
              />
              <Input
                label="Insurance Policy Number"
                value={form.insurance_policy_number}
                onChangeText={(v) => updateField("insurance_policy_number", v)}
                placeholder="Policy number"
              />
              <Input
                label="Insurance Provider Name"
                value={form.insurance_provider_name}
                onChangeText={(v) => updateField("insurance_provider_name", v)}
                placeholder="Provider name"
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
              subtitle="What makes your center special"
              expanded={expandedSections.amenities}
              onToggle={toggleSection}
            >
              <Input
                label="Special Instructions"
                value={form.special_instructions}
                onChangeText={(v) => updateField("special_instructions", v)}
                multiline
                placeholder="Special instructions"
              />
              <FloatingInput
                label="Amenities"
                value={form.amenities}
                onChangeText={(v) => updateField("amenities", v)}
              />
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Accepted Pet Types</Text>
                <Text style={styles.helperText}>
                  Tap to select the pet types you accept
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {PET_TYPES.map((petType) => {
                    const selected = normalizeListValue(form.accepted_pet_types).includes(petType);
                    return (
                      <TouchableOpacity
                        key={petType}
                        style={[
                          styles.chip,
                          selected ? styles.chipSelected : null,
                        ]}
                        onPress={() => toggleAcceptedPetType(petType)}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            selected ? styles.chipSelectedText : null,
                          ]}
                        >
                          {petType.charAt(0).toUpperCase() + petType.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {errors.accepted_pet_types ? (
                  <Text style={styles.errorText}>{errors.accepted_pet_types}</Text>
                ) : null}
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Size / Weight Restrictions</Text>
                <Text style={styles.helperText}>Example: Small, Medium, Large</Text>
                <FloatingInput
                  label=""
                  value={form.size_weight_restrictions}
                  onChangeText={(v) => updateField("size_weight_restrictions", v)}
                />
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Age Preferences</Text>
                <Text style={styles.helperText}>Example: Puppies, Adults, Seniors</Text>
                <FloatingInput
                  label=""
                  value={form.age_preferences}
                  onChangeText={(v) => updateField("age_preferences", v)}
                />
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Required Vaccines</Text>
                <Text style={styles.helperText}>Example: Rabies, Distemper</Text>
                <FloatingInput
                  label=""
                  value={form.required_vaccines}
                  onChangeText={(v) => updateField("required_vaccines", v)}
                />
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Boarding Services</Text>
                <Text style={styles.helperText}>Example: Daycare, Overnight</Text>
                <FloatingInput
                  label=""
                  value={form.boarding_services}
                  onChangeText={(v) => updateField("boarding_services", v)}
                />
              </View>
            </SectionBlock>

            <SectionBlock
              id="uploads"
              title="Media & Documents"
              subtitle="Upload files"
              expanded={expandedSections.uploads}
              onToggle={toggleSection}
            >
              <View style={styles.uploadSection}>
                <Text style={styles.uploadLabel}>License File</Text>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={pickLicense}
                >
                  <Text style={styles.uploadButtonText}>
                    Upload License File
                  </Text>
                </TouchableOpacity>
                <Text style={styles.uploadInfo}>
                  Allowed: PDF / image up to 100KB
                </Text>
                {errors.licenseFile ? (
                  <Text style={styles.errorText}>{errors.licenseFile}</Text>
                ) : null}
                {errors.imageUpload ? (
                  <Text style={styles.errorText}>{errors.imageUpload}</Text>
                ) : null}
                {licenseFile ? (
                  <Text style={styles.uploadHint}>
                    Selected: {licenseFile.name}
                  </Text>
                ) : null}
              </View>

              <View style={styles.uploadSection}>
                <Text style={styles.uploadLabel}>Center Image</Text>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={pickImages}
                >
                  <Text style={styles.uploadButtonText}>Upload Image</Text>
                </TouchableOpacity>
                <Text style={styles.uploadInfo}>
                  Upload one or more images up to 100KB each.
                </Text>
                {centerImages.length > 0 ? (
                  <View style={styles.previewRow}>
                    {centerImages.map((image, index) => (
                      <View key={index} style={styles.previewCard}>
                        <Image
                          source={{ uri: image.uri }}
                          style={styles.previewImage}
                        />
                        <TouchableOpacity
                          style={styles.removeImageButton}
                          onPress={() => removeSelectedImage(index)}
                          activeOpacity={0.9}
                        >
                          <Text style={styles.removeImageIcon}>✕</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            </SectionBlock>
          </View>

          <TouchableOpacity
            onPress={handleCreate}
            activeOpacity={0.9}
            disabled={loading}
          >
            <LinearGradient
              colors={[boardingOwnerTheme.primary, boardingOwnerTheme.secondary]}
              style={[styles.submitButton, loading && { opacity: 0.85 }]}
            >
              {loading ? (
                <PremiumLoader size={24} color={boardingOwnerTheme.surface} showLabel={false} />
              ) : (
                <Text style={styles.submitButtonText}>Create Center</Text>
              )}
            </LinearGradient>
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
  placeholder,
  error,
  helperText,
}) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    {helperText ? <Text style={styles.helperText}>{helperText}</Text> : null}
    <TextInput
      style={[
        styles.input,
        multiline && styles.multilineInput,
        error ? styles.inputError : null,
      ]}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor="#9ca3af"
    />
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

const DatePickerField = ({ label, value, onPress, placeholder, error }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity
      style={[styles.dateButton, error ? styles.dateButtonError : null]}
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

const SelectField = ({ label, value, onValueChange, options, error, helperText }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    {helperText ? <Text style={styles.helperText}>{helperText}</Text> : null}
    <View style={[styles.selectBox, error ? styles.selectBoxError : null]}>
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
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

const PetPriceEditor = ({ value, onChange, onAdd, prices, onRemove, error }) => (
  <View style={styles.fieldContainer}>
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

    {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
