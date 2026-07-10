import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../styles/BookingDetailsScreen";
import { rejectBooking } from "../services/boardingOwnerService";

export default function BookingDetailsScreen({ route, navigation }) {
  const [booking, setBooking] = useState(route.params.booking);
  const [rejectReason, setRejectReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      Alert.alert("Reason required", "Please enter a reason for rejecting this booking.");
      return;
    }

    setLoading(true);

    try {
      const response = await rejectBooking(booking.id, rejectReason.trim());

      if (response.status === "success") {
        setBooking({ ...booking, status: "rejected" });
        Alert.alert("Booking rejected", "The booking request has been rejected successfully.", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
        return;
      }

      throw new Error(response.message || "Unable to reject booking.");
    } catch (error) {
      Alert.alert("Reject failed", error.message || "Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const bookingStatus = String(booking.status || booking.booking_status || "").trim().toLowerCase();
  const canReject = !["accepted", "rejected", "cancelled", "completed"].includes(bookingStatus);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 12 }}>
          <Text style={{ color: "#6b21a8", fontWeight: "700" }}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>{booking.pet_name}</Text>
          <Text style={styles.heroSubtitle}>{booking.center_name}</Text>
        </View>

        <View style={styles.actionPanel}>
          <Text style={styles.sectionTitle}>Reject Booking</Text>
          <Text style={styles.helperText}>
            {canReject
              ? "If this request cannot be accepted, provide a clear reason and reject it now."
              : "This booking cannot be rejected because it has already been finalized."}
          </Text>
          <TextInput
            style={[styles.rejectInput, !canReject && styles.disabledInput]}
            value={rejectReason}
            onChangeText={setRejectReason}
            placeholder="Enter rejection reason"
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            editable={canReject && !loading}
          />
          <TouchableOpacity
            style={[styles.rejectButton, !canReject && styles.disabledButton]}
            onPress={handleReject}
            disabled={!canReject || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.rejectButtonText}>{canReject ? "Reject Booking" : "Cannot Reject"}</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Guest Details</Text>
          <Text style={styles.label}>Owner</Text>
          <Text style={styles.value}>{booking.user_name}</Text>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{booking.user_phone}</Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{booking.user_email}</Text>

          <Text style={styles.sectionTitle} style={{ marginTop: 16 }}>Pet Details</Text>
          <Text style={styles.label}>Pet Type</Text>
          <Text style={styles.value}>{booking.pet_type}</Text>
          <Text style={styles.label}>Breed</Text>
          <Text style={styles.value}>{booking.breed}</Text>

          <Text style={styles.sectionTitle} style={{ marginTop: 16 }}>Stay Details</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Start Date</Text>
              <Text style={styles.value}>{booking.start_date}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>End Date</Text>
              <Text style={styles.value}>{booking.end_date}</Text>
            </View>
          </View>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{booking.city}, {booking.state}</Text>
          <Text style={styles.label}>Total Days</Text>
          <Text style={styles.value}>{booking.total_days}</Text>
          <Text style={styles.label}>Price Per Day</Text>
          <Text style={styles.value}>₹{booking.price_per_day}</Text>

          <Text style={styles.totalPrice}>Total Price: ₹{booking.total_price}</Text>

          <View
            style={[
              styles.statusBadge,
              booking.status === "accepted"
                ? styles.accepted
                : booking.status === "rejected"
                ? styles.rejected
                : styles.pending,
            ]}
          >
            <Text style={styles.statusText}>{booking.status}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
