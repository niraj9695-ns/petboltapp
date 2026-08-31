import React, { useState, useCallback } from "react";
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
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import PremiumLoader from "../../../components/PremiumLoader";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BASE_URL from "../constants/api";
import styles from "../styles/BookingStatus";

import { fetchMyBookingsApi } from "../services/boardingService";
import { fetchPetImagesApi } from "../../pets/services/imageService";

/* =========================================================
   IMAGE URL NORMALIZER
========================================================= */

const normalizeBookingPetImage = (url) => {
  if (!url) return "";

  const imageUrl = String(url).trim();

  if (!imageUrl) return "";

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("//")) {
    return `https:${imageUrl}`;
  }

  if (imageUrl.startsWith("/")) {
    return `${BASE_URL}${imageUrl}`;
  }

  return `${BASE_URL}/${imageUrl}`;
};

/* =========================================================
   GET BOOKING ID
========================================================= */

const getBookingId = (booking, index = 0) => {
  return (
    booking?.id ??
    booking?.booking_id ??
    booking?.bookingId ??
    `booking-${index}`
  );
};

/* =========================================================
   GET PET ID
========================================================= */

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

/* =========================================================
   CALL BOARDING CENTER
========================================================= */

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

/* =========================================================
   GET PET IMAGE FROM BOOKING
========================================================= */

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

  /* If pet is an array, use first item */
  if (Array.isArray(pet) && pet.length > 0) {
    pet = pet[0];
  }

  /* Direct string image */
  if (typeof pet === "string" && pet.trim()) {
    return normalizeBookingPetImage(pet);
  }

  if (!pet || typeof pet !== "object") {
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

  /* Direct image fields */
  for (const field of candidateFields) {
    const value = pet[field];

    if (typeof value === "string" && value.trim()) {
      return normalizeBookingPetImage(value);
    }
  }

  /* Nested image arrays */
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

    if (!Array.isArray(arr) || arr.length === 0) {
      continue;
    }

    for (const imageObject of arr) {
      if (typeof imageObject === "string" && imageObject.trim()) {
        return normalizeBookingPetImage(imageObject);
      }

      if (imageObject && typeof imageObject === "object") {
        for (const field of candidateFields) {
          const value = imageObject[field];

          if (typeof value === "string" && value.trim()) {
            return normalizeBookingPetImage(value);
          }
        }
      }
    }
  }

  return "";
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function BookingStatus() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const isMobile = width < 768;

  /*
   * Vertical cards:
   * Mobile = almost full width
   * Tablet/Desktop = max 700px
   */
  const cardWidth = Math.min(width - 32, 700);

  /* =======================================================
     STATE
  ======================================================= */

  const [bookings, setBookings] = useState([]);
  const [petProfileImages, setPetProfileImages] = useState({});

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [expandedBookings, setExpandedBookings] = useState({});

  /* =======================================================
     TOGGLE BOOKING
  ======================================================= */

  const toggleBooking = (bookingId) => {
    setExpandedBookings((previous) => ({
      ...previous,
      [bookingId]: !previous[bookingId],
    }));
  };

  /* =======================================================
     LOAD PET IMAGES
  ======================================================= */

  const loadPetImages = async (bookingsData) => {
    try {
      const missingImagePetIds = bookingsData.reduce((accumulator, booking) => {
        const petId = getBookingPetId(booking);

        if (
          petId &&
          !getBookingPetImageUrl(booking) &&
          !accumulator.includes(String(petId))
        ) {
          accumulator.push(String(petId));
        }

        return accumulator;
      }, []);

      if (missingImagePetIds.length === 0) {
        return;
      }

      const imageResults = await Promise.all(
        missingImagePetIds.map(async (petId) => {
          try {
            const images = await fetchPetImagesApi(petId);

            const imageList = Array.isArray(images) ? images : [];

            const profileImage =
              imageList.find(
                (img) =>
                  img?.is_profile === "1" ||
                  img?.is_profile === 1 ||
                  img?.is_profile === true,
              ) || imageList[0];

            const imageUrl =
              profileImage?.image_url ||
              profileImage?.url ||
              profileImage?.image ||
              "";

            return [String(petId), normalizeBookingPetImage(imageUrl)];
          } catch (error) {
            console.warn(`Unable to load image for pet ${petId}`, error);

            return [String(petId), ""];
          }
        }),
      );

      const validImages = Object.fromEntries(
        imageResults.filter(([, url]) => Boolean(url)),
      );

      setPetProfileImages((previous) => ({
        ...previous,
        ...validImages,
      }));
    } catch (error) {
      console.warn("Pet image loading error:", error);
    }
  };

  /* =======================================================
     LOAD BOOKINGS
  ======================================================= */

  const loadBookings = async (pageToLoad = 1, append = false) => {
    /*
     * Prevent duplicate pagination requests
     */
    if (append && loadingMore) {
      return;
    }

    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.warn("No authentication token found");
        setBookings([]);
        return;
      }

      console.log(`Loading bookings - Page: ${pageToLoad}, Append: ${append}`);

      const result = await fetchMyBookingsApi(token, pageToLoad, 20);

      console.log("Booking API response:", result);

      const bookingsData = Array.isArray(result?.bookings)
        ? result.bookings
        : [];

      /*
       * Sort newest first
       */
      bookingsData.sort(
        (a, b) => new Date(b?.created_at || 0) - new Date(a?.created_at || 0),
      );

      const pagination = result?.pagination || {};

      /*
       * Read pagination information from API
       */
      const apiCurrentPage = Number(pagination?.page ?? pageToLoad);

      const apiTotalPages = Number(pagination?.total_pages ?? 1);

      console.log("Pagination:", {
        page: apiCurrentPage,
        totalPages: apiTotalPages,
        receivedBookings: bookingsData.length,
      });

      /* ===================================================
         FIRST PAGE
      =================================================== */

      if (!append) {
        setBookings(bookingsData);
        setCurrentPage(apiCurrentPage);
        setTotalPages(apiTotalPages);

        /*
         * Close expanded cards after refresh
         */
        setExpandedBookings({});
      } else {
        /* =================================================
           NEXT PAGE
        ================================================= */

        setBookings((previous) => {
          /*
           * Prevent duplicate booking IDs
           */
          const existingIds = new Set(
            previous.map((item) =>
              String(item?.id ?? item?.booking_id ?? item?.bookingId),
            ),
          );

          const newBookings = bookingsData.filter((item) => {
            const id = String(item?.id ?? item?.booking_id ?? item?.bookingId);

            return !existingIds.has(id);
          });

          return [...previous, ...newBookings];
        });

        setCurrentPage(apiCurrentPage);
        setTotalPages(apiTotalPages);
      }

      /*
       * Load images for this page
       */
      await loadPetImages(bookingsData);
    } catch (error) {
      console.error("Error loading bookings:", error);

      if (!append) {
        setBookings([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  /* =======================================================
     REFRESH SCREEN ON FOCUS
  ======================================================= */

  useFocusEffect(
    useCallback(() => {
      loadBookings(1, false);
    }, []),
  );

  /* =======================================================
     PULL TO REFRESH
  ======================================================= */

  const handleRefresh = async () => {
    if (refreshing) {
      return;
    }

    setRefreshing(true);

    await loadBookings(1, false);
  };

  /* =======================================================
     LOAD NEXT PAGE
  ======================================================= */

  const loadNextPage = () => {
    if (loadingMore) {
      return;
    }

    if (currentPage >= totalPages) {
      console.log("No more booking pages available.");
      return;
    }

    const nextPage = currentPage + 1;

    console.log(`Loading next booking page: ${nextPage}`);

    loadBookings(nextPage, true);
  };

  /* =======================================================
     HAS MORE PAGES
  ======================================================= */

  const hasMorePages = currentPage < totalPages;

  /* =======================================================
     BOOKING TYPE
  ======================================================= */

  const getBookingType = (booking) => {
    const today = new Date();

    const start = new Date(booking?.start_date);
    const end = new Date(booking?.end_date);

    if (Number.isNaN(start.getTime())) {
      return {
        type: "Unknown",
        gradient: ["#94a3b8", "#64748b"],
        bg: "#f8fafc",
        badgeBg: "#e2e8f0",
        badgeText: "#475569",
        iconColor: "#64748b",
      };
    }

    /* UPCOMING */

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

    /* ACTIVE */

    if (today >= start && !Number.isNaN(end.getTime()) && today <= end) {
      return {
        type: "Active Boarding",
        gradient: ["#4ade80", "#16a34a"],
        bg: "#f0fdf4",
        badgeBg: "#bbf7d0",
        badgeText: "#166534",
        iconColor: "#16a34a",
      };
    }

    /* COMPLETED */

    return {
      type: "Completed",
      gradient: ["#c084fc", "#9333ea"],
      bg: "#faf5ff",
      badgeBg: "#e9d5ff",
      badgeText: "#6b21a8",
      iconColor: "#9333ea",
    };
  };

  /* =======================================================
     FORMAT DATE
  ======================================================= */

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* =======================================================
     LOADING SCREEN
  ======================================================= */

  if (loading && !refreshing) {
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

  /* =======================================================
     RENDER BOOKING CARD
  ======================================================= */

  const renderBooking = ({ item: booking, index }) => {
    const bookingId = getBookingId(booking, index);

    const bookingInfo = getBookingType(booking);

    const bookingPetId = getBookingPetId(booking);

    const bookingPetImageUrl =
      getBookingPetImageUrl(booking) ||
      (bookingPetId ? petProfileImages[String(bookingPetId)] || "" : "");

    const isExpanded = Boolean(expandedBookings[bookingId]);

    const endDate = new Date(booking?.end_date);

    const daysRemaining = !Number.isNaN(endDate.getTime())
      ? Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : 0;

    const totalDays = parseInt(booking?.total_days, 10) || 1;

    const progressPercentage =
      bookingInfo.type === "Active Boarding"
        ? Math.max(
            0,
            Math.min(100, 100 - (Math.max(daysRemaining, 0) / totalDays) * 100),
          )
        : 0;

    return (
      <LinearGradient
        colors={["#ffffff", "#f8fafc"]}
        style={[
          styles.bookingStatusCard,
          {
            width: cardWidth,
          },
        ]}
      >
        {/* =================================================
            COLLAPSED HEADER
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => toggleBooking(bookingId)}
          style={styles.bookingHeader}
        >
          {/* PET IMAGE */}

          {bookingPetImageUrl ? (
            <Image
              source={{
                uri: bookingPetImageUrl,
              }}
              style={styles.bookingStatusPetImage}
            />
          ) : (
            <LinearGradient
              colors={bookingInfo.gradient}
              style={styles.bookingStatusIconBox}
            >
              <Text style={styles.bookingStatusPetEmoji}>
                {booking?.pet?.pet_type === "dog" ? "🐶" : "🐱"}
              </Text>
            </LinearGradient>
          )}

          {/* PET INFORMATION */}

          <View style={styles.petNameSection}>
            <Text style={styles.bookingStatusPetName} numberOfLines={1}>
              {booking?.pet?.pet_name || "Pet"}
            </Text>

            <Text style={styles.petBreedText} numberOfLines={1}>
              {booking?.pet?.breed || "Pet"}
            </Text>
          </View>

          {/* STATUS */}

          <View style={styles.headerRightSection}>
            <View
              style={[
                styles.statusBadgeContainer,
                {
                  backgroundColor: bookingInfo.badgeBg,
                },
              ]}
            >
              <Text
                style={[
                  styles.bookingStatusBadgeText,
                  {
                    color: bookingInfo.badgeText,
                  },
                ]}
                numberOfLines={1}
              >
                {bookingInfo.type}
              </Text>
            </View>

            <MaterialCommunityIcons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={24}
              color="#64748b"
            />
          </View>
        </TouchableOpacity>

        {/* =================================================
            EXPANDED CONTENT
        ================================================= */}

        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.cardDivider} />

            {/* BOARDING CENTER */}

            <View style={styles.infoSection}>
              <MaterialCommunityIcons
                name="home"
                size={18}
                color={bookingInfo.iconColor}
                style={{
                  marginRight: 10,
                }}
              />

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Boarding Center</Text>

                <Text style={styles.infoValue} numberOfLines={2}>
                  {booking?.center?.center_name || "Not available"}
                </Text>
              </View>
            </View>

            {/* DATES */}

            <View style={styles.datesRow}>
              {/* CHECK IN */}

              <View style={styles.dateBox}>
                <Text style={styles.dateLabel}>Check In</Text>

                <View style={styles.dateContent}>
                  <MaterialCommunityIcons
                    name="calendar-check"
                    size={16}
                    color={bookingInfo.iconColor}
                    style={{
                      marginRight: 6,
                    }}
                  />

                  <Text style={styles.dateValue} numberOfLines={1}>
                    {formatDate(booking?.start_date)}
                  </Text>
                </View>
              </View>

              {/* ARROW */}

              <View style={styles.dateArrow}>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={20}
                  color="#cbd5e1"
                />
              </View>

              {/* CHECK OUT */}

              <View style={styles.dateBox}>
                <Text style={styles.dateLabel}>Check Out</Text>

                <View style={styles.dateContent}>
                  <MaterialCommunityIcons
                    name="calendar-remove"
                    size={16}
                    color={bookingInfo.iconColor}
                    style={{
                      marginRight: 6,
                    }}
                  />

                  <Text style={styles.dateValue} numberOfLines={1}>
                    {formatDate(booking?.end_date)}
                  </Text>
                </View>
              </View>
            </View>

            {/* =================================================
                MOBILE DETAILS
            ================================================= */}

            {isMobile ? (
              <View style={styles.mobileDetailsCard}>
                <View style={styles.mobileDetailRow}>
                  <Text style={styles.mobileDetailLabel}>Duration</Text>

                  <Text style={styles.mobileDetailValue}>
                    {booking?.total_days || 0} days
                  </Text>
                </View>

                <View style={styles.mobileDetailRow}>
                  <Text style={styles.mobileDetailLabel}>Status</Text>

                  <Text
                    style={[
                      styles.mobileDetailValue,
                      {
                        color: bookingInfo.badgeText,
                      },
                    ]}
                  >
                    {booking?.status || bookingInfo.type}
                  </Text>
                </View>

                <View style={styles.mobileDetailRow}>
                  <Text style={styles.mobileDetailLabel}>Total Cost</Text>

                  <Text
                    style={[
                      styles.mobileDetailValue,
                      {
                        color: bookingInfo.gradient[1],
                      },
                    ]}
                  >
                    ₹{booking?.total_price ?? 0}
                  </Text>
                </View>
              </View>
            ) : (
              /* =================================================
                 DESKTOP DETAILS
              ================================================= */

              <View style={styles.detailsGrid}>
                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>Duration</Text>

                  <View style={styles.detailValueRow}>
                    <Text style={styles.detailValue}>
                      {booking?.total_days || 0}
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
                      {
                        color: bookingInfo.badgeText,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {(booking?.status || bookingInfo.type).toUpperCase()}
                  </Text>
                </View>

                <View style={styles.gridDivider} />

                <View style={styles.detailBox}>
                  <Text style={styles.detailLabel}>Total Cost</Text>

                  <Text style={[styles.detailValue, styles.costValue]}>
                    ₹{booking?.total_price ?? 0}
                  </Text>
                </View>
              </View>
            )}

            {/* =================================================
                ACTIVE BOOKING PROGRESS
            ================================================= */}

            {bookingInfo.type === "Active Boarding" && (
              <View style={styles.progressSection}>
                <View style={styles.progressLabel}>
                  <Text style={styles.progressText}>
                    {daysRemaining > 0
                      ? `${daysRemaining} day${
                          daysRemaining !== 1 ? "s" : ""
                        } remaining`
                      : "Last day"}
                  </Text>
                </View>

                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${progressPercentage}%`,
                        backgroundColor: bookingInfo.gradient[1],
                      },
                    ]}
                  />
                </View>
              </View>
            )}

            {/* =================================================
                UPCOMING NOTE
            ================================================= */}

            {bookingInfo.type === "Upcoming" && (
              <Text style={styles.bookingNoteText}>
                {(() => {
                  const startDate = new Date(booking?.start_date);

                  if (Number.isNaN(startDate.getTime())) {
                    return "Boarding reservation date unavailable.";
                  }

                  const daysUntilStart = Math.ceil(
                    (startDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
                  );

                  if (daysUntilStart <= 0) {
                    return "Important: Your boarding reservation begins today.";
                  }

                  if (daysUntilStart === 1) {
                    return "Important: Your boarding reservation begins tomorrow.";
                  }

                  return `Important: Your boarding reservation begins in ${daysUntilStart} days.`;
                })()}
              </Text>
            )}

            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <View style={styles.actionButtonsRow}>
              {/* CONTACT */}

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() =>
                  handleCallCenter(booking?.center?.primary_contact_number)
                }
              >
                <MaterialCommunityIcons
                  name="phone"
                  size={18}
                  color="#6b21a8"
                />

                <Text style={styles.secondaryButtonText}>Contact</Text>
              </TouchableOpacity>

              {/* DETAILS */}

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
                    params: {
                      centerId,
                    },
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
          </View>
        )}
      </LinearGradient>
    );
  };

  /* =======================================================
     FOOTER
  ======================================================= */

  const renderFooter = () => {
    if (!hasMorePages) {
      return (
        <View style={styles.paginationEnd}>
          <Text style={styles.paginationEndText}>
            {bookings.length > 0 ? "All bookings loaded" : ""}
          </Text>
        </View>
      );
    }

    if (loadingMore) {
      return (
        <View style={styles.loadingMoreContainer}>
          <ActivityIndicator size="small" color="#6b21a8" />

          <Text style={styles.loadingMoreText}>Loading more bookings...</Text>
        </View>
      );
    }

    return (
      <View style={styles.paginationFooter}>
        <TouchableOpacity
          style={styles.nextPageButton}
          onPress={loadNextPage}
          disabled={loadingMore}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color="#ffffff"
          />

          <Text style={styles.nextPageButtonText}>Load More</Text>
        </TouchableOpacity>

        <Text style={styles.pageInfoText}>
          Page {currentPage} of {totalPages}
        </Text>
      </View>
    );
  };

  /* =======================================================
     EMPTY STATE
  ======================================================= */

  if (bookings.length === 0) {
    return (
      <View style={styles.bookingStatusContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.bookingStatusTitle}>Booking Status</Text>

          <Text style={styles.bookingStatusSubtitle}>
            Track all your pet's boarding reservations
          </Text>
        </View>

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
      </View>
    );
  }

  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <View
      style={[
        styles.bookingStatusContainer,
        {
          width: "100%",
        },
      ]}
    >
      {/* HEADER */}

      <View style={styles.headerSection}>
        <Text style={styles.bookingStatusTitle}>Booking Status</Text>

        <Text style={styles.bookingStatusSubtitle}>
          Track all your pet's boarding reservations
        </Text>
      </View>

      {/* =================================================
          VERTICAL FLATLIST
      ================================================= */}

      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={(item, index) => String(getBookingId(item, index))}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bookingListContainer}
        /*
         * Pull to refresh
         */
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#6b21a8"]}
            tintColor="#6b21a8"
          />
        }
        /*
         * Footer contains Load More
         */
        ListFooterComponent={renderFooter}
        /*
         * Automatically detect when
         * user reaches bottom.
         *
         * The button is still available,
         * so both methods work.
         */
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.4}
        /*
         * Improves vertical FlatList performance
         */
        removeClippedSubviews={true}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={7}
      />
    </View>
  );
}
