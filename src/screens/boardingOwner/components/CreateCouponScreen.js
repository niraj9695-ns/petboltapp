import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useRefresh } from "../../../context/RefreshContext";
import {
  createDateDiscount,
  getCenters,
} from "../services/boardingOwnerService";
import styles from "../styles/BoardingCouponsStyles";

const initialForm = {
  center_id: "",
  discount_type: "flat",
  discount_value: "",
  min_days: "",
  expiry_date: "",
  is_active: 1,
};

const formatDateValue = (date) => {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const year = normalized.getFullYear();
  const month = String(normalized.getMonth() + 1).padStart(2, "0");
  const day = String(normalized.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Label = ({ label, required, error }) => (
  <View style={styles.labelRow}>
    <Text style={[styles.label, error && styles.labelError]}>{label}</Text>
    {required ? <Text style={styles.requiredAsterisk}> *</Text> : null}
  </View>
);

export default function CreateCouponScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { triggerRefresh } = useRefresh();
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    loadCenters();
  }, []);

  const loadCenters = async () => {
    try {
      const response = await getCenters();
      const centerList = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response)
          ? response
          : [];

      setCenters(centerList);

      const defaultCenterId = route?.params?.selectedCenterId || String(centerList[0]?.id || "");
      setForm((current) => ({
        ...current,
        center_id: defaultCenterId,
      }));
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to load centers.");
    } finally {
      setLoading(false);
    }
  };

  const showFieldError = (value) => showErrors && !value;

  const submitCoupon = async () => {
    const missingFields = !form.center_id || !form.discount_value || !form.min_days || !form.expiry_date;

    if (missingFields) {
      setShowErrors(true);
      Alert.alert("Incomplete form", "Please fill all required fields.");
      return;
    }

    const payload = {
      center_id: Number(form.center_id),
      discount_type: form.discount_type,
      discount_value: Number(form.discount_value),
      min_days: Number(form.min_days),
      expiry_date: form.expiry_date,
      is_active: Number(form.is_active),
    };

    setSaving(true);

    try {
      await createDateDiscount(payload);
      triggerRefresh();
      Alert.alert("Success", "Coupon created successfully.");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to create coupon right now.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color="#6d28d9" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={22} color="#111827" />
            </TouchableOpacity>

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.title}>Create Coupon</Text>
              <Text style={styles.subtitle}>Add a new date discount for your center</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <View style={styles.fieldGroup}>
              <Label label="Center" required error={showFieldError(form.center_id)} />
              <View style={[styles.pickerWrap, showFieldError(form.center_id) && styles.inputError]}>
                <Picker
                  selectedValue={form.center_id}
                  onValueChange={(value) => {
                    setShowErrors(false);
                    setForm((current) => ({ ...current, center_id: value }));
                  }}
                  dropdownIconColor="#6d28d9"
                >
                  {centers.map((center) => (
                    <Picker.Item
                      key={center.id}
                      label={center.center_name || `Center ${center.id}`}
                      value={String(center.id)}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.rowFields}>
              <View style={[styles.fieldGroup, styles.flexHalf]}>
                <Label label="Type" required error={showFieldError(form.discount_type)} />
                <View style={[styles.pickerWrap, showFieldError(form.discount_type) && styles.inputError]}>
                  <Picker
                    selectedValue={form.discount_type}
                    onValueChange={(value) => {
                      setShowErrors(false);
                      setForm((current) => ({ ...current, discount_type: value }));
                    }}
                    dropdownIconColor="#6d28d9"
                  >
                    <Picker.Item label="Flat" value="flat" />
                    <Picker.Item label="Percentage" value="percentage" />
                  </Picker>
                </View>
              </View>

              <View style={[styles.fieldGroup, styles.flexHalf]}>
                <Label label="Value" required error={showFieldError(form.discount_value)} />
                <TextInput
                  style={[styles.input, showFieldError(form.discount_value) && styles.inputError]}
                  keyboardType="numeric"
                  placeholder={form.discount_type === "percentage" ? "10" : "500"}
                  value={form.discount_value}
                  onChangeText={(value) => {
                    setShowErrors(false);
                    setForm((current) => ({ ...current, discount_value: value }));
                  }}
                />
              </View>
            </View>

            <View style={styles.rowFields}>
              <View style={[styles.fieldGroup, styles.flexHalf]}>
                <Label label="Min stay (days)" required error={showFieldError(form.min_days)} />
                <TextInput
                  style={[styles.input, showFieldError(form.min_days) && styles.inputError]}
                  keyboardType="numeric"
                  placeholder="3"
                  value={form.min_days}
                  onChangeText={(value) => {
                    setShowErrors(false);
                    setForm((current) => ({ ...current, min_days: value }));
                  }}
                />
              </View>

              <View style={[styles.fieldGroup, styles.flexHalf]}>
                <Label label="Expiry date" required error={showFieldError(form.expiry_date)} />
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  activeOpacity={0.8}
                  style={[styles.dateButton, showFieldError(form.expiry_date) && styles.inputError]}
                >
                  <Text style={[styles.dateButtonText, !form.expiry_date && styles.dateButtonPlaceholder]}>
                    {form.expiry_date || "Select expiry date"}
                  </Text>
                  <Text style={styles.dateButtonIcon}>📅</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Label label="Status" required={false} error={false} />
              <View style={styles.toggleRow}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    form.is_active === 1 && styles.toggleButtonActive,
                  ]}
                  onPress={() => setForm((current) => ({ ...current, is_active: 1 }))}
                >
                  <Text
                    style={[
                      styles.toggleButtonText,
                      form.is_active === 1 && styles.toggleButtonTextActive,
                    ]}
                  >
                    Active
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    form.is_active === 0 && styles.toggleButtonActive,
                  ]}
                  onPress={() => setForm((current) => ({ ...current, is_active: 0 }))}
                >
                  <Text
                    style={[
                      styles.toggleButtonText,
                      form.is_active === 0 && styles.toggleButtonTextActive,
                    ]}
                  >
                    Inactive
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {showDatePicker ? (
              <DateTimePicker
                value={form.expiry_date ? new Date(form.expiry_date) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);

                  if (selectedDate) {
                    setShowErrors(false);
                    setForm((current) => ({
                      ...current,
                      expiry_date: formatDateValue(selectedDate),
                    }));
                  }
                }}
              />
            ) : null}

            <TouchableOpacity style={styles.primaryButton} onPress={submitCoupon} disabled={saving}>
              {saving ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.primaryButtonText}>Create coupon</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
