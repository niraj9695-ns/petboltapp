import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import PremiumLoader from "../../../components/PremiumLoader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import { useRefresh } from "../../../context/RefreshContext";
import styles from "../styles/BoardingBookingsStyles";
import { getOwnerBookings } from "../services/boardingOwnerService";
import { requireAuth } from "../../../utils/guestGuard";
import { boardingOwnerTheme } from "../../../styles/themeStyles";

export default function BoardingBookingsScreen({ navigation }) {
  const { refreshKey } = useRefresh();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const { width } = useWindowDimensions();

  const numColumns = width >= 1200 ? 3 : width >= 768 ? 2 : 1;

  const cardWidth =
    numColumns === 1
      ? width - 32
      : numColumns === 2
        ? (width - 48) / 2
        : (width - 64) / 3;

  const loadBookings = useCallback(async (page = 1, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await getOwnerBookings(page, 20);
      const payload = response?.data || response || {};

      const data = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload?.bookings)
          ? payload.bookings
          : Array.isArray(payload)
            ? payload
            : [];

      const pagination = payload?.pagination || response?.pagination || {};
      const backendTotalPages = Number(
        pagination?.total_pages ||
          payload?.total_pages ||
          response?.total_pages ||
          1,
      );

      setBookings((prev) => (append ? [...prev, ...data] : data));
      setCurrentPage(Number(pagination?.page || page || 1));
      setTotalPages(
        Number.isFinite(backendTotalPages) && backendTotalPages > 0
          ? backendTotalPages
          : 1,
      );
      setTotalItems(
        Number(
          pagination?.total ||
            payload?.total ||
            response?.total ||
            data.length ||
            0,
        ),
      );
    } catch (error) {
      setBookings((prev) => (append ? prev : []));
      setCurrentPage(append ? currentPage : 1);
      setTotalPages(append ? totalPages : 1);
      setTotalItems(append ? totalItems : 0);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [currentPage, totalPages, totalItems]);

  useFocusEffect(
    useCallback(() => {
      const checkAccess = async () => {
        const canAccess = await requireAuth(navigation);
        if (!canAccess) {
          setLoading(false);
          return;
        }
        loadBookings();
      };

      checkAccess();
    }, [loadBookings, navigation]),
  );

  useEffect(() => {
    const checkAccess = async () => {
      const canAccess = await requireAuth(navigation);
      if (!canAccess) {
        setLoading(false);
        return;
      }
      loadBookings();
    };

    checkAccess();
  }, [refreshKey, loadBookings, navigation]);

  const renderBooking = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          width: cardWidth,
        },
      ]}
      onPress={() =>
        navigation.navigate("BookingDetails", {
          booking: item,
        })
      }
    >
      <View style={styles.row}>
        <Text style={styles.petName}>
          {item.pet_name || item.pet?.pet_name || "Booking"}
        </Text>

        <View
          style={[
            styles.statusBadge,
            (item.status || item.booking_status || "pending") === "accepted"
              ? styles.accepted
              : styles.pending,
          ]}
        >
          <Text style={styles.statusText}>
            {item.status || item.booking_status || "pending"}
          </Text>
        </View>
      </View>

      <Text style={styles.info}>
        Owner: {item.user_name || item.owner_name || "-"}
      </Text>
      <Text style={styles.info}>
        Pet Type: {item.pet_type || item.pet?.pet_type || "-"}
      </Text>
      <Text style={styles.info}>
        Center: {item.center_name || item.center?.center_name || "-"}
      </Text>

      <View style={styles.priceRow}>
        <Text style={styles.priceText}>
          ₹{item.total_price || item.price || 0}
        </Text>
        <Text style={styles.date}>
          {item.start_date || item.check_in_date || "-"} →{" "}
          {item.end_date || item.check_out_date || "-"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <PremiumLoader size={56} color={boardingOwnerTheme.primary} label="Loading bookings" fullScreen />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["left","right","bottom"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookings</Text>
        <Text style={styles.headerSubtitle}>
          Manage upcoming requests and stays
        </Text>
      </View>
      <FlatList
        data={bookings}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBooking}
        columnWrapperStyle={
          numColumns > 1
            ? {
                justifyContent: "space-between",
                marginBottom: 12,
              }
            : undefined
        }
        contentContainerStyle={styles.list}
        onEndReached={() => {
          if (!loading && !loadingMore && currentPage < totalPages) {
            loadBookings(currentPage + 1, true);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footerLoader}>
              <PremiumLoader size={36} color={boardingOwnerTheme.primary} />
            </View>
          ) : null
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No bookings found</Text>
        }
      />
    </SafeAreaView>
  );
}
