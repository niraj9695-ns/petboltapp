import React, { useEffect, useState, useLayoutEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
  useWindowDimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

import * as ImagePicker from "expo-image-picker";

import PetCard from "./PetCard";

import PetFormModal from "./PetFormModal";
import PremiumLoader from "../../../components/PremiumLoader";

import petScreenStyles from "../styles/PetScreenStyles";

import {
  fetchPetByIdApi,
  fetchPetsApi,
  addPetApi,
  updatePetApi,
  deletePetApi,
} from "../services/petService";

import {
  fetchPetImagesApi,
  uploadPetImagesApi,
  deletePetImageApi,
  setPetProfileImageApi,
} from "../services/imageService";

export default function PetScreen({ navigation, route, initialEditPetId }) {
  const [pets, setPets] = useState([]);

  const [petImages, setPetImages] = useState({});

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [refreshing, setRefreshing] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [hasOpenedInitialEdit, setHasOpenedInitialEdit] = useState(false);

  const { width } = useWindowDimensions();

  const numColumns = width >= 1200 ? 3 : width >= 768 ? 2 : 1;

  const horizontalPadding = 32;
  const gap = 12;

  const cardWidth =
    numColumns === 1
      ? width - horizontalPadding
      : (width - horizontalPadding - gap * (numColumns - 1)) / numColumns;

  const [selectedImages, setSelectedImages] = useState([]);
  const [profileImageIndex, setProfileImageIndex] = useState(null);

  const [step, setStep] = useState(1);

  const initialPetData = {
    pet_name: "",
    pet_type: "dog",
    breed: "",
    gender: "male",
    age: "",
    date_of_birth: "",
    weight: "",

    color_marks: "",
    microchip_id: "",
    registration_number: "",
    additional_details: "",

    mother_name: "",
    father_name: "",
    breeding_line: "",

    vaccination_status: "",
    vaccination_details: "",
    vaccination_notes: "",
    vaccination_certificate: null,

    deworming_date: "",
    flea_tick_treatment_date: "",

    medical_history: "",
    allergies: "",
    medical_conditions: "",
    current_medication: "",
    surgery_history: "",

    neutered_spayed: false,

    vet_name: "",
    vet_clinic_name: "",
    vet_contact: "",

    special_care_required: "",

    eating_habit: "",
    water_intake_habit: "",

    friendly_with_humans: false,
    friendly_with_dogs: false,
    aggressive_behavior: false,

    anxiety_issues: "",
    biting_history: "",

    food_type: "non_veg",
    food_brand: "",
    feeding_schedule: "",
    quantity_per_meal: "",

    treats_allowed: false,

    food_allergies: false,

    food_allergy_details: "",
  };

  const [petData, setPetData] = useState(initialPetData);
  const [isGuest, setIsGuest] = useState(false);

  const promptSignIn = () => {
    Alert.alert(
      "Sign in required",
      "Please sign in or create an account to continue.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign In / Sign Up",
          onPress: () => navigation.navigate("Auth"),
        },
      ],
    );
  };

  useEffect(() => {
    const loadGuestStatus = async () => {
      const guestRole = await AsyncStorage.getItem("guestRole");
      const isGuestUser = !!guestRole;
      setIsGuest(isGuestUser);

      if (isGuestUser) {
        Alert.alert(
          "Sign in required",
          "Please sign in or create an account to manage pets.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => navigation.goBack(),
            },
            {
              text: "Sign In / Sign Up",
              onPress: () => navigation.navigate("Auth"),
            },
          ],
        );
        return;
      }

      loadPets();
    };

    loadGuestStatus();
  }, []);

  const loadPets = async (pageToLoad = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const result = await fetchPetsApi(pageToLoad, 20);
      const petList = Array.isArray(result?.pets) ? result.pets : [];
      const pagination = result?.pagination || {};

      setPets((prevPets) => (append ? [...prevPets, ...petList] : petList));
      setCurrentPage(Number(pagination.page || pageToLoad));
      setTotalPages(Number(pagination.total_pages || 1));

      const imagesObj = {};

      for (const pet of petList) {
        const petId = pet.pet_id || pet.id;

        const images = await fetchPetImagesApi(petId);

        imagesObj[petId] = images;
      }

      setPetImages((prevImages) => ({ ...prevImages, ...imagesObj }));
    } catch (error) {
      Alert.alert("Error", "Failed to fetch pets");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const hasMorePages = currentPage < totalPages;

  const removeImage = async (indexToRemove) => {
    try {
      const image = selectedImages[indexToRemove];

      if (image?.isExisting) {
        const imageId = image.image_id || image.id;

        const success = await deletePetImageApi(imageId);

        if (!success) {
          Alert.alert("Error", "Failed to delete image");
          return;
        }
      }

      setSelectedImages((prev) =>
        prev.filter((_, index) => index !== indexToRemove),
      );

      setProfileImageIndex((currentIndex) => {
        if (currentIndex === null) return null;
        if (indexToRemove === currentIndex) return null;
        if (indexToRemove < currentIndex) return currentIndex - 1;
        return currentIndex;
      });
    } catch (error) {
      Alert.alert("Error", "Failed to remove image");
    }
  };

  const pickImages = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission Required", "Please allow gallery access");

        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImages((prev) => [...prev, ...result.assets]);
      }
    } catch (error) {
      Alert.alert("Error", "Image picker failed");
    }
  };

  const closeModal = () => {
    setShowForm(false);

    setEditingId(null);

    setSelectedImages([]);
    setProfileImageIndex(null);

    setStep(1);

    setPetData(initialPetData);
  };

  const handleModalClose = () => {
    if (initialEditPetId && navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    closeModal();
  };

  const validateForm = () => {
    if (!petData.pet_name?.trim()) {
      Alert.alert("Validation", "Pet Name is required");
      return false;
    }

    if (!petData.pet_type) {
      Alert.alert("Validation", "Pet Type is required");
      return false;
    }

    if (!petData.breed?.trim()) {
      Alert.alert("Validation", "Breed is required");
      return false;
    }

    if (!petData.gender) {
      Alert.alert("Validation", "Gender is required");
      return false;
    }

    // Age and Date Of Birth are optional fields.

    const hasValidCertificate =
      (typeof petData.vaccination_certificate === "string" &&
        petData.vaccination_certificate.trim().length > 0) ||
      (typeof petData.vaccination_certificate === "object" &&
        petData.vaccination_certificate !== null &&
        (petData.vaccination_certificate.uri ||
          petData.vaccination_certificate.path ||
          petData.vaccination_certificate.name ||
          petData.vaccination_certificate.type));

    if (!hasValidCertificate) {
      Alert.alert("Validation", "Vaccination Certificate is required");
      return false;
    }

    if (!petData.food_type) {
      Alert.alert("Validation", "Food Type is required");
      return false;
    }

    return true;
  };

  const handleAddOrUpdate = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true);

      const payload = {
        ...petData,

        vaccination_certificate: petData.vaccination_certificate || null,

        pet_type: petData.pet_type,
        gender: petData.gender,
        food_type: petData.food_type,

        age: petData.age ? Number(petData.age) : 0,

        weight: petData.weight ? Number(petData.weight) : 0,

        neutered_spayed: Boolean(petData.neutered_spayed),

        friendly_with_humans: Boolean(petData.friendly_with_humans),

        friendly_with_dogs: Boolean(petData.friendly_with_dogs),

        aggressive_behavior: Boolean(petData.aggressive_behavior),

        treats_allowed: Boolean(petData.treats_allowed),

        food_allergies: Boolean(petData.food_allergies),
      };

      if (editingId) {
        const response = await updatePetApi(Number(editingId), payload);

        if (response.ok) {
          const newImages = selectedImages.filter(
            (img) => img.fileName || img.mimeType || img.type,
          );

          let uploadResult = { ok: true, data: null };

          if (newImages.length > 0) {
            uploadResult = await uploadPetImagesApi(editingId, newImages);
          }

          const selectedProfileImage =
            profileImageIndex !== null && selectedImages[profileImageIndex]
              ? selectedImages[profileImageIndex]
              : null;

          if (selectedProfileImage) {
            let profileImageId =
              selectedProfileImage.image_id ||
              selectedProfileImage.id ||
              selectedProfileImage.imageId ||
              null;

            if (!profileImageId && !selectedProfileImage.isExisting) {
              const uploadedImages =
                uploadResult?.data?.data || uploadResult?.data?.images || [];

              const newIndex = newImages.findIndex(
                (img) =>
                  img.uri === selectedProfileImage.uri ||
                  img.name === selectedProfileImage.name,
              );

              const matched = uploadedImages[newIndex];

              profileImageId =
                matched?.image_id ||
                matched?.id ||
                matched?.imageId ||
                profileImageId;
            }

            if (profileImageId) {
              await setPetProfileImageApi(editingId, profileImageId);
            }
          }

          Alert.alert("Success", "Pet updated successfully");

          closeModal();
          await loadPets();

          if (initialEditPetId && navigation.canGoBack()) {
            navigation.goBack();
          } else if (editingId) {
            navigation.navigate("Pets", {
              screen: "PetDetails",
              params: { petId: editingId },
            });
          }
        } else {
          Alert.alert("Error", response.data || "Update failed");
        }
      } else {
        const response = await addPetApi(payload);

        if (response.ok) {
          let petId = null;
          let uploadResult = { ok: true, data: null };

          try {
            const json = JSON.parse(response.data);

            petId = json?.data?.pet_id || json?.data?.id || json?.pet_id;
          } catch (e) {}

          if (petId && selectedImages.length > 0) {
            uploadResult = await uploadPetImagesApi(petId, selectedImages);
          }

          const selectedProfileImage =
            profileImageIndex !== null && selectedImages[profileImageIndex]
              ? selectedImages[profileImageIndex]
              : null;

          if (petId && selectedProfileImage) {
            let profileImageId =
              selectedProfileImage.image_id ||
              selectedProfileImage.id ||
              selectedProfileImage.imageId ||
              null;

            if (!profileImageId) {
              const uploadedImages =
                uploadResult?.data?.data || uploadResult?.data?.images || [];

              const newIndex = selectedImages.findIndex(
                (img) =>
                  img.uri === selectedProfileImage.uri ||
                  img.name === selectedProfileImage.name,
              );

              const matched = uploadedImages[newIndex];

              profileImageId =
                matched?.image_id ||
                matched?.id ||
                matched?.imageId ||
                profileImageId;
            }

            if (profileImageId) {
              await setPetProfileImageApi(petId, profileImageId);
            }
          }

          Alert.alert("Success", "Pet added successfully");

          closeModal();
          await loadPets();

          if (response.ok) {
            const petId =
              response?.data?.data?.pet_id ||
              response?.data?.data?.id ||
              response?.data?.pet_id ||
              response?.data?.id ||
              response?.pet_id ||
              response?.id ||
              null;

            if (petId) {
              navigation.navigate("Pets", {
                screen: "PetDetails",
                params: { petId },
              });
            }
          }
        } else {
          Alert.alert("Error", response.data || "Add failed");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (isGuest) {
      promptSignIn();
      return;
    }

    Alert.alert("Delete Pet", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },

      {
        text: "Delete",

        onPress: async () => {
          try {
            setLoading(true);

            const success = await deletePetApi(id);

            if (success) {
              Alert.alert("Success", "Pet deleted successfully");

              await loadPets();
            }
          } catch (error) {
            Alert.alert("Error", "Delete failed");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const editPet = async (pet) => {
    try {
      const id = pet?.pet_id || pet?.id || pet;

      if (!id) {
        Alert.alert("Error", "Pet id is missing");
        return;
      }

      setLoading(true);

      const fullPet = await fetchPetByIdApi(id);

      setEditingId(id);

      const existingImages = await fetchPetImagesApi(id);

      const mappedImages = existingImages.map((img) => ({
        ...img,
        uri: img.uri || img.image_url || img.url || img.pet_image,
        isExisting: true,
      }));

      setSelectedImages(mappedImages);
      setProfileImageIndex(
        mappedImages.findIndex(
          (img) =>
            img?.is_profile === "1" ||
            img?.is_profile === 1 ||
            img?.is_profile === true,
        ),
      );

      setPetData({
        pet_name: fullPet?.pet?.pet_name || "",
        pet_type: fullPet?.pet?.pet_type || "",
        breed: fullPet?.pet?.breed || "",
        gender: fullPet?.pet?.gender || "",

        age: fullPet?.pet?.age ? String(fullPet.pet.age) : "",

        date_of_birth: fullPet?.pet?.date_of_birth || "",

        weight: fullPet?.pet?.weight ? String(fullPet.pet.weight) : "",

        color_marks:
          fullPet?.pet?.color_marks ||
          fullPet?.pet?.color_identification_marks ||
          "",

        microchip_id: fullPet?.pet?.microchip_id || "",

        registration_number: fullPet?.pet?.registration_number || "",

        additional_details: fullPet?.pet?.additional_details || "",

        mother_name: fullPet?.pet?.mother_name || "",

        father_name: fullPet?.pet?.father_name || "",

        breeding_line: fullPet?.pet?.breeding_line || "",

        vaccination_status: fullPet?.health?.vaccination_status || "",

        vaccination_details: fullPet?.health?.vaccination_details || "",

        vaccination_notes: fullPet?.health?.vaccination_notes || "",

        vaccination_certificate:
          fullPet?.health?.vaccination_certificate || null,

        deworming_date:
          fullPet &&
          fullPet.health &&
          fullPet.health.deworming_date === "0000-00-00"
            ? ""
            : (fullPet && fullPet.health && fullPet.health.deworming_date) ||
              fullPet?.deworming_date ||
              "",

        flea_tick_treatment_date:
          fullPet &&
          fullPet.health &&
          fullPet.health.flea_tick_treatment_date === "0000-00-00"
            ? ""
            : (fullPet &&
                fullPet.health &&
                fullPet.health.flea_tick_treatment_date) ||
              fullPet?.flea_tick_treatment_date ||
              "",

        medical_history: fullPet?.health?.medical_history || "",

        allergies: fullPet?.health?.allergies || "",

        medical_conditions: fullPet?.health?.medical_conditions || "",

        current_medication: fullPet?.health?.current_medications || "",

        surgery_history: fullPet?.health?.surgery_history || "",

        neutered_spayed:
          fullPet?.health?.neutered_spayed === true ||
          fullPet?.health?.neutered_spayed === 1 ||
          fullPet?.health?.neutered_spayed === "1",

        vet_name: fullPet?.health?.vet_name || "",

        vet_clinic_name: fullPet?.health?.vet_clinic_name || "",

        vet_contact: fullPet?.health?.vet_contact || "",

        special_care_required: fullPet?.health?.special_care_required || "",

        eating_habit: fullPet?.behavior_feeding?.eating_habit || "",

        water_intake_habit: fullPet?.behavior_feeding?.water_intake_habit || "",

        friendly_with_humans:
          fullPet?.behavior_feeding?.friendly_with_humans === true ||
          fullPet?.behavior_feeding?.friendly_with_humans === 1 ||
          fullPet?.behavior_feeding?.friendly_with_humans === "1",

        friendly_with_dogs:
          fullPet?.behavior_feeding?.friendly_with_dogs === true ||
          fullPet?.behavior_feeding?.friendly_with_dogs === 1 ||
          fullPet?.behavior_feeding?.friendly_with_dogs === "1",

        aggressive_behavior:
          fullPet?.behavior_feeding?.aggressive_behavior === true ||
          fullPet?.behavior_feeding?.aggressive_behavior === 1 ||
          fullPet?.behavior_feeding?.aggressive_behavior === "1",

        anxiety_issues: fullPet?.behavior_feeding?.anxiety_issues || "",

        biting_history: fullPet?.behavior_feeding?.biting_history || "",

        food_type: fullPet?.behavior_feeding?.food_type || "",

        food_brand: fullPet?.behavior_feeding?.food_brand || "",

        feeding_schedule: fullPet?.behavior_feeding?.feeding_schedule || "",

        quantity_per_meal: fullPet?.behavior_feeding?.quantity_per_meal || "",

        treats_allowed:
          fullPet?.behavior_feeding?.treats_allowed === true ||
          fullPet?.behavior_feeding?.treats_allowed === 1 ||
          fullPet?.behavior_feeding?.treats_allowed === "1",

        food_allergies:
          fullPet?.behavior_feeding?.food_allergies === true ||
          fullPet?.behavior_feeding?.food_allergies === 1 ||
          fullPet?.behavior_feeding?.food_allergies === "1",

        food_allergy_details:
          fullPet?.behavior_feeding?.food_allergy_details || "",
      });

      setStep(1);

      setShowForm(true);
    } catch (error) {
      Alert.alert("Error", "Failed to load pet details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialEditPetId || hasOpenedInitialEdit) return;

    setHasOpenedInitialEdit(true);
    editPet(initialEditPetId);
  }, [initialEditPetId, hasOpenedInitialEdit]);

  useLayoutEffect(() => {
    const parent = navigation.getParent();

    parent?.setOptions({
      tabBarStyle: showForm ? { display: "none" } : undefined,
    });

    return () => {
      parent?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [showForm, navigation]);

  if (loading && pets.length === 0) {
    return (
      <View style={petScreenStyles.loaderContainer}>
        <PremiumLoader
          size={56}
          color="#6b21a8"
          label="Loading pets"
          fullScreen
        />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#faf5ff", "#fdf2f8", "#fff7ed"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={petScreenStyles.screen}
    >
      {/* HEADER */}

      <View style={petScreenStyles.header}>
        <Text style={petScreenStyles.heading}>My Pets 🐾</Text>

        <TouchableOpacity
          style={petScreenStyles.addBtn}
          onPress={() => {
            if (isGuest) {
              promptSignIn();
              return;
            }

            setEditingId(null);

            setSelectedImages([]);
            setProfileImageIndex(null);

            setPetData(initialPetData);

            setStep(1);

            setShowForm(true);
          }}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* PET LIST */}

      {loading && (pets.length > 0 || showForm) && (
        <View style={petScreenStyles.loadingOverlay}>
          <PremiumLoader size={48} color="#6b21a8" label="Refreshing" />
        </View>
      )}

      <FlatList
        data={pets}
        numColumns={numColumns}
        key={numColumns}
        keyExtractor={(item, index) => String(item.pet_id || item.id || index)}
        columnWrapperStyle={
          numColumns > 1
            ? {
                justifyContent: "space-between",
                marginBottom: 12,
              }
            : undefined
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);

              loadPets(1, false);
            }}
          />
        }
        contentContainerStyle={petScreenStyles.container}
        onEndReached={() => {
          if (!loading && !loadingMore && hasMorePages) {
            loadPets(currentPage + 1, true);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasMorePages ? (
            <View style={petScreenStyles.paginationFooter}>
              <TouchableOpacity
                style={petScreenStyles.nextPageButton}
                onPress={() => {
                  if (!loading && !loadingMore && hasMorePages) {
                    loadPets(currentPage + 1, true);
                  }
                }}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <PremiumLoader size={18} color="#ffffff" showLabel={false} />
                ) : (
                  <Text style={petScreenStyles.nextPageButtonText}>
                    Next Page {currentPage + 1}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <PetCard
            item={item}
            petImages={petImages}
            navigation={navigation}
            cardWidth={cardWidth}
            onEdit={(pet) => {
              if (isGuest) {
                promptSignIn();
                return;
              }
              editPet(pet);
            }}
            onDelete={handleDelete}
          />
        )}
      />

      {/* MODAL */}

      <PetFormModal
        visible={showForm}
        animationType="slide"
        transparent={false}
        editingId={editingId}
        step={step}
        setStep={setStep}
        petData={petData}
        setPetData={setPetData}
        selectedImages={selectedImages}
        pickImages={pickImages}
        removeImage={removeImage}
        profileImageIndex={profileImageIndex}
        setProfileImageIndex={setProfileImageIndex}
        loading={loading}
        onClose={handleModalClose}
        onSubmit={handleAddOrUpdate}
      />
    </LinearGradient>
  );
}
