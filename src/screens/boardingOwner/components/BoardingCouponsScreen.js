import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useRefresh } from "../../../context/RefreshContext";
import {
  deleteDateDiscount,
  getCenters,
  getDateDiscounts,
} from "../services/boardingOwnerService";
import styles from "../styles/BoardingCouponsStyles";

const formatShortDate = (value) => {
  if (!value) {
    return "—";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const isDateExpired = (value) => {
  if (!value) {
    return false;
  }

  const expiry = new Date(value);
  return Number.isNaN(expiry.getTime()) ? false : expiry < new Date();
};

export default function BoardingCouponsScreen() {
  const navigation = useNavigation();
  const scrollRef = useRef(null);
  const { refreshKey, triggerRefresh } = useRefresh();
  const [centers, setCenters] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loadingCenters, setLoadingCenters] = useState(true);
  const [loadingDiscounts, setLoadingDiscounts] = useState(false);
  const [selectedCenterId, setSelectedCenterId] = useState("");

  const loadDiscounts = useCallback(async (centerId) => {
    if (!centerId) {
      setDiscounts([]);
      return;
    }

    setLoadingDiscounts(true);

    try {
      const response = await getDateDiscounts(centerId);
      const discountList = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response)
          ? response
          : [];

      setDiscounts(discountList);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to load the coupons for this center.");
      setDiscounts([]);
    } finally {
      setLoadingDiscounts(false);
    }
  }, []);

  const loadCenters = useCallback(async () => {
    try {
      const response = await getCenters();
      const centerList = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response)
          ? response
          : [];

      setCenters(centerList);

      const activeCenterId = selectedCenterId || String(centerList[0]?.id || "");
      const nextCenterId = activeCenterId && centerList.some((center) => String(center.id) === activeCenterId)
        ? activeCenterId
        : String(centerList[0]?.id || "");

      setSelectedCenterId(nextCenterId);

      if (nextCenterId) {
        await loadDiscounts(nextCenterId);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to load your centers right now.");
    } finally {
      setLoadingCenters(false);
    }
  }, [loadDiscounts, selectedCenterId]);

  useFocusEffect(
    useCallback(() => {
      loadCenters();
    }, [loadCenters])
  );

  useEffect(() => {
    if (selectedCenterId) {
      loadDiscounts(selectedCenterId);
    }
  }, [selectedCenterId, refreshKey, loadDiscounts]);

  const changeCenter = (centerId) => {
    setSelectedCenterId(centerId);
  };

  const openCreateForm = () => {
    navigation.navigate("CreateCoupon", {
      selectedCenterId,
    });
  };

  const openUpdateForm = (discount) => {
    navigation.navigate("UpdateCoupon", {
      discount,
      selectedCenterId,
    });
  };

  const deleteCoupon = async (discount) => {
    Alert.alert("Delete coupon", "Are you sure you want to remove this coupon?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDateDiscount(discount.id);
            triggerRefresh();
            Alert.alert("Removed", "Coupon deleted successfully.");
            loadDiscounts(selectedCenterId);
          } catch (error) {
            console.log(error);
            Alert.alert("Error", "Unable to delete this coupon right now.");
          }
        },
      },
    ]);
  };

  if (loadingCenters) {
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
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Coupons</Text>
              <Text style={styles.subtitle}>Manage date discounts for your centers</Text>
            </View>

            <TouchableOpacity style={styles.createButton} onPress={openCreateForm}>
              <Ionicons name="add-circle-outline" size={18} color="#fff" />
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterCard}>
            <Text style={styles.filterLabel}>Filter by center</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={selectedCenterId}
                onValueChange={(value) => changeCenter(value)}
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

          <View style={styles.listCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Saved coupons</Text>
              <Text style={styles.mutedText}>
                {loadingDiscounts ? "Loading..." : `${discounts.length} items`}
              </Text>
            </View>

            {loadingDiscounts ? (
              <View style={styles.loaderWrapSmall}>
                <ActivityIndicator size="small" color="#6d28d9" />
              </View>
            ) : discounts.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="pricetag-outline" size={28} color="#7c3aed" />
                <Text style={styles.emptyStateText}>
                  No coupons have been created for this center yet.
                </Text>
              </View>
            ) : (
              discounts.map((discount) => (
                <View key={discount.id} style={styles.discountCard}>
                  <View style={styles.discountHeader}>
                    <View>
                      <Text style={styles.discountTitle}>
                        {discount.discount_type === "percentage"
                          ? `${discount.discount_value}% off`
                          : `₹${discount.discount_value} off`}
                      </Text>
                      <Text style={styles.discountMeta}>
                        Min stay: {discount.min_days} day{discount.min_days === 1 ? "" : "s"}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statusPill,
                        Number(discount.is_active) === 1 ? styles.statusPillActive : styles.statusPillPaused,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          Number(discount.is_active) === 1 ? styles.statusTextActive : styles.statusTextPaused,
                        ]}
                      >
                        {Number(discount.is_active) === 1 ? "Active" : "Inactive"}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.discountInfo}>
                    Expires on {formatShortDate(discount.expiry_date)}
                  </Text>
                  {isDateExpired(discount.expiry_date) ? (
                    <Text style={styles.expiredText}>This coupon has expired.</Text>
                  ) : null}

                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => openUpdateForm(discount)}
                    >
                      <Ionicons name="create-outline" size={16} color="#fff" />
                      <Text style={styles.actionText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteCoupon(discount)}
                    >
                      <Ionicons name="trash-outline" size={16} color="#fff" />
                      <Text style={styles.actionText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
