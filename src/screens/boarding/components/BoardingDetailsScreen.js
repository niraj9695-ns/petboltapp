import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  useWindowDimensions,
} from "react-native";

import PremiumLoader from "../../../components/PremiumLoader";
import BackButton from "../../../components/BackButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

import styles from "../styles/BoardingDetailsScreen";
import {
  fetchBoardingCenterByIdApi,
  fetchCapacityApi,
} from "../services/boardingService";

export default function BoardingDetailsScreen({ route, navigation }) {
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;
  const isDesktop = width >= 1200;
  const { centerId } = route.params;

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [capacity, setCapacity] = useState(null);
  const [capacityLoading, setCapacityLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchDetails();
    loadCapacity();
  }, [centerId]);

  const loadCapacity = async () => {
    try {
      setCapacityLoading(true);

      const data = await fetchCapacityApi(centerId);

      setCapacity(data);
    } catch (error) {
    } finally {
      setCapacityLoading(false);
    }
  };

  const fetchDetails = async () => {
    try {
      const data = await fetchBoardingCenterByIdApi(centerId);
      setCenter(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const photoList = Array.isArray(center?.images)
    ? center.images
    : Array.isArray(center?.center_photos)
      ? center.center_photos
      : [];

  const handleImageScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    if (index !== currentImageIndex) {
      setCurrentImageIndex(index);
    }
  };

  const handleBookingPress = async () => {
    const guestRole = await AsyncStorage.getItem("guestRole");
    if (guestRole) {
      Alert.alert(
        "Sign in required",
        "Please sign in or sign up to book this center.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Sign In / Sign Up",
            onPress: () => navigation.navigate("Auth"),
          },
        ],
      );
      return;
    }

    navigation.navigate("BoardingBooking", {
      centerId: center.id,
      centerName: center.center_name,
      pricePerDay: center.price_per_day,
      centerType: center.center_type,
    });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <PremiumLoader
          size={56}
          color="#6b21a8"
          label="Loading details"
          fullScreen
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      {/* IMAGE SLIDER */}

      {photoList.length > 0 ? (
        <View style={styles.sliderContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleImageScroll}
          >
            {photoList.map((img, index) => (
              <View
                key={`${img}-${index}`}
                style={[
                  styles.sliderImageWrapper,
                  {
                    width,
                    height: width >= 1200 ? 500 : width >= 768 ? 420 : 320,
                  },
                ]}
              >
                <Image
                  source={{ uri: img }}
                  style={styles.sliderImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={[
                    "rgba(15, 23, 42, 0)",
                    "rgba(15, 23, 42, 0.22)",
                    "rgba(15, 23, 42, 0.58)",
                  ]}
                  style={styles.sliderOverlay}
                />
              </View>
            ))}
          </ScrollView>

          <View style={styles.backButtonOverlay}>
            <BackButton fallbackRoute="Booking" />
          </View>

          <View style={styles.sliderCountBadge}>
            <Text style={styles.sliderCountText}>
              {currentImageIndex + 1} / {photoList.length}
            </Text>
          </View>

          {photoList.length > 1 && (
            <View style={styles.sliderDots}>
              {photoList.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.sliderDot,
                    index === currentImageIndex && styles.sliderDotActive,
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      ) : (
        <View style={styles.loaderContainer}>
          <Text style={styles.desc}>No images available</Text>
        </View>
      )}

      <View
        style={{
          alignItems: "center",
        }}
      >
        <LinearGradient
          colors={["#faf5ff", "#fdf2f8", "#fff7ed"]}
          style={[
            styles.detailsContainer,
            {
              width: "100%",
              maxWidth: 1100,
            },
          ]}
        >
          {/* TITLE */}

          <Text style={styles.title}>{center.center_name}</Text>

          <Text style={styles.desc}>{center.description}</Text>

          {/* PET TYPE PRICING */}

          {center.pet_type_prices &&
            Object.keys(center.pet_type_prices).length > 0 && (
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Pet Type Pricing</Text>

                {Object.entries(center.pet_type_prices).map(
                  ([petType, price]) => (
                    <View key={petType}>
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>
                          {petType.charAt(0).toUpperCase() + petType.slice(1)}
                        </Text>
                        <Text style={styles.price}>₹{price}/day</Text>
                      </View>
                      {Object.entries(center.pet_type_prices).slice(
                        -1,
                      )[0][0] !== petType && <View style={styles.divider} />}
                    </View>
                  ),
                )}
              </View>
            )}

          {/* ADDRESS */}

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Address</Text>

            <Text style={styles.addressInfoText}>📍 {center.address}</Text>

            {!!center.address_line_2 && (
              <Text style={[styles.addressInfoText, styles.addressLine]}>
                {center.address_line_2}
              </Text>
            )}

            <Text style={[styles.addressInfoText, styles.addressLine]}>
              {center.city}, {center.state} - {center.zip_code}
            </Text>
          </View>

          {/* TIMINGS */}

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Working Hours</Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Timings</Text>

              <Text style={styles.infoText}>
                {center.opening_time} - {center.closing_time}
              </Text>
            </View>
          </View>

          {/* AMENITIES */}

          {center.amenities && center.amenities.length > 0 && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Amenities</Text>

              <View style={styles.amenitiesContainer}>
                {center.amenities.map((item, index) => (
                  <View key={index} style={styles.amenityBox}>
                    <Text style={styles.amenityText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* SERVICES OFFERED */}

          {center.boarding_services && center.boarding_services.length > 0 && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Services Offered</Text>

              <View style={styles.amenitiesContainer}>
                {center.boarding_services.map((service, index) => (
                  <View key={index} style={styles.serviceBox}>
                    <Text style={styles.serviceText}>{service}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* PROPERTY DETAILS */}

          {(center.property_type ||
            center.fencing_status ||
            center.supervision_level) && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Property Details</Text>

              {center.property_type && (
                <>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Type</Text>
                    <Text style={styles.infoText}>{center.property_type}</Text>
                  </View>
                  <View style={styles.divider} />
                </>
              )}

              {center.fencing_status && (
                <>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Fencing</Text>
                    <Text style={styles.infoText}>{center.fencing_status}</Text>
                  </View>
                  <View style={styles.divider} />
                </>
              )}

              {center.supervision_level && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Supervision</Text>
                  <Text style={styles.infoText}>
                    {center.supervision_level}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* VACCINATION & HEALTH POLICY */}

          {(center.vaccination_policy || center.required_vaccines) && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>
                Health & Vaccination Policy
              </Text>

              {center.vaccination_policy && (
                <>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Policy</Text>
                    <Text style={styles.infoText}>
                      {center.vaccination_policy}
                    </Text>
                  </View>
                  <View style={styles.divider} />
                </>
              )}

              {center.required_vaccines &&
                center.required_vaccines.length > 0 && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Vaccines Required</Text>
                    <Text style={styles.infoText}>
                      {center.required_vaccines.join(", ")}
                    </Text>
                  </View>
                )}
            </View>
          )}

          {/* CONTACT INFORMATION */}

          {(center.primary_contact_number ||
            center.email_address ||
            center.website_url) && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Contact Information</Text>

              {center.primary_contact_number && (
                <>
                  <TouchableOpacity
                    style={styles.contactRow}
                    onPress={() =>
                      Linking.openURL(`tel:${center.primary_contact_number}`)
                    }
                  >
                    <Text style={styles.label}>📞 Phone</Text>
                    <Text style={[styles.infoText, styles.contactLink]}>
                      {center.primary_contact_number}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.divider} />
                </>
              )}

              {center.email_address && (
                <>
                  <TouchableOpacity
                    style={styles.contactRow}
                    onPress={() =>
                      Linking.openURL(`mailto:${center.email_address}`)
                    }
                  >
                    <Text style={styles.label}>📧 Email</Text>
                    <Text style={[styles.infoText, styles.contactLink]}>
                      {center.email_address}
                    </Text>
                  </TouchableOpacity>
                  {center.website_url && <View style={styles.divider} />}
                </>
              )}

              {center.website_url && (
                <TouchableOpacity
                  style={styles.contactRow}
                  onPress={() => Linking.openURL(center.website_url)}
                >
                  <Text style={styles.label}>🌐 Website</Text>
                  <Text style={[styles.infoText, styles.contactLink]}>
                    Visit Website
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* SPECIAL INSTRUCTIONS */}

          {center.special_instructions && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Special Instructions</Text>
              <Text style={styles.instructionsText}>
                {center.special_instructions}
              </Text>
            </View>
          )}

          {/* LICENSE INFORMATION */}

          {(center.registration_license_number || center.license_proof) && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Registration & License</Text>

              {center.registration_license_number && (
                <>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>License Number</Text>
                    <Text style={styles.infoText}>
                      {center.registration_license_number}
                    </Text>
                  </View>
                  {center.license_proof && <View style={styles.divider} />}
                </>
              )}

              {center.license_proof && (
                <TouchableOpacity
                  style={styles.licenseLink}
                  onPress={() => Linking.openURL(center.license_proof)}
                >
                  <Text style={styles.licenseLinkText}>
                    📄 View License Document
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* BOOKING BUTTON */}

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleBookingPress}
          >
            <Text style={styles.primaryBtnText}>Book Now</Text>
          </TouchableOpacity>

          <View style={styles.spacing} />
        </LinearGradient>
      </View>
    </ScrollView>
  );
}
