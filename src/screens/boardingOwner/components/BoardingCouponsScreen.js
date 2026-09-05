import { appAlert } from "../../../utils/alert";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useRefresh } from "../../../context/RefreshContext";
import {
  deleteDateDiscount,
  getCenters,
  getDateDiscounts,
} from "../services/boardingOwnerService";
import styles from "../styles/BoardingCouponsStyles";
import PremiumLoader from "../../../components/PremiumLoader";
import { useTheme } from "../../../context/ThemeContext";

const formatShortDate = (value) => {
  if (!value) {
    return "-";
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
  const { theme } = useTheme();
  const { refreshKey, triggerRefresh } = useRefresh();
  const [centers, setCenters] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loadingCenters, setLoadingCenters] = useState(true);
  const [loadingDiscounts, setLoadingDiscounts] = useState(false);
  const [deletingCouponId, setDeletingCouponId] = useState(null);
  const [selectedCenterId, setSelectedCenterId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [centerPage, setCenterPage] = useState(1);
  const [centerTotalPages, setCenterTotalPages] = useState(1);
  const [centerTotalItems, setCenterTotalItems] = useState(0);
  const [isGuest, setIsGuest] = useState(false);
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;
  const numColumns = isTablet ? 2 : 1;

  const loadDiscounts = useCallback(async (centerId, page = 1) => {
    if (!centerId) {
      setDiscounts([]);
      setCurrentPage(1);
      setTotalPages(1);
      setTotalItems(0);
      return;
    }

    setLoadingDiscounts(true);

    try {
      const response = await getDateDiscounts(centerId, page, 20);
      const payload = response?.data || response || {};
      const discountList = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload?.discounts)
          ? payload.discounts
          : Array.isArray(payload)
            ? payload
            : [];
      const pagination = payload?.pagination || response?.pagination || {};

      setDiscounts(discountList);
      setCurrentPage(Number(pagination?.page || page || 1));
      setTotalPages(
        Number(pagination?.total_pages || payload?.total_pages || 1) || 1,
      );
      setTotalItems(
        Number(pagination?.total || payload?.total || discountList.length || 0),
      );
    } catch (error) {
      appAlert.alert("Error", "Unable to load the coupons for this center.");
      setDiscounts([]);
      setCurrentPage(1);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setLoadingDiscounts(false);
    }
  }, []);

  const loadCenters = useCallback(
    async (page = 1) => {
      setLoadingCenters(true);
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

        const activeCenterId =
          selectedCenterId || String(centerList[0]?.id || "");
        const nextCenterId =
          activeCenterId &&
          centerList.some((center) => String(center.id) === activeCenterId)
            ? activeCenterId
            : String(centerList[0]?.id || "");

        setSelectedCenterId(nextCenterId);

        if (nextCenterId) {
          await loadDiscounts(nextCenterId, 1);
        }
      } catch (error) {
        appAlert.alert("Error", "Unable to load your centers right now.");
      } finally {
        setLoadingCenters(false);
      }
    },
    [loadDiscounts, selectedCenterId],
  );

  useFocusEffect(
    useCallback(() => {
      const loadGuestOrCenters = async () => {
        const guestRole = await AsyncStorage.getItem("guestRole");

        if (guestRole) {
          setIsGuest(true);
          setLoadingCenters(false);
          return;
        }

        setIsGuest(false);
        loadCenters(1);
      };

      loadGuestOrCenters();
    }, [loadCenters]),
  );

  useEffect(() => {
    if (selectedCenterId) {
      loadDiscounts(selectedCenterId, currentPage);
    }
  }, [selectedCenterId, refreshKey, loadDiscounts, currentPage]);

  const changeCenter = (centerId) => {
    setSelectedCenterId(centerId);
    setCurrentPage(1);
    loadDiscounts(centerId, 1);
  };

  const goToCenterPage = (page) => {
    if (loadingCenters || page < 1 || page > centerTotalPages) return;
    loadCenters(page);
  };

  const goToCouponPage = (page) => {
    if (loadingDiscounts || page < 1 || page > totalPages) return;
    setCurrentPage(page);
    loadDiscounts(selectedCenterId, page);
  };

  const openCreateForm = () => {
    navigation.navigate("CreateCoupon", {
      selectedCenterId,
    });
  };

  const renderPagination = (
    page,
    total,
    onPageChange,
    label,
    isLoading = false,
  ) => {
    if (total <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(total, page + 2);

    for (let current = startPage; current <= endPage; current += 1) {
      pages.push(current);
    }

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => onPageChange(page - 1)}
          disabled={page === 1 || isLoading}
        >
          <Text style={styles.paginationButtonText}>Prev</Text>
        </TouchableOpacity>

        {pages.map((pageNumber) => (
          <TouchableOpacity
            key={`${label}-${pageNumber}`}
            style={[
              styles.pageNumberButton,
              page === pageNumber && styles.activePageNumberButton,
            ]}
            onPress={() => onPageChange(pageNumber)}
            disabled={isLoading}
          >
            <Text
              style={[
                styles.pageNumberButtonText,
                page === pageNumber && styles.activePageNumberButtonText,
              ]}
            >
              {pageNumber}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => onPageChange(page + 1)}
          disabled={page === total || isLoading}
        >
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const openUpdateForm = (discount) => {
    navigation.navigate("UpdateCoupon", {
      discount,
      selectedCenterId,
    });
  };

  const handleSignIn = async () => {
    await AsyncStorage.removeItem("guestRole");
    setIsGuest(false);
    navigation.navigate("Auth");
  };

  const deleteCoupon = async (discount) => {
    appAlert.alert(
      "Delete coupon",
      "Are you sure you want to remove this coupon?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setDeletingCouponId(discount.id);
              await deleteDateDiscount(discount.id);
              triggerRefresh();
              await loadDiscounts(selectedCenterId);
            } catch (error) {
              appAlert.alert("Error", "Unable to delete this coupon right now.");
            } finally {
              setDeletingCouponId(null);
            }
          },
        },
      ],
    );
  };

  if (loadingCenters) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
        edges={["left", "right", "bottom"]}
      >
        <View style={styles.loaderWrap}>
          <PremiumLoader
            size={56}
            color={theme.primary}
            label="Loading coupons"
            fullScreen
          />
        </View>
      </SafeAreaView>
    );
  }

  if (isGuest) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
        edges={["left", "right", "bottom"]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: theme.background,
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.surfaceAlt,
            }}
          >
            <Ionicons name="ticket-outline" size={38} color={theme.primary} />
          </View>

          <Text
            style={{
              textAlign: "center",
              marginTop: 0,
              color: theme.textSecondary,
            }}
          >
            Sign in or create an account to view your coupons
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: theme.primary,
              paddingHorizontal: 30,
              paddingVertical: 14,
              borderRadius: 12,
              marginTop: 15,
            }}
            onPress={async () => {
              await AsyncStorage.removeItem("guestRole");

              navigation.reset({
                index: 0,
                routes: [{ name: "Auth" }],
              });
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Sign In / Sign Up
            </Text>
          </TouchableOpacity>
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
          ref={scrollRef}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Coupons</Text>
              <Text style={styles.subtitle}>
                Manage date discounts for your centers
              </Text>
            </View>

            <TouchableOpacity
              style={styles.createButton}
              onPress={openCreateForm}
            >
              <Ionicons name="add-circle-outline" size={18} color="#fff" />
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.filterCard,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={[styles.filterLabel, { color: theme.textPrimary }]}>
              Filter by center
            </Text>
            <View
              style={[
                styles.pickerWrap,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                },
              ]}
            >
              <Picker
                selectedValue={selectedCenterId}
                onValueChange={(value) => changeCenter(value)}
                dropdownIconColor={theme.primary}
                style={{ color: theme.textPrimary }}
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
            {renderPagination(
              centerPage,
              centerTotalPages,
              goToCenterPage,
              "center",
              loadingCenters,
            )}
          </View>

          <View style={styles.listCard}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                Saved coupons
              </Text>
              <Text style={[styles.mutedText, { color: theme.textSecondary }]}>
                {loadingDiscounts
                  ? "Loading..."
                  : `${discounts.length} of ${totalItems} items`}
              </Text>
            </View>

            {loadingDiscounts ? (
              <View style={styles.loaderWrapSmall}>
                <PremiumLoader
                  size={24}
                  color={theme.primary}
                  showLabel={false}
                />
              </View>
            ) : discounts.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons
                  name="pricetag-outline"
                  size={28}
                  color={theme.primary}
                />
                <Text style={styles.emptyStateText}>
                  No coupons have been created for this center yet.
                </Text>
              </View>
            ) : (
              <>
                <View style={styles.cardsContainer}>
                  {discounts.map((discount) => (
                    <View
                      key={discount.id}
                      style={[
                        styles.discountCard,
                        {
                          width: isTablet ? "48%" : "100%",
                        },
                      ]}
                    >
                      <View style={styles.discountHeader}>
                        <View>
                          <Text style={styles.discountTitle}>
                            {discount.discount_type === "percentage"
                              ? `${discount.discount_value}% off`
                              : `\u20B9${discount.discount_value} off`}
                          </Text>
                          <Text style={styles.discountMeta}>
                            Min stay: {discount.min_days} day
                            {discount.min_days === 1 ? "" : "s"}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.statusPill,
                            Number(discount.is_active) === 1
                              ? styles.statusPillActive
                              : styles.statusPillPaused,
                          ]}
                        >
                          <Text
                            style={[
                              styles.statusText,
                              Number(discount.is_active) === 1
                                ? styles.statusTextActive
                                : styles.statusTextPaused,
                            ]}
                          >
                            {Number(discount.is_active) === 1
                              ? "Active"
                              : "Inactive"}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.discountInfo}>
                        Expires on {formatShortDate(discount.expiry_date)}
                      </Text>
                      {isDateExpired(discount.expiry_date) ? (
                        <Text style={styles.expiredText}>
                          This coupon has expired.
                        </Text>
                      ) : null}

                      <View style={styles.actionRow}>
                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => openUpdateForm(discount)}
                        >
                          <Ionicons
                            name="create-outline"
                            size={16}
                            color="#fff"
                          />
                          <Text style={styles.actionText}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => deleteCoupon(discount)}
                          disabled={deletingCouponId === discount.id}
                        >
                          {deletingCouponId === discount.id ? (
                            <PremiumLoader
                              size={18}
                              color="#fff"
                              showLabel={false}
                            />
                          ) : (
                            <>
                              <Ionicons
                                name="trash-outline"
                                size={16}
                                color="#fff"
                              />
                              <Text style={styles.actionText}>Delete</Text>
                            </>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
                {renderPagination(
                  currentPage,
                  totalPages,
                  goToCouponPage,
                  "coupon",
                  loadingDiscounts,
                )}
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
