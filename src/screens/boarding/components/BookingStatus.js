import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Linking,
  Alert,
} from "react-native";
import PremiumLoader from "../../../components/PremiumLoader";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../constants/api";
import styles from "../styles/BookingStatus";
import { fetchMyBookingsApi } from "../services/boardingService";
import { fetchPetImagesApi } from "../../pets/services/imageService";

const normalizeBookingPetImage = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${BASE_URL}${url}`;
  return `${BASE_URL}/${url}`;
};

const getBookingPetId = (booking) => {
  return (
    booking?.pet?.pet_id ||
    booking?.pet?.id ||
    booking?.pet_id ||
    booking?.petId ||
    booking?.pet?.petId ||
    booking?.pet_info?.pet_id ||
    booking?.pet_info?.id ||
    booking?.pet_details?.pet_id ||
    booking?.pet_data?.pet_id
  );
};

const handleCallCenter = async (phoneNumber) => {
  if (!phoneNumber) {
    Alert.alert("Error", "Phone number not available");
    return;
  }

  try {
    await Linking.openURL(`tel:${phoneNumber}`);
  } catch (error) {
    Alert.alert("Contact Center", `Call on: ${phoneNumber}`);
  }
};

const getBookingPetImageUrl = (booking) => {
  let pet =
    booking?.pet ||
    booking?.pet_details ||
    booking?.pet_data ||
    booking?.petInfo ||
    booking?.pet_info ||
    booking?.pet_details?.pet ||
    booking?.pet_data?.pet ||
    booking?.pet_images ||
    booking?.images ||
    booking?.photos ||
    booking?.petPhotos;

  if (Array.isArray(pet) && pet.length > 0) {
    pet = pet[0];
  }

  if (!pet || typeof pet !== "object") {
    if (typeof pet === "string" && pet.trim()) {
      return normalizeBookingPetImage(pet.trim());
    }
    return "";
  }

  const candidateFields = [
    "profile_image",
    "pet_profile_image",
    "pet_image",
    "image",
    "image_url",
    "url",
    "imageUrl",
    "photo",
    "photo_url",
    "photoUrl",
    "avatar",
    "pet_avatar",
    "pet_photo",
    "pet_photo_url",
    "pet_image_path",
    "image_path",
    "thumbnail",
    "thumbnail_url",
  ];

  for (const field of candidateFields) {
    const value = pet[field];
    if (typeof value === "string" && value.trim()) {
      return normalizeBookingPetImage(value.trim());
    }
  }

  const listFields = [
    "images",
    "photos",
    "pet_images",
    "petPhotos",
    "pet_images_list",
    "images_list",
    "pet_photos",
    "media",
  ];

  for (const listField of listFields) {
    const arr = pet[listField];
    if (Array.isArray(arr) && arr.length > 0) {
      const imageObject = arr[0];
      if (imageObject && typeof imageObject === "object") {
        for (const field of candidateFields) {
          const value = imageObject[field];
          if (typeof value === "string" && value.trim()) {
            return normalizeBookingPetImage(value.trim());
          }
        }
      }
    }
  }

  return "";
};

export default function BookingStatus() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  const cardWidth = Math.min(width * 0.8, 420);

  const isMobile = width < 768;

  const [bookings, setBookings] = useState([]);
  const [petProfileImages, setPetProfileImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useFocusEffect(
    useCallback(() => {
      loadBookings(1, false);
    }, []),
  );

  const loadBookings = async (pageToLoad = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const token = await AsyncStorage.getItem("token");
      const result = await fetchMyBookingsApi(token, pageToLoad, 20);
      let bookingsData = Array.isArray(result?.bookings) ? result.bookings : [];

      bookingsData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      const pagination = result?.pagination || {};

      if (append) {
        setBookings((prev) => [...prev, ...bookingsData]);
      } else {
        setBookings(bookingsData);
        setCurrentPage(1);
      }
      setCurrentPage(Number(pagination.page || pageToLoad));
      setTotalPages(Number(pagination.total_pages || 1));

      const missingImagePetIds = bookingsData.reduce((acc, booking) => {
        const petId = getBookingPetId(booking);
        if (petId && !getBookingPetImageUrl(booking) && !acc.includes(petId)) {
          acc.push(petId);
        }
        return acc;
      }, []);

      if (missingImagePetIds.length > 0) {
        const imageResults = await Promise.all(
          missingImagePetIds.map(async (petId) => {
            const images = await fetchPetImagesApi(petId);
            const profileImage =
              images.find(
                (img) =>
                  img?.is_profile === "1" ||
                  img?.is_profile === 1 ||
                  img?.is_profile === true,
              ) || images[0];

            return [
              petId,
              profileImage?.image_url ||
                profileImage?.url ||
                profileImage?.image ||
                "",
            ];
          }),
        );

        setPetProfileImages(
          Object.fromEntries(imageResults.filter(([, url]) => url)) || {},
        );
      }
    } catch (error) {
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const hasMorePages = currentPage < totalPages;

  const getBookingType = (booking) => {
    const today = new Date();
    const start = new Date(booking.start_date);
    const end = new Date(booking.end_date);

    if (today < start) {
      return {
        type: "Upcoming",
        gradient: ["#60a5fa", "#2563eb"],
        bg: "#eff6ff",
        badgeBg: "#bfdbfe",
        badgeText: "#1d4ed8",
        iconColor: "#2563eb",
      };
    }

    if (today >= start && today <= end) {
      return {
        type: "Active Boarding",
        gradient: ["#4ade80", "#16a34a"],
        bg: "#f0fdf4",
        badgeBg: "#bbf7d0",
        badgeText: "#166534",
        iconColor: "#16a34a",
      };
    }

    return {
      type: "Completed",
      gradient: ["#c084fc", "#9333ea"],
      bg: "#faf5ff",
      badgeBg: "#e9d5ff",
      badgeText: "#6b21a8",
      iconColor: "#9333ea",
    };
  };

  if (loading) {
    return (
      <View style={styles.loaderScreen}>
        <PremiumLoader
          size={56}
          color="#9333ea"
          label="Loading booking status"
          fullScreen
        />
      </View>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <View
      style={[
        styles.bookingStatusContainer,
        {
          width: "100%",
        },
      ]}
    >
      <View style={styles.headerSection}>
        <Text style={styles.bookingStatusTitle}>Booking Status</Text>
        <Text style={styles.bookingStatusSubtitle}>
          Track all your pet's boarding reservations
        </Text>
      </View>

      {bookings.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <MaterialCommunityIcons
            name="calendar-check"
            size={64}
            color="#d1d5db"
          />
          <Text style={styles.emptyStateText}>No bookings yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Start booking a boarding center for your pet
          </Text>
        </View>
      ) : (
        <FlatList
          key={width}
          data={bookings}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            bookings.length === 1
              ? styles.singleCardContainer
              : styles.bookingListContainer
          }
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={
            hasMorePages ? (
              <View style={styles.paginationFooter}>
                <TouchableOpacity
                  style={styles.nextPageButton}
                  onPress={() => loadBookings(currentPage + 1, true)}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <PremiumLoader
                      size={18}
                      color="#ffffff"
                      showLabel={false}
                    />
                  ) : (
                    <Text style={styles.nextPageButtonText}>Load More</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : null
          }
          renderItem={({ item: booking }) => {
            const bookingInfo = getBookingType(booking);
            const bookingPetId = getBookingPetId(booking);
            const bookingPetImageUrl =
              getBookingPetImageUrl(booking) ||
              (bookingPetId ? petProfileImages[String(bookingPetId)] : "");

            const daysRemaining = Math.ceil(
              (new Date(booking.end_date) - new Date()) / (1000 * 60 * 60 * 24),
            );

            return (
              <LinearGradient
                colors={["#ffffff", "#f8fafc"]}
                style={[
                  styles.bookingStatusCard,
                  {
                    width: cardWidth,
                    flexShrink: 0,
                  },
                ]}
              >
                {/* HEADER ROW */}
                <View style={styles.cardHeaderRow}>
                  <View style={styles.petInfoSection}>
                    {bookingPetImageUrl ? (
                      <Image
                        source={{ uri: bookingPetImageUrl }}
                        style={styles.bookingStatusPetImage}
                      />
                    ) : (
                      <LinearGradient
                        colors={bookingInfo.gradient}
                        style={styles.bookingStatusIconBox}
                      >
                        <Text style={styles.bookingStatusPetEmoji}>
                          {booking.pet?.pet_type === "dog" ? "🐶" : "🐱"}
                        </Text>
                      </LinearGradient>
                    )}

                    <View style={styles.petNameSection}>
                      <Text style={styles.bookingStatusPetName}>
                        {booking.pet?.pet_name}
                      </Text>
                      <Text style={styles.petBreedText}>
                        {booking.pet?.breed || "Pet"}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.statusBadgeContainer,
                      { backgroundColor: bookingInfo.badgeBg },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={
                        bookingInfo.type === "Upcoming"
                          ? "calendar-clock"
                          : bookingInfo.type === "Active Boarding"
                            ? "check-circle"
                            : "check-all"
                      }
                      size={16}
                      color={bookingInfo.badgeText}
                      style={{ marginRight: 6 }}
                    />
                    <Text
                      style={[
                        styles.bookingStatusBadgeText,
                        { color: bookingInfo.badgeText },
                      ]}
                    >
                      {bookingInfo.type}
                    </Text>
                  </View>
                </View>

                {/* DIVIDER */}
                <View style={styles.cardDivider} />

                {/* CENTER INFO */}
                <View style={styles.infoSection}>
                  <MaterialCommunityIcons
                    name="home"
                    size={18}
                    color={bookingInfo.iconColor}
                    style={{ marginRight: 10 }}
                  />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Boarding Center</Text>
                    <Text style={styles.infoValue}>
                      {booking.center?.center_name}
                    </Text>
                  </View>
                </View>

                {/* DATES ROW */}
                <View style={styles.datesRow}>
                  <View style={styles.dateBox}>
                    <Text style={styles.dateLabel}>Check In</Text>
                    <View style={styles.dateContent}>
                      <MaterialCommunityIcons
                        name="calendar-check"
                        size={16}
                        color={bookingInfo.iconColor}
                        style={{ marginRight: 6 }}
                      />
                      <Text style={styles.dateValue}>
                        {formatDate(booking.start_date)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dateArrow}>
                    <MaterialCommunityIcons
                      name="arrow-right"
                      size={20}
                      color="#cbd5e1"
                    />
                  </View>

                  <View style={styles.dateBox}>
                    <Text style={styles.dateLabel}>Check Out</Text>
                    <View style={styles.dateContent}>
                      <MaterialCommunityIcons
                        name="calendar-remove"
                        size={16}
                        color={bookingInfo.iconColor}
                        style={{ marginRight: 6 }}
                      />
                      <Text style={styles.dateValue}>
                        {formatDate(booking.end_date)}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* DETAILS GRID */}
                {isMobile ? (
                  <View style={styles.mobileDetailsCard}>
                    <View style={styles.mobileDetailRow}>
                      <Text style={styles.mobileDetailLabel}>Duration</Text>
                      <Text style={styles.mobileDetailValue}>
                        {booking.total_days} days
                      </Text>
                    </View>

                    <View style={styles.mobileDetailRow}>
                      <Text style={styles.mobileDetailLabel}>Status</Text>
                      <Text
                        style={[
                          styles.mobileDetailValue,
                          { color: bookingInfo.badgeText },
                        ]}
                      >
                        {booking.status}
                      </Text>
                    </View>

                    <View style={styles.mobileDetailRow}>
                      <Text style={styles.mobileDetailLabel}>Total Cost</Text>
                      <Text
                        style={[
                          styles.mobileDetailValue,
                          { color: bookingInfo.gradient[1] },
                        ]}
                      >
                        ₹{booking.total_price}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.detailsGrid}>
                    <View style={styles.detailBox}>
                      <Text style={styles.detailLabel}>Duration</Text>
                      <View style={styles.detailValueRow}>
                        <Text style={styles.detailValue}>
                          {booking.total_days}
                        </Text>
                        <Text style={styles.detailUnit}>days</Text>
                      </View>
                    </View>

                    <View style={styles.gridDivider} />

                    <View style={styles.detailBox}>
                      <Text style={styles.detailLabel}>Status</Text>
                      <Text
                        style={[
                          styles.detailValue,
                          { color: bookingInfo.badgeText },
                        ]}
                      >
                        {booking.status?.toUpperCase()}
                      </Text>
                    </View>

                    <View style={styles.gridDivider} />

                    <View style={styles.detailBox}>
                      <Text style={[styles.detailValue, styles.costValue]}>
                        ₹{booking.total_price}
                      </Text>
                    </View>
                  </View>
                )}

                {/* PROGRESS BAR FOR ACTIVE BOOKINGS */}
                {bookingInfo.type === "Active Boarding" && (
                  <View style={styles.progressSection}>
                    <View style={styles.progressLabel}>
                      <Text style={styles.progressText}>
                        {daysRemaining > 0
                          ? `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} remaining`
                          : "Last day"}
                      </Text>
                    </View>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${Math.max(
                              0,
                              Math.min(
                                100,
                                100 -
                                  (daysRemaining /
                                    parseInt(booking.total_days)) *
                                    100,
                              ),
                            )}%`,
                            backgroundColor: bookingInfo.gradient[1],
                          },
                        ]}
                      />
                    </View>
                  </View>
                )}

                {/* UPCOMING COUNTDOWN */}
                {bookingInfo.type === "Upcoming" && (
                  <View style={styles.countdownSection}>
                    <MaterialCommunityIcons
                      name="information"
                      size={16}
                      color="#6366f1"
                      style={{ marginRight: 8 }}
                    />
                    <Text style={styles.countdownText}>
                      Booking starts in{" "}
                      {Math.ceil(
                        (new Date(booking.start_date) - new Date()) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      days
                    </Text>
                  </View>
                )}

                {/* ACTION BUTTONS */}
                <View style={styles.actionButtonsRow}>
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() =>
                      handleCallCenter(booking.center?.primary_contact_number)
                    }
                  >
                    <MaterialCommunityIcons
                      name="phone"
                      size={18}
                      color="#6b21a8"
                    />
                    <Text style={styles.secondaryButtonText}>Contact</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => {
                      const centerId =
                        booking?.center?.id ||
                        booking?.center_id ||
                        booking?.centerId;
                      if (!centerId) {
                        Alert.alert(
                          "Not available",
                          "Center details not available.",
                        );
                        return;
                      }
                      navigation.navigate("Boarding", {
                        screen: "BoardingDetails",
                        params: { centerId },
                      });
                    }}
                  >
                    <MaterialCommunityIcons
                      name="file-document"
                      size={18}
                      color="#6b21a8"
                    />
                    <Text style={styles.secondaryButtonText}>Details</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            );
          }}
        />
      )}
    </View>
  );
}
