import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PremiumLoader from "../../../components/PremiumLoader";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import petDetailsScreenStyles from "../styles/PetDetailsScreenStyles";
import BASE_URL from "../constants/api";

import { fetchPetByIdApi } from "../services/petService";
import {
  fetchPetImagesApi,
  extractImageUrlFromPayload,
} from "../services/imageService";

const getImageUrl = (image) => {
  if (!image) return null;
  return extractImageUrlFromPayload(image) || null;
};

const formatSubtitle = (type, breed) => {
  if (!type && !breed) return "";
  const base = type ? `${type.charAt(0).toUpperCase()}${type.slice(1)}` : "";
  return breed ? `${base}${base ? " • " : ""}${breed}` : base;
};

export default function PetDetailsScreen({ route, navigation }) {
  const { petId } = route.params;

  const [petData, setPetData] = useState(null);
  const [petImages, setPetImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [guestRole, setGuestRole] = useState(null);

  const [expandedSection, setExpandedSection] = useState("pet");

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  useEffect(() => {
    const loadUserRole = async () => {
      const storedRole = await AsyncStorage.getItem("role");
      const storedGuestRole = await AsyncStorage.getItem("guestRole");

      setUserRole(storedRole);
      setGuestRole(storedGuestRole);
    };

    loadUserRole();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [details, images] = await Promise.all([
          fetchPetByIdApi(petId),
          fetchPetImagesApi(petId),
        ]);

        setPetData(details);
        setPetImages(Array.isArray(images) ? images : []);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [petId]);

  if (loading) {
    return (
      <LinearGradient
        colors={["#faf5ff", "#fdf2f8", "#fff7ed"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={petDetailsScreenStyles.detailsLoader}
      >
        <PremiumLoader size={56} color="#6b21a8" label="Loading pet details" />
      </LinearGradient>
    );
  }

  if (!petData) {
    return (
      <LinearGradient
        colors={["#faf5ff", "#fdf2f8", "#fff7ed"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={petDetailsScreenStyles.loaderContainer}
      >
        <Text style={petDetailsScreenStyles.emptyText}>
          Pet details are unavailable.
        </Text>
      </LinearGradient>
    );
  }

  const owner = petData.owner || {};
  const pet = petData.pet || {};
  const rawHealth = petData.health || {};
  const health = {
    ...rawHealth,
    vaccination_certificate:
      rawHealth.vaccination_certificate ||
      petData.vaccination_certificate ||
      null,
    deworming_date: rawHealth.deworming_date || petData.deworming_date || null,
    flea_tick_treatment_date:
      rawHealth.flea_tick_treatment_date ||
      petData.flea_tick_treatment_date ||
      null,
  };
  const behavior = petData.behavior_feeding || {};

  const galleryImages = petImages
    .map(getImageUrl)
    .filter((uri) => Boolean(uri));

  const profileImage =
    getImageUrl(petData) ||
    getImageUrl(pet) ||
    galleryImages[0] ||
    "https://via.placeholder.com/300";

  const openUrl = async (url) => {
    if (!url) {
      Alert.alert(
        "File unavailable",
        "No vaccination certificate link is available.",
      );
      return;
    }

    let normalizedUrl = String(url).trim();
    if (!normalizedUrl) {
      Alert.alert(
        "File unavailable",
        "No vaccination certificate link is available.",
      );
      return;
    }

    if (
      !normalizedUrl.startsWith("http://") &&
      !normalizedUrl.startsWith("https://")
    ) {
      normalizedUrl = normalizedUrl.startsWith("/")
        ? `${BASE_URL}${normalizedUrl}`
        : `${BASE_URL}/${normalizedUrl}`;
    }

    const link = encodeURI(normalizedUrl);

    try {
      const supported = await Linking.canOpenURL(link);
      if (supported) {
        await Linking.openURL(link);
        return;
      }
    } catch (error) {
      // ignore canOpenURL errors and try openURL directly
    }

    try {
      await Linking.openURL(link);
    } catch (error) {
      Alert.alert(
        "Cannot open file",
        "This certificate link cannot be opened.",
      );
    }
  };

  const getCertificateUrl = (certificate) => {
    if (!certificate) return null;

    if (typeof certificate === "string") {
      return certificate.trim();
    }

    return (
      certificate.uri ||
      certificate.url ||
      certificate.path ||
      certificate.file?.uri ||
      certificate.file?.url ||
      certificate.file?.path ||
      null
    );
  };

  const formatCertificateLabel = (certificate) => {
    const raw =
      certificate?.name ||
      certificate?.file?.name ||
      certificate?.uri ||
      certificate?.url ||
      certificate?.path ||
      certificate ||
      "Vaccination Certificate";

    if (typeof raw !== "string") return "Vaccination Certificate";

    const filename = raw.split("/").pop();
    if (!filename) return "Vaccination Certificate";
    if (filename.toLowerCase().endsWith(".pdf")) return filename;
    if (filename.includes(".")) return filename;
    return `${filename}.pdf`;
  };

  const DetailRow = ({ label, value, onPress, isLink, displayValue }) => (
    <View style={petDetailsScreenStyles.row}>
      <Text style={petDetailsScreenStyles.label}>{label}</Text>
      {isLink ? (
        <TouchableOpacity
          onPress={onPress}
          style={petDetailsScreenStyles.pdfLinkRow}
        >
          <View style={petDetailsScreenStyles.pdfLinkInner}>
            <View style={petDetailsScreenStyles.pdfIconWrapper}>
              <Ionicons name="document-text-outline" size={18} color="#fff" />
            </View>
            <Text
              style={petDetailsScreenStyles.pdfLinkText}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {displayValue || "Vaccination Certificate"}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Text style={petDetailsScreenStyles.value}>
          {value === null || value === undefined || value === ""
            ? "-"
            : String(value)}
        </Text>
      )}
    </View>
  );

  const SectionHeader = ({ title, sectionKey }) => (
    <TouchableOpacity
      style={petDetailsScreenStyles.accordionHeader}
      onPress={() => toggleSection(sectionKey)}
    >
      <Text style={petDetailsScreenStyles.accordionTitle}>{title}</Text>

      <Ionicons
        name={expandedSection === sectionKey ? "chevron-up" : "chevron-down"}
        size={22}
        color="#6b21a8"
      />
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#faf5ff", "#fdf2f8", "#fff7ed"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={petDetailsScreenStyles.detailsContainer}
    >
      <ScrollView
        style={petDetailsScreenStyles.detailsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={petDetailsScreenStyles.topHeader}>
          <TouchableOpacity
            style={petDetailsScreenStyles.headerIconButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#6b21a8" />
          </TouchableOpacity>

          <Text style={petDetailsScreenStyles.headerTitle}>Pet Profile</Text>

          {userRole !== "boarding_owner" && guestRole !== "boarding_owner" ? (
            <TouchableOpacity
              style={petDetailsScreenStyles.headerIconButton}
              onPress={() =>
                navigation.navigate("EditPet", {
                  petId,
                })
              }
            >
              <Ionicons name="create-outline" size={24} color="#6b21a8" />
            </TouchableOpacity>
          ) : (
            <View style={petDetailsScreenStyles.headerIconButton} />
          )}
        </View>
        <View style={petDetailsScreenStyles.detailsHero}>
          <View style={petDetailsScreenStyles.imageWrapper}>
            <Image
              source={{ uri: profileImage }}
              style={petDetailsScreenStyles.detailPetImage}
            />
          </View>
          <View style={petDetailsScreenStyles.heroText}>
            <Text style={petDetailsScreenStyles.detailsHeading}>
              {pet.pet_name || "Pet Details"}
            </Text>
            <Text style={petDetailsScreenStyles.petSubtitle}>
              {formatSubtitle(pet.pet_type, pet.breed)}
            </Text>
          </View>
        </View>

        <SectionHeader title="Pet Information" sectionKey="pet" />

        {expandedSection === "pet" && (
          <>
            <DetailRow label="Gender" value={pet.gender} />
            <DetailRow label="Age" value={pet.age} />
            <DetailRow label="Date Of Birth" value={pet.date_of_birth} />
            <DetailRow label="Weight" value={pet.weight} />
            <DetailRow
              label="Color Identification Marks"
              value={pet.color_identification_marks}
            />
            <DetailRow label="Microchip ID" value={pet.microchip_id} />
            <DetailRow
              label="Registration Number"
              value={pet.registration_number}
            />
            <DetailRow
              label="Additional Details"
              value={pet.additional_details}
            />
          </>
        )}

        {galleryImages.length > 0 && (
          <>
            <SectionHeader title="Photo Gallery" sectionKey="gallery" />

            {expandedSection === "gallery" && (
              <View style={petDetailsScreenStyles.galleryContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={petDetailsScreenStyles.thumbnailScroll}
                >
                  {galleryImages.map((uri, index) => (
                    <Image
                      key={`${uri}-${index}`}
                      source={{ uri }}
                      style={petDetailsScreenStyles.thumbnailImage}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </>
        )}

        <SectionHeader title="Family Details" sectionKey="family" />

        {expandedSection === "family" && (
          <>
            <DetailRow label="Mother Name" value={pet.mother_name} />
            <DetailRow label="Father Name" value={pet.father_name} />
            <DetailRow label="Breeding Line" value={pet.breeding_line} />
          </>
        )}

        <SectionHeader title="Health Details" sectionKey="health" />

        {expandedSection === "health" && (
          <>
            <DetailRow
              label="Vaccination Status"
              value={health.vaccination_status}
            />

            <DetailRow
              label="Vaccination Details"
              value={health.vaccination_details}
            />

            <DetailRow
              label="Vaccination Notes"
              value={health.vaccination_notes}
            />

            <DetailRow
              label="Vaccination Certificate"
              value={formatCertificateLabel(health.vaccination_certificate)}
              displayValue={formatCertificateLabel(
                health.vaccination_certificate,
              )}
              isLink={Boolean(
                getCertificateUrl(health.vaccination_certificate),
              )}
              onPress={() =>
                openUrl(getCertificateUrl(health.vaccination_certificate))
              }
            />

            <DetailRow label="Deworming Date" value={health.deworming_date} />

            <DetailRow label="Medical History" value={health.medical_history} />

            <DetailRow label="Allergies" value={health.allergies} />

            <DetailRow
              label="Medical Conditions"
              value={health.medical_conditions}
            />

            <DetailRow
              label="Current Medications"
              value={health.current_medications}
            />
          </>
        )}

        <SectionHeader title="Veterinarian Details" sectionKey="vet" />

        {expandedSection === "vet" && (
          <>
            <DetailRow label="Vet Name" value={health.vet_name} />

            <DetailRow label="Vet Clinic Name" value={health.vet_clinic_name} />

            <DetailRow label="Vet Contact" value={health.vet_contact} />

            <DetailRow
              label="Special Care Required"
              value={health.special_care_required}
            />
          </>
        )}

        <SectionHeader title="Behavior & Feeding" sectionKey="behavior" />

        {expandedSection === "behavior" && (
          <>
            <DetailRow label="Eating Habit" value={behavior.eating_habit} />

            <DetailRow
              label="Water Intake Habit"
              value={behavior.water_intake_habit}
            />

            <DetailRow label="Food Type" value={behavior.food_type} />

            <DetailRow label="Food Brand" value={behavior.food_brand} />

            <DetailRow
              label="Feeding Schedule"
              value={behavior.feeding_schedule}
            />
          </>
        )}

        <View style={petDetailsScreenStyles.spacer} />
      </ScrollView>
    </LinearGradient>
  );
}
