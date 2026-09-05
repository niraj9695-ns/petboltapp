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
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRefresh } from "../../../context/RefreshContext";
import {
  createDateDiscount,
  getCenters,
} from "../services/boardingOwnerService";
import styles from "../styles/CreateCouponStyles";
import PremiumLoader from "../../../components/PremiumLoader";
import { useTheme } from "../../../context/ThemeContext";
import BackButton from "../../../components/BackButton";
const initialForm = {
  center_id: "",
  discount_type: "flat",
  discount_value: "",
  min_days: "",
  expiry_date: "",
  is_active: 1,
};

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

export default function CreateCouponScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { triggerRefresh } = useRefresh();
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [centerPage, setCenterPage] = useState(1);
  const [centerTotalPages, setCenterTotalPages] = useState(1);
  const [centerTotalItems, setCenterTotalItems] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [form, setForm] = useState(initialForm);
  const { theme } = useTheme();

  useEffect(() => {
    loadCenters(1);
  }, []);

  const loadCenters = async (page = 1) => {
    try {
      const response = await getCenters(page, 20);
      const payload = response?.data || response || {};
      const centerList = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
          ? payload
          : [];
      const pagination = payload?.pagination || response?.pagination || {};

      setCenters(centerList);
      setCenterPage(Number(pagination?.page || page || 1));
      setCenterTotalPages(
        Number(pagination?.total_pages || payload?.total_pages || 1) || 1,
      );
      setCenterTotalItems(
        Number(pagination?.total || payload?.total || centerList.length || 0),
      );

      const defaultCenterId =
        route?.params?.selectedCenterId || String(centerList[0]?.id || "");
      setForm((current) => ({
        ...current,
        center_id: defaultCenterId,
      }));
    } catch (error) {
      appAlert.alert("Error", "Unable to load centers.");
    } finally {
      setLoading(false);
    }
  };

  const goToCenterPage = (page) => {
    if (loading || page < 1 || page > centerTotalPages) return;
    setLoading(true);
    loadCenters(page);
  };

  const renderPagination = () => {
    if (centerTotalPages <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, centerPage - 2);
    const endPage = Math.min(centerTotalPages, centerPage + 2);

    for (let page = startPage; page <= endPage; page += 1) {
      pages.push(page);
    }

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => goToCenterPage(centerPage - 1)}
          disabled={loading || centerPage === 1}
        >
          <Text style={styles.paginationButtonText}>Prev</Text>
        </TouchableOpacity>

        {pages.map((page) => (
          <TouchableOpacity
            key={`center-${page}`}
            style={[
              styles.pageNumberButton,
              centerPage === page && styles.activePageNumberButton,
            ]}
            onPress={() => goToCenterPage(page)}
            disabled={loading}
          >
            <Text
              style={[
                styles.pageNumberButtonText,
                centerPage === page && styles.activePageNumberButtonText,
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => goToCenterPage(centerPage + 1)}
          disabled={loading || centerPage === centerTotalPages}
        >
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const showFieldError = (value) => showErrors && !value;

  const submitCoupon = async () => {
    const missingFields =
      !form.center_id ||
      !form.discount_value ||
      !form.min_days ||
      !form.expiry_date;

    if (missingFields) {
      setShowErrors(true);
      appAlert.alert("Incomplete form", "Please fill all required fields.");
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
      appAlert.alert("Success", "Coupon created successfully.");
      navigation.goBack();
    } catch (error) {
      appAlert.alert("Error", "Unable to create coupon right now.");
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
            label="Loading centers"
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
                  Create Coupon
                </Text>
              </View>

              <Text style={styles.subtitle}>
                Add a new date discount for your center
              </Text>
            </View>
          </LinearGradient>
          <View style={styles.formCard}>
            <View style={styles.fieldGroup}>
              <Label
                label="Center"
                required
                error={showFieldError(form.center_id)}
              />
              <View
                style={[
                  styles.pickerWrap,
                  showFieldError(form.center_id) && styles.inputError,
                  {
                    backgroundColor: theme.inputBackground,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Picker
                  selectedValue={form.center_id}
                  onValueChange={(value) => {
                    setShowErrors(false);
                    setForm((current) => ({ ...current, center_id: value }));
                  }}
                  dropdownIconColor={theme.primary}
                  style={{ color: theme.textPrimary }}
                >
                  {centers.map((center) => (
                    <Picker.Item
                      key={center.id}
                      label={center.center_name || `Center ${center.id}`}
                      value={String(center.id)}
                      color={theme.textPrimary}
                    />
                  ))}
                </Picker>
              </View>
              <Text style={styles.summaryText}>
                Showing {centers.length} of {centerTotalItems} centers
              </Text>
              {renderPagination()}
            </View>

            <View style={styles.rowFields}>
              <View style={[styles.fieldGroup, styles.flexHalf]}>
                <Label
                  label="Type"
                  required
                  error={showFieldError(form.discount_type)}
                />
                <View
                  style={[
                    styles.pickerWrap,
                    showFieldError(form.discount_type) && styles.inputError,
                    {
                      backgroundColor: theme.inputBackground,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Picker
                    selectedValue={form.discount_type}
                    onValueChange={(value) => {
                      setShowErrors(false);
                      setForm((current) => ({
                        ...current,
                        discount_type: value,
                      }));
                    }}
                    dropdownIconColor={theme.primary}
                    style={{ color: theme.textPrimary }}
                  >
                    <Picker.Item
                      label="Flat"
                      value="flat"
                      color={theme.textPrimary}
                    />
                    <Picker.Item
                      label="Percentage"
                      value="percentage"
                      color={theme.textPrimary}
                    />
                  </Picker>
                </View>
              </View>

              <View style={[styles.fieldGroup, styles.flexHalf]}>
                <Label
                  label="Value"
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
                  placeholder={
                    form.discount_type === "percentage" ? "10" : "500"
                  }
                  placeholderTextColor={theme.placeholder}
                  selectionColor={theme.primary}
                  value={form.discount_value}
                  onChangeText={(value) => {
                    setShowErrors(false);
                    setForm((current) => ({
                      ...current,
                      discount_value: value,
                    }));
                  }}
                />
              </View>
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
                <Text style={styles.primaryButtonText}>Create coupon</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
