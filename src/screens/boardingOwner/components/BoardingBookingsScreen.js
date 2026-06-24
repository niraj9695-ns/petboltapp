import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../styles/BoardingBookingsStyles";
import { getOwnerBookings } from "../services/boardingOwnerService";

export default function BoardingBookingsScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await getOwnerBookings();

      if (response.status === "success") {
        setBookings(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderBooking = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
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
        <Text style={styles.headerSubtitle}>Manage upcoming requests and stays</Text>
      </View>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBooking}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No bookings found</Text>
        }
      />
    </SafeAreaView>
  );
}
