import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../styles/CenterCard";

export default function CenterCard({
  item,
  onPress,
  onViewDetails,
  cardWidth,
}) {
  // Get amenities display (first 3)
  const displayAmenities = item.amenities
    ? item.amenities.slice(0, 3).join(", ")
    : "";

  // Get primary center photo
  const centerPhotoUrl = Array.isArray(item.center_photos)
    ? item.center_photos[0]
    : item.image || item.photo || "";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.cardContainer,
        {
          width: cardWidth,
        },
      ]}
    >
      <LinearGradient
        colors={["#ffffff", "#f8fafc"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.centerCardWrapper}
      >
        {/* CENTER IMAGE */}
        {centerPhotoUrl ? (
          <View style={styles.centerImageContainer}>
            <Image
              source={{ uri: centerPhotoUrl }}
              style={styles.centerImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.08)", "rgba(0,0,0,0.2)"]}
              style={styles.imageOverlay}
            />
          </View>
        ) : (
          <LinearGradient
            colors={["#dccfff", "#f2eeff"]}
            style={styles.centerImagePlaceholder}
          >
            <MaterialCommunityIcons
              name="home-heart"
              size={48}
              color="#6b21a8"
            />
          </LinearGradient>
        )}

        <View style={styles.centerCardContent}>
          {/* TITLE AND CAPACITY ROW */}
          <View style={styles.titleRow}>
            <View style={styles.titleSection}>
              <Text style={styles.centerCardTitle} numberOfLines={2}>
                {item.center_name}
              </Text>
            </View>
            {item.city ? (
              <View style={styles.centerCardLocation}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={14}
                  color="#6b21a8"
                />
                <Text style={styles.centerCardLocationText} numberOfLines={1}>
                  {item.city}
                  {item.state ? `, ${item.state}` : ""}
                </Text>
              </View>
            ) : null}
          </View>

          {/* DESCRIPTION */}
          <Text style={styles.centerCardDescription} numberOfLines={2}>
            {item.description}
          </Text>

          {/* AMENITIES PREVIEW */}
          {displayAmenities && (
            <View style={styles.amenitiesContainer}>
              <MaterialCommunityIcons name="star" size={14} color="#6b21a8" />
              <Text style={styles.amenitiesPreview} numberOfLines={1}>
                {displayAmenities}
              </Text>
            </View>
          )}

          {/* INFO BADGES */}
          <View style={styles.infoBadgesRow}>
            {item.opening_time && (
              <View style={styles.infoBadge}>
                <MaterialCommunityIcons
                  name="clock"
                  size={13}
                  color="#6b21a8"
                />
                <Text style={styles.infoBadgeText}>
                  {item.opening_time.split(":").slice(0, 2).join(":")}
                </Text>
              </View>
            )}
            {item.daily_capacity && (
              <View style={styles.infoBadge}>
                <MaterialCommunityIcons name="paw" size={13} color="#6b21a8" />
                <Text style={styles.infoBadgeText}>
                  {item.daily_capacity} pets
                </Text>
              </View>
            )}
            {item.vaccination_policy && (
              <View style={styles.infoBadge}>
                <MaterialCommunityIcons
                  name="shield-check"
                  size={13}
                  color="#6b21a8"
                />
                <Text style={styles.infoBadgeText}>Verified</Text>
              </View>
            )}
          </View>

          {/* VIEW DETAILS BUTTON */}
          <TouchableOpacity
            style={styles.centerCardButton}
            onPress={onViewDetails}
          >
            <Text style={styles.centerCardButtonText}>View Details</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={16}
              color="#ffffff"
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
