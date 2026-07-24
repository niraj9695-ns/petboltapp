import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import PetCard from "./pets/components/PetCard";

import PetFormModal from "./pets/components/PetFormModal";

import styles from "./pets/styles/petStyles";

import {
  fetchPetByIdApi,
  fetchPetsApi,
  addPetApi,
  updatePetApi,
  deletePetApi,
} from "./pets/services/petService";

import {
  fetchPetImagesApi,
  uploadPetImagesApi,
  deletePetImageApi,
} from "./pets/services/imageService";

export default function PetScreen({ navigation }) {
  const [pets, setPets] = useState([]);

  const [petImages, setPetImages] = useState({});

  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [selectedImages, setSelectedImages] = useState([]);

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

  useEffect(() => {
    loadPets();
  }, []);

  // LOAD PETS
  const loadPets = async () => {
    try {
      setLoading(true);

      const petList = await fetchPetsApi();

      setPets(petList);

      const imagesObj = {};

      for (const pet of petList) {
        const petId = pet.pet_id || pet.id;

        const images = await fetchPetImagesApi(petId);

        imagesObj[petId] = images;
      }

      setPetImages(imagesObj);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch pets");
    } finally {
      setLoading(false);

      setRefreshing(false);
    }
  };

  // REMOVE IMAGE
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
    } catch (error) {
      Alert.alert("Error", "Failed to remove image");
    }
  };

  // IMAGE PICKER
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

  // CLOSE MODAL
  const closeModal = () => {
    setShowForm(false);

    setEditingId(null);

    setSelectedImages([]);

    setStep(1);

    setPetData(initialPetData);
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

    if (!petData.age) {
      Alert.alert("Validation", "Age is required");
      return false;
    }

    if (!petData.date_of_birth) {
      Alert.alert("Validation", "Date Of Birth is required");
      return false;
    }

    if (!petData.weight) {
      Alert.alert("Validation", "Weight is required");
      return false;
    }

    if (!petData.food_type) {
      Alert.alert("Validation", "Food Type is required");
      return false;
    }

    return true;
  };

  // ADD / UPDATE PET
  const handleAddOrUpdate = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true);

      const payload = {
        ...petData,

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

      // UPDATE
      if (editingId) {
        const response = await updatePetApi({
          pet_id: Number(editingId),
          ...payload,
        });

        if (response.ok) {
          // UPLOAD ONLY NEW IMAGES
          const newImages = selectedImages.filter(
            (img) => img.fileName || img.mimeType || img.type,
          );

          if (newImages.length > 0) {
            await uploadPetImagesApi(editingId, newImages);
          }

          Alert.alert("Success", "Pet updated successfully");

          closeModal();

          loadPets();
        } else {
          Alert.alert("Error", response.data || "Update failed");
        }
      } else {
        // ADD PET
        const response = await addPetApi(payload);

        if (response.ok) {
          let petId = null;

          try {
            const json = JSON.parse(response.data);

            petId = json?.data?.pet_id || json?.data?.id || json?.pet_id;
          } catch (e) {}

          // UPLOAD IMAGES
          if (petId && selectedImages.length > 0) {
            await uploadPetImagesApi(petId, selectedImages);
          }

          Alert.alert("Success", "Pet added successfully");

          closeModal();

          loadPets();
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

  // DELETE PET
  const handleDelete = async (id) => {
    Alert.alert("Delete Pet", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },

      {
        text: "Delete",

        onPress: async () => {
          try {
            const success = await deletePetApi(id);

            if (success) {
              Alert.alert("Success", "Pet deleted successfully");

              loadPets();
            }
          } catch (error) {
            Alert.alert("Error", "Delete failed");
          }
        },
      },
    ]);
  };

  // EDIT PET
  // EDIT PET
  const editPet = async (pet) => {
    try {
      const id = pet.pet_id || pet.id;

      setLoading(true);

      // FETCH FULL PET DETAILS
      const fullPet = await fetchPetByIdApi(id);

      setEditingId(id);

      // FETCH PET IMAGES
      const existingImages = await fetchPetImagesApi(id);

      setSelectedImages(
        existingImages.map((img) => ({
          ...img,
          uri: img.uri || img.image_url || img.url || img.pet_image,
          isExisting: true,
        })),
      );

      // SET FULL DATA
      setPetData({
        // PET
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

        // HEALTH
        vaccination_status: fullPet?.health?.vaccination_status || "",

        vaccination_details: fullPet?.health?.vaccination_details || "",

        vaccination_notes: fullPet?.health?.vaccination_notes || "",

        deworming_date:
          fullPet?.health?.deworming_date === "0000-00-00"
            ? ""
            : fullPet?.health?.deworming_date || "",

        flea_tick_treatment_date:
          fullPet?.health?.flea_tick_treatment_date === "0000-00-00"
            ? ""
            : fullPet?.health?.flea_tick_treatment_date || "",

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

        // BEHAVIOR + FOOD
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

  // LOADER
  if (loading && pets.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.heading}>My Pets 🐾</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            setEditingId(null);

            setSelectedImages([]);

            setPetData(initialPetData);

            setStep(1);

            setShowForm(true);
          }}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* PET LIST */}

      <FlatList
        data={pets}
        keyExtractor={(item, index) => String(item.pet_id || item.id || index)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);

              loadPets();
            }}
          />
        }
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <PetCard
            item={item}
            petImages={petImages}
            styles={styles}
            navigation={navigation}
            onEdit={editPet}
            onDelete={handleDelete}
          />
        )}
      />

      {/* MODAL */}

      <PetFormModal
        visible={showForm}
        editingId={editingId}
        step={step}
        setStep={setStep}
        petData={petData}
        setPetData={setPetData}
        selectedImages={selectedImages}
        pickImages={pickImages}
        removeImage={removeImage}
        loading={loading}
        styles={styles}
        onClose={closeModal}
        onSubmit={handleAddOrUpdate}
      />
    </View>
  );
}
