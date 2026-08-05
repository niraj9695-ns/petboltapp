import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Linking,
  useWindowDimensions,
} from "react-native";
import PremiumLoader from "../../../components/PremiumLoader";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/CenterDetailsScreenStyles";
import { getCenterDetails } from "../services/boardingOwnerService";
import { boardingOwnerTheme } from "../../../styles/themeStyles";

export default function CenterDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { centerId, refreshKey } = route.params || {};

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    operations: false,
    health: false,
    amenities: false,
    documents: false,
  });

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;
  const isDesktop = width >= 1200;

  const contentWidth = isDesktop ? 900 : isTablet ? 700 : width - 32;

  const imageWidth = contentWidth;
  const imageHeight = isTablet ? 380 : 260;

  useEffect(() => {
    if (centerId) {
      loadCenter();
    }
  }, [centerId, refreshKey]);

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const loadCenter = async () => {
    try {
      const response = await getCenterDetails(centerId);
      const data = response?.data || response;
      setCenter(data);
    } catch (error) {
      Alert.alert("Error", "Unable to load center details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: boardingOwnerTheme.background }} edges={["left","right","bottom"]}>
        <View style={styles.loader}>
          <PremiumLoader size={56} color={boardingOwnerTheme.primary} label="Loading center" fullScreen />
        </View>
      </SafeAreaView>
    );
  }

  if (!center) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }} edges={["left","right","bottom"]}>
        <View style={styles.loader}>
          <Text>Center details not found</Text>
        </View>
      </SafeAreaView>
    );
  }

      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }} edges={["left","right","bottom"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: contentWidth }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{center.center_name}</Text>
          </View>

          <View style={styles.imageContainer}>
            <FlatList
              style={{ width: imageWidth }}
              data={center?.center_photos || []}
              horizontal
              pagingEnabled
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              onMomentumScrollEnd={(event) => {
                const screenWidth = event.nativeEvent.layoutMeasurement.width;
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / screenWidth,
                );
                setActiveIndex(index);
              }}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={{
                    width: imageWidth,
                    height: imageHeight,
                    borderRadius: 16,
                  }}
                  resizeMode="cover"
                />
              )}
            />

            {center?.center_photos?.length > 0 && (
              <View style={styles.counterContainer}>
                <Text style={styles.counterText}>
                  {activeIndex + 1} / {center.center_photos.length}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.card}>
            <SectionBlock
              id="basic"
              title="Basic Details"
              subtitle="Core center info"
              expanded={expandedSections.basic}
              onToggle={toggleSection}
            >
              <Info label="Center Name" value={center.center_name} />
              <Info label="Description" value={center.description} />
              <Info label="Center Type" value={center.center_type} />
              <Info
                label="Base Price Per Day"
                value={center.price_per_day ? `₹${center.price_per_day}` : null}
              />
              <Info label="Daily Capacity" value={center.daily_capacity} />
              <Info label="Total Capacity" value={center.total_capacity} />
              <Info label="Address" value={center.address} />
              <Info label="Address Line 2" value={center.address_line_2} />
              <Info label="City" value={center.city} />
              <Info label="State" value={center.state} />
              <Info label="Zip Code" value={center.zip_code} />
              <Info
                label="Primary Contact"
                value={center.primary_contact_number}
              />
              <Info label="Email Address" value={center.email_address} />
              <Info
                label="Status"
                value={center.is_active === "1" ? "🟢 Active" : "🔴 Inactive"}
              />
            </SectionBlock>

            <SectionBlock
              id="operations"
              title="Operations & Contacts"
              subtitle="Hours and contact details"
              expanded={expandedSections.operations}
              onToggle={toggleSection}
            >
              <Info
                label="Registration License Number"
                value={center.registration_license_number}
              />
              <Info label="Property Type" value={center.property_type} />
              <Info label="Fencing Status" value={center.fencing_status} />
              <Info
                label="Supervision Level"
                value={center.supervision_level}
              />
              <Info
                label="Vaccination Policy"
                value={center.vaccination_policy}
              />
              <Info label="Opening Time" value={center.opening_time} />
              <Info label="Closing Time" value={center.closing_time} />
              <Info label="Latitude" value={center.latitude} />
              <Info label="Longitude" value={center.longitude} />
              <Info
                label="Service Area Radius"
                value={center.service_area_radius}
              />
              {center?.pet_type_prices &&
              Object.keys(center.pet_type_prices).length > 0 ? (
                <View style={{ marginTop: 8, marginBottom: 4 }}>
                  <Text style={styles.sectionTitle}>Pet Type Prices</Text>
                  {Object.entries(center.pet_type_prices).map(
                    ([petType, price]) => (
                      <View
                        key={petType}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingVertical: 8,
                          borderBottomWidth: 1,
                          borderBottomColor: "#f3f4f6",
                        }}
                      >
                        <Text
                          style={{
                            color: "#374151",
                            textTransform: "capitalize",
                          }}
                        >
                          {petType}
                        </Text>
                        <Text style={{ color: boardingOwnerTheme.primary, fontWeight: "700" }}>
                          {price ? `₹${price}` : "Not set"}
                        </Text>
                      </View>
                    ),
                  )}
                </View>
              ) : null}
            </SectionBlock>

            <SectionBlock
              id="health"
              title="Health & Insurance"
              subtitle="Vet and policy details"
              expanded={expandedSections.health}
              onToggle={toggleSection}
            >
              <Info label="Vet Clinic Name" value={center.vet_clinic_name} />
              <Info
                label="Vet Clinic Address"
                value={center.vet_clinic_address}
              />
              <Info
                label="Vet Clinic Contact"
                value={center.vet_clinic_contact}
              />
              <Info
                label="Insurance Policy Number"
                value={center.insurance_policy_number}
              />
              <Info
                label="Insurance Provider"
                value={center.insurance_provider_name}
              />
              <Info
                label="Insurance Expiry Date"
                value={center.insurance_expiry_date}
              />
            </SectionBlock>

            <SectionBlock
              id="amenities"
              title="Amenities & Services"
              subtitle="Special notes and service options"
              expanded={expandedSections.amenities}
              onToggle={toggleSection}
            >
              <Info
                label="Special Instructions"
                value={center.special_instructions}
              />
              <Info
                label="Amenities"
                value={
                  Array.isArray(center.amenities)
                    ? center.amenities.join(", ")
                    : center.amenities
                }
              />
              <Info
                label="Accepted Pet Types"
                value={
                  Array.isArray(center.accepted_pet_types)
                    ? center.accepted_pet_types.join(", ")
                    : center.accepted_pet_types
                }
              />
              <Info
                label="Size Weight Restrictions"
                value={center.size_weight_restrictions}
              />
              <Info label="Age Preferences" value={center.age_preferences} />
              <Info
                label="Required Vaccines"
                value={
                  Array.isArray(center.required_vaccines)
                    ? center.required_vaccines.join(", ")
                    : center.required_vaccines
                }
              />
              <Info
                label="Boarding Services"
                value={
                  Array.isArray(center.boarding_services)
                    ? center.boarding_services.join(", ")
                    : center.boarding_services
                }
              />
            </SectionBlock>

            <SectionBlock
              id="documents"
              title="Documents & Files"
              subtitle="License and supporting docs"
              expanded={expandedSections.documents}
              onToggle={toggleSection}
            >
              {center.license_proof ? (
                <>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#f3f4f6",
                      padding: 14,
                      borderRadius: 12,
                      marginTop: 4,
                    }}
                    onPress={() => Linking.openURL(center.license_proof)}
                  >
                    <Text style={{ color: "#6b21a8", fontWeight: "700" }}>
                      📄 View License Document
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.documentHint}>
                    Official license scanned document available for review.
                  </Text>
                </>
              ) : (
                <Text style={styles.value}>No document uploaded</Text>
              )}
            </SectionBlock>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("UpdateCenter", { centerId })}
          >
            <Text style={styles.editButtonText}>Edit Center</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SectionBlock = ({
  id,
  title,
  subtitle,
  expanded,
  onToggle,
  children,
}) => (
  <View style={styles.sectionCard}>
    <TouchableOpacity
      style={styles.sectionHeaderButton}
      onPress={() => onToggle(id)}
      activeOpacity={0.9}
    >
      <View style={styles.sectionHeaderTextWrap}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.sectionChevron}>{expanded ? "−" : "+"}</Text>
    </TouchableOpacity>
    {expanded ? <View style={styles.sectionBody}>{children}</View> : null}
  </View>
);

const Info = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || "-"}</Text>
  </View>
);
