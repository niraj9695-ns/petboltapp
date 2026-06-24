import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../styles/BookingDetailsScreen";

export default function BookingDetailsScreen({ route, navigation }) {
  const { booking } = route.params;

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
              booking.status === "accepted" ? styles.accepted : styles.pending,
            ]}
          >
            <Text style={styles.statusText}>{booking.status}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
