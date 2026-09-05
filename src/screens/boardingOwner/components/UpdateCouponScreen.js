import { appAlert } from "../../../utils/alert";
import React, { useEffect, useState } from "react";
import {
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackButton from "../../../components/BackButton";
import { useRefresh } from "../../../context/RefreshContext";
import { updateDateDiscount } from "../services/boardingOwnerService";
import styles from "../styles/UpdateCouponStyles";
import PremiumLoader from "../../../components/PremiumLoader";
import { useTheme } from "../../../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

const buildForm = (discount) => ({
  discount_value: String(discount?.discount_value ?? ""),
  min_days: String(discount?.min_days ?? ""),
  expiry_date: discount?.expiry_date ? discount.expiry_date.slice(0, 10) : "",
  is_active: Number(discount?.is_active ?? 1),
});

const formatDateValue = (date) => {
  const normalized = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
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

export default function UpdateCouponScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { triggerRefresh } = useRefresh();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [form, setForm] = useState(buildForm(route?.params?.discount || {}));
  const { theme } = useTheme();

  useEffect(() => {
    setLoading(false);
  }, []);

  const showFieldError = (value) => showErrors && !value;

  const submitCoupon = async () => {
    if (!form.discount_value || !form.min_days || !form.expiry_date) {
      setShowErrors(true);
      appAlert.alert("Incomplete form", "Please fill all required fields.");
      return;
    }

    const payload = {
      discount_value: Number(form.discount_value),
      min_days: Number(form.min_days),
      expiry_date: form.expiry_date,
      is_active: Number(form.is_active),
    };

    setSaving(true);

    try {
      await updateDateDiscount(route?.params?.discount?.id, payload);
      triggerRefresh();
      appAlert.alert("Success", "Coupon updated successfully.");
      navigation.goBack();
    } catch (error) {
      appAlert.alert("Error", "Unable to update coupon right now.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
        edges={["left", "right", "bottom"]}
      >
        <View style={styles.loaderWrap}>
          <PremiumLoader
            size={56}
            color={theme.primary}
            label="Preparing form"
            fullScreen
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={["#6b21a8", "#8b5cf6"]}
            style={styles.heroCard}
          >
            <View style={styles.header}>
              <View style={styles.headerTopRow}>
                <BackButton style={styles.headerBackButton} />

                <Text style={styles.title} numberOfLines={1}>
                  Update Coupon
                </Text>
              </View>

              <Text style={styles.subtitle}>
                Edit the selected date discount
              </Text>
            </View>
          </LinearGradient>

          <View style={styles.formCard}>
            <View style={styles.fieldGroup}>
              <Label
                label="Discount value"
                required
                error={showFieldError(form.discount_value)}
              />
              <TextInput
                style={[
                  styles.input,
                  showFieldError(form.discount_value) && styles.inputError,
                  {
                    backgroundColor: theme.inputBackground,
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  },
                ]}
                keyboardType="numeric"
                placeholder="15"
                placeholderTextColor={theme.placeholder}
                selectionColor={theme.primary}
                value={form.discount_value}
                onChangeText={(value) => {
                  setShowErrors(false);
                  setForm((current) => ({ ...current, discount_value: value }));
                }}
              />
            </View>

            <View style={styles.rowFields}>
              <View style={[styles.fieldGroup, styles.flexHalf]}>
                <Label
                  label="Min stay (days)"
                  required
                  error={showFieldError(form.min_days)}
                />
                <TextInput
                  style={[
                    styles.input,
                    showFieldError(form.min_days) && styles.inputError,
                    {
                      backgroundColor: theme.inputBackground,
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    },
                  ]}
                  keyboardType="numeric"
                  placeholder="3"
                  placeholderTextColor={theme.placeholder}
                  selectionColor={theme.primary}
                  value={form.min_days}
                  onChangeText={(value) => {
                    setShowErrors(false);
                    setForm((current) => ({ ...current, min_days: value }));
                  }}
                />
              </View>

              <View style={[styles.fieldGroup, styles.flexHalf]}>
                <Label
                  label="Expiry date"
                  required
                  error={showFieldError(form.expiry_date)}
                />
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  activeOpacity={0.8}
                  style={[
                    styles.dateButton,
                    showFieldError(form.expiry_date) && styles.inputError,
                    {
                      backgroundColor: theme.inputBackground,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dateButtonText,
                      !form.expiry_date && styles.dateButtonPlaceholder,
                      {
                        color: form.expiry_date
                          ? theme.textPrimary
                          : theme.placeholder,
                      },
                    ]}
                  >
                    {form.expiry_date || "Select expiry date"}
                  </Text>
                  <Text style={styles.dateButtonIcon}>Date</Text>
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
                  onPress={() =>
                    setForm((current) => ({ ...current, is_active: 1 }))
                  }
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
                  onPress={() =>
                    setForm((current) => ({ ...current, is_active: 0 }))
                  }
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
                value={
                  form.expiry_date ? new Date(form.expiry_date) : new Date()
                }
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

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={submitCoupon}
              disabled={saving}
            >
              {saving ? (
                <PremiumLoader size={24} color="#fff" showLabel={false} />
              ) : (
                <Text style={styles.primaryButtonText}>Update coupon</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
