import { appAlert } from "../../../utils/alert";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "../../../components/BackButton";
import PremiumLoader from "../../../components/PremiumLoader";
import styles from "../styles/BoardingDetailsScreen";
import {
  fetchBoardingCenterByIdApi,
  fetchCapacityApi,
} from "../services/boardingService";

const formatPetName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

const PET_EMOJIS = {
  dog: "🐶",
  cat: "🐱",
  bird: "🐦",
  rabbit: "🐰",
  turtle: "🐢",
  other: "🐾",
};

function SectionHeader({ icon, title, expanded, onPress }) {
  return (
    <TouchableOpacity
      style={styles.sectionHeader}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.sectionHeaderTitle}>
        {icon}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Ionicons
        name={expanded ? "chevron-up" : "chevron-down"}
        size={20}
        color="#111827"
      />
    </TouchableOpacity>
  );
}

function QuickAction({ icon, title, value, onPress }) {
  return (
    <TouchableOpacity
      style={styles.quickAction}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon}
      <View style={styles.quickActionCopy}>
        <Text style={styles.quickActionTitle} numberOfLines={1}>
          {title}
        </Text>
        {!!value && (
          <Text style={styles.quickActionValue} numberOfLines={1}>
            {value}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

function FeatureTile({ label, index }) {
  const icons = [
    "home-outline",
    "sunny-outline",
    "cut-outline",
    "videocam-outline",
    "play-outline",
    "snow-outline",
  ];
  return (
    <View style={styles.featureTile}>
      <Ionicons
        name={icons[index % icons.length]}
        size={22}
        color={index % 3 === 1 ? "#e6a400" : "#6b21a8"}
      />
      <Text style={styles.featureLabel} numberOfLines={2}>
        {label}
      </Text>
    </View>
  );
}

function DetailItem({ label, value, icon }) {
  if (!value) return null;
  return (
    <View style={styles.detailItem}>
      {icon}
      <View style={styles.detailCopy}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function BoardingDetailsScreen({ route, navigation }) {
  const { width } = useWindowDimensions();
  const { centerId } = route.params;
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setCapacity] = useState(null);
  const [, setCapacityLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [priceProgressWidth, setPriceProgressWidth] = useState(0);
  const priceProgress = useRef(new Animated.Value(0)).current;
  const [detailsExpanded, setDetailsExpanded] = useState(true);
  const [contactExpanded, setContactExpanded] = useState(true);

  useEffect(() => {
    fetchDetails();
    loadCapacity();
  }, [centerId]);

  const loadCapacity = async () => {
    try {
      setCapacityLoading(true);
      setCapacity(await fetchCapacityApi(centerId));
    } catch (error) {
      /* Capacity is optional here. */
    } finally {
      setCapacityLoading(false);
    }
  };

  const fetchDetails = async () => {
    try {
      setCenter(await fetchBoardingCenterByIdApi(centerId));
    } catch (error) {
      setCenter(null);
    } finally {
      setLoading(false);
    }
  };

  const photoList = Array.isArray(center?.images)
    ? center.images
    : Array.isArray(center?.center_photos)
      ? center.center_photos
      : [];
  const rating =
    center?.rating || center?.average_rating || center?.rating_average;
  const reviewCount = center?.review_count || center?.reviews_count;
  const hasCoordinates = center?.latitude != null && center?.longitude != null;
  const mapUrl = hasCoordinates
    ? `https://maps.google.com/?q=${center.latitude},${center.longitude}`
    : null;
  const openMap = () => mapUrl && Linking.openURL(mapUrl);
  const openPhone = () =>
    center?.primary_contact_number &&
    Linking.openURL(`tel:${center.primary_contact_number}`);
  const handleImageScroll = (event) =>
    setCurrentImageIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  const handlePriceScroll = (event) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / priceSlideWidth,
    );

    Animated.spring(priceProgress, {
      toValue: slideIndex,
      useNativeDriver: true,
      damping: 18,
      stiffness: 140,
      mass: 0.7,
    }).start();
  };

  const handleBookingPress = async () => {
    const guestRole = await AsyncStorage.getItem("guestRole");
    if (guestRole) {
      appAlert.alert(
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

  if (loading)
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
  if (!center)
    return (
      <View style={styles.loaderContainer}>
        <BackButton fallbackRoute="Booking" />
        <Text style={styles.emptyTitle}>Boarding center unavailable</Text>
      </View>
    );

  const featureValues = [
    ...(center.boarding_services || []),
    ...(center.amenities || []),
  ].filter(Boolean);
  const detailItems = [
    ["Type", center.property_type, "home-outline"],
    ["Fencing", center.fencing_status, "fence"],
    ["Supervision", center.supervision_level, "eye-outline"],
    [
      "License Number",
      center.registration_license_number,
      "file-document-outline",
    ],
    [
      "Vaccines Required",
      Array.isArray(center.required_vaccines)
        ? center.required_vaccines.join(", ")
        : center.required_vaccines,
      "shield-check-outline",
    ],
  ];
  const priceSlideWidth = Math.max(190, Math.min(width - 64, 1128));
  const priceEntries = Object.entries(center.pet_type_prices || {});
  const priceSlides = [];

  for (let index = 0; index < priceEntries.length; index += 3) {
    priceSlides.push(priceEntries.slice(index, index + 3));
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.wrapper}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {photoList.length > 0 ? (
          <View style={styles.sliderContainer}>
            <BackButton
              fallbackRoute="Booking"
              style={styles.floatingBackButton}
            />
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
                      height: width >= 1200 ? 480 : width >= 768 ? 390 : 275,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: img }}
                    style={styles.sliderImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={["transparent", "rgba(15,23,42,.58)"]}
                    style={styles.sliderOverlay}
                  />
                </View>
              ))}
            </ScrollView>
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
          <View
            style={[styles.emptyImage, { height: width >= 768 ? 300 : 240 }]}
          >
            <BackButton
              fallbackRoute="Booking"
              style={styles.floatingBackButton}
            />
            <MaterialCommunityIcons
              name="image-off-outline"
              size={45}
              color="#b39bd0"
            />
            <Text style={styles.emptyImageText}>Photos coming soon</Text>
          </View>
        )}
        <View style={styles.detailsContainer}>
          <View style={styles.titleRow}>
            <View style={styles.titleCopy}>
              <Text style={styles.title}>{center.center_name}</Text>
              {!!center.description && (
                <Text style={styles.desc}>{center.description}</Text>
              )}
            </View>
            {!!rating && (
              <View style={styles.rating}>
                <Ionicons name="star" size={18} color="#fbbf24" />
                <Text style={styles.ratingValue}>{rating}</Text>
                {!!reviewCount && (
                  <Text style={styles.reviewText}>({reviewCount} reviews)</Text>
                )}
              </View>
            )}
          </View>
          <View style={styles.addressRow}>
            <Ionicons name="location" size={21} color="#6b21a8" />
            <Text style={styles.addressText}>
              {[
                center.address,
                center.address_line_2,
                center.city,
                center.state && center.zip_code
                  ? `${center.state} - ${center.zip_code}`
                  : center.state,
              ]
                .filter(Boolean)
                .join(", ")}
            </Text>
            {hasCoordinates && (
              <TouchableOpacity onPress={openMap}>
                <View style={styles.mapLinkRow}>
                  <Text style={styles.mapLink}>View on Map</Text>
                  <Ionicons name="chevron-forward" size={14} color="#6b21a8" />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.quickActions}>
            <QuickAction
              icon={<Ionicons name="time-outline" size={24} color="#6b21a8" />}
              title="Open Now"
              value={`${center.opening_time || ""} - ${center.closing_time || ""}`}
            />
            <QuickAction
              icon={<Ionicons name="call" size={22} color="#6b21a8" />}
              title="Call"
              value={center.primary_contact_number}
              onPress={openPhone}
            />
          </View>
          {!!center.pet_type_prices &&
            Object.keys(center.pet_type_prices).length > 0 && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  <MaterialCommunityIcons
                    name="paw"
                    size={16}
                    color="#6b21a8"
                  />{" "}
                  Pet Type & Pricing
                </Text>
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  decelerationRate="fast"
                  snapToInterval={priceSlideWidth}
                  snapToAlignment="start"
                  onMomentumScrollEnd={handlePriceScroll}
                  contentContainerStyle={styles.priceCarousel}
                >
                  {priceSlides.map((slide, slideIndex) => (
                    <View
                      key={`price-slide-${slideIndex}`}
                      style={[styles.priceSlide, { width: priceSlideWidth }]}
                    >
                      {slide.map(([petType, price]) => (
                        <View key={petType} style={styles.priceColumn}>
                          <View style={styles.petPlaceholder}>
                            <Text style={styles.petEmoji}>
                              {PET_EMOJIS[petType.toLowerCase()] || "🐾"}
                            </Text>
                          </View>
                          <Text style={styles.petName}>
                            {formatPetName(petType)}
                          </Text>
                          <Text style={styles.price}>
                            {"\u20B9"}
                            {price}/day
                          </Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </ScrollView>
                {priceSlides.length > 1 && (
                  <View
                    style={styles.priceProgressTrack}
                    onLayout={({ nativeEvent }) =>
                      setPriceProgressWidth(nativeEvent.layout.width)
                    }
                  >
                    <Animated.View
                      style={[
                        styles.priceProgressBar,
                        {
                          width: priceProgressWidth / priceSlides.length,
                          transform: [
                            {
                              translateX: priceProgress.interpolate({
                                inputRange: priceSlides.map((_, index) => index),
                                outputRange: priceSlides.map(
                                  (_, index) =>
                                    (priceProgressWidth / priceSlides.length) *
                                    index,
                                ),
                                extrapolate: "clamp",
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                  </View>
                )}
              </View>
            )}
          <View style={styles.card}>
            <SectionHeader
              icon={
                <MaterialCommunityIcons
                  name="cog-outline"
                  size={16}
                  color="#6b21a8"
                />
              }
              title="Services, Facilities & Details"
              expanded={detailsExpanded}
              onPress={() => setDetailsExpanded((value) => !value)}
            />
            {detailsExpanded && (
              <>
                <View style={styles.featureGrid}>
                  {featureValues.map((value, index) => (
                    <FeatureTile
                      key={`${value}-${index}`}
                      label={value}
                      index={index}
                    />
                  ))}
                </View>
                <View style={styles.detailGrid}>
                  {detailItems.map(([label, value, icon]) => (
                    <DetailItem
                      key={label}
                      label={label}
                      value={value}
                      icon={
                        <MaterialCommunityIcons
                          name={icon}
                          size={16}
                          color="#6b21a8"
                        />
                      }
                    />
                  ))}
                </View>
                {!!center.license_proof && (
                  <TouchableOpacity
                    style={styles.licenseLink}
                    onPress={() => Linking.openURL(center.license_proof)}
                  >
                    <MaterialCommunityIcons
                      name="file-eye-outline"
                      size={19}
                      color="#6b21a8"
                    />
                    <Text style={styles.licenseLinkText}>
                      View License Document
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
          <View style={styles.card}>
            <SectionHeader
              icon={<Ionicons name="call-outline" size={16} color="#6b21a8" />}
              title="Contact & Hours"
              expanded={contactExpanded}
              onPress={() => setContactExpanded((value) => !value)}
            />
            {contactExpanded && (
              <View style={styles.contactGrid}>
                <View style={styles.contactColumn}>
                  {!!center.primary_contact_number && (
                    <TouchableOpacity
                      style={styles.contactLine}
                      onPress={openPhone}
                    >
                      <Ionicons name="call-outline" size={18} color="#6b21a8" />
                      <Text style={styles.contactLink}>
                        {center.primary_contact_number}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {!!center.email_address && (
                    <TouchableOpacity
                      style={styles.contactLine}
                      onPress={() =>
                        Linking.openURL(`mailto:${center.email_address}`)
                      }
                    >
                      <Ionicons name="mail-outline" size={18} color="#6b21a8" />
                      <Text style={styles.contactLink}>
                        {center.email_address}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {!!center.website_url && (
                    <TouchableOpacity
                      style={styles.contactLine}
                      onPress={() => Linking.openURL(center.website_url)}
                    >
                      <Ionicons
                        name="globe-outline"
                        size={18}
                        color="#6b21a8"
                      />
                      <Text style={styles.contactLink}>Visit Website</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.hoursColumn}>
                  <Ionicons name="time-outline" size={23} color="#6b21a8" />
                  <View>
                    <Text style={styles.hoursTitle}>Open Hours</Text>
                    <Text style={styles.hoursValue}>
                      {center.opening_time} - {center.closing_time}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          {!!center.special_instructions && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color="#6b21a8"
                />{" "}
                Special Instructions
              </Text>
              <Text style={styles.instructionsText}>
                {center.special_instructions}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.bookingBar}>
        <TouchableOpacity onPress={handleBookingPress} activeOpacity={0.85}>
          <LinearGradient
            colors={["#6b21a8", "#7e22ce"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.primaryBtn}
          >
            <Ionicons name="calendar-outline" size={23} color="#fff" />
            <Text style={styles.primaryBtnText}>Book Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
