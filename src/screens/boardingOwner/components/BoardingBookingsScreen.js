import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import { useRefresh } from "../../../context/RefreshContext";
import styles from "../styles/BoardingBookingsStyles";
import { getOwnerBookings } from "../services/boardingOwnerService";

export default function BoardingBookingsScreen({ navigation }) {
  const { refreshKey } = useRefresh();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { width } = useWindowDimensions();

  const numColumns = width >= 1200 ? 3 : width >= 768 ? 2 : 1;

  const cardWidth =
    numColumns === 1
      ? width - 32
      : numColumns === 2
        ? (width - 48) / 2
        : (width - 64) / 3;

  const loadBookings = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getOwnerBookings();

      if (response.status === "success") {
        setBookings(response.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadBookings();
    }, [loadBookings]),
  );

  useEffect(() => {
    loadBookings();
  }, [refreshKey, loadBookings]);

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
        <Text style={styles.petName}>{item.pet_name}</Text>

        <View
          style={[
            styles.statusBadge,
            item.status === "accepted" ? styles.accepted : styles.pending,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.info}>Owner: {item.user_name}</Text>
      <Text style={styles.info}>Pet Type: {item.pet_type}</Text>
      <Text style={styles.info}>Center: {item.center_name}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.priceText}>₹{item.total_price}</Text>
        <Text style={styles.date}>
          {item.start_date} → {item.end_date}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
        ListEmptyComponent={
          <Text style={styles.emptyText}>No bookings found</Text>
        }
      />
    </SafeAreaView>
  );
}
