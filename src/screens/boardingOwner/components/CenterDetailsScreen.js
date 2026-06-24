import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/CenterDetailsScreenStyles";
import { getCenterDetails } from "../services/boardingOwnerService";

export default function CenterDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { centerId, refreshKey } = route.params || {};

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (centerId) {
      loadCenter();
    }
  }, [centerId, refreshKey]);

  const loadCenter = async () => {
    try {
      const response = await getCenterDetails(centerId);
      const data = response?.data || response;
      setCenter(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to load center details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#6b21a8" />
        </View>
      </SafeAreaView>
    );
  }

  if (!center) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        <View style={styles.loader}>
          <Text>Center details not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{center.center_name}</Text>
        </View>

        <View style={styles.imageContainer}>
          <FlatList
            data={center?.center_photos || []}
            horizontal
            pagingEnabled
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={(event) => {
              const screenWidth = event.nativeEvent.layoutMeasurement.width;
              const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
              setActiveIndex(index);
            }}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.sliderImage} resizeMode="cover" />
            )}
          />

          {center?.center_photos?.length > 0 && (
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>{activeIndex + 1} / {center.center_photos.length}</Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Center Information</Text>
          <Info label="Center Name" value={center.center_name} />
          <Info label="Description" value={center.description} />
          <Info label="Center Type" value={center.center_type} />
          <Info label="Price Per Day" value={`₹${center.price_per_day}`} />
          <Info label="Daily Capacity" value={center.daily_capacity} />
          <Info label="Total Capacity" value={center.total_capacity} />
          <Info label="Address" value={center.address} />
          <Info label="Address Line 2" value={center.address_line_2} />
          <Info label="City" value={center.city} />
          <Info label="State" value={center.state} />
          <Info label="Zip Code" value={center.zip_code} />
          <Info label="Primary Contact" value={center.primary_contact_number} />
          <Info label="Email Address" value={center.email_address} />
          <Info label="Registration License Number" value={center.registration_license_number} />
          <Info label="Property Type" value={center.property_type} />
          <Info label="Fencing Status" value={center.fencing_status} />
          <Info label="Supervision Level" value={center.supervision_level} />
          <Info label="Vaccination Policy" value={center.vaccination_policy} />
          <Info label="Vet Clinic Name" value={center.vet_clinic_name} />
          <Info label="Vet Clinic Address" value={center.vet_clinic_address} />
          <Info label="Vet Clinic Contact" value={center.vet_clinic_contact} />
          <Info label="Insurance Policy Number" value={center.insurance_policy_number} />
          <Info label="Insurance Provider" value={center.insurance_provider_name} />
          <Info label="Insurance Expiry Date" value={center.insurance_expiry_date} />
          <Info label="Special Instructions" value={center.special_instructions} />
          <Info label="Opening Time" value={center.opening_time} />
          <Info label="Closing Time" value={center.closing_time} />
          <Info label="Latitude" value={center.latitude} />
          <Info label="Longitude" value={center.longitude} />
          <Info label="Status" value={center.is_active === "1" ? "🟢 Active" : "🔴 Inactive"} />

          <Text style={styles.sectionTitle}>Documents</Text>
          {center.license_proof ? (
            <TouchableOpacity
              style={{ backgroundColor: "#f3f4f6", padding: 14, borderRadius: 12, marginBottom: 12 }}
              onPress={() => Linking.openURL(center.license_proof)}
            >
              <Text style={{ color: "#6b21a8", fontWeight: "700" }}>📄 View License Document</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("UpdateCenter", { centerId })}
        >
          <Text style={styles.editButtonText}>Edit Center</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const Info = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || "-"}</Text>
  </View>
);
