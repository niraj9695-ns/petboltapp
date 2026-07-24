import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { fetchPetByIdApi } from "../services/petService";

export default function PetDetailsScreen({ route }) {
  const { petId } = route.params;

  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPetDetails();
  }, []);

  const loadPetDetails = async () => {
    try {
      const data = await fetchPetByIdApi(petId);

      setPetData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  if (!petData) {
    return (
      <View style={styles.loader}>
        <Text>No pet details found</Text>
      </View>
    );
  }

  const owner = petData.owner || {};
  const pet = petData.pet || {};
  const health = petData.health || {};
  const behavior = petData.behavior_feeding || {};

  const DetailRow = ({ label, value }) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {value === null || value === undefined || value === ""
          ? "-"
          : String(value)}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Pet Details</Text>

      {/* PET DETAILS */}
      <Text style={styles.section}>Pet Information</Text>

      <DetailRow label="Pet Name" value={pet.pet_name} />
      <DetailRow label="Pet Type" value={pet.pet_type} />
      <DetailRow label="Breed" value={pet.breed} />
      <DetailRow label="Gender" value={pet.gender} />
      <DetailRow label="Age" value={pet.age} />
      <DetailRow label="Date Of Birth" value={pet.date_of_birth} />
      <DetailRow label="Weight" value={pet.weight} />
      <DetailRow
        label="Color Identification Marks"
        value={pet.color_identification_marks}
      />
      <DetailRow label="Microchip ID" value={pet.microchip_id} />
      <DetailRow label="Registration Number" value={pet.registration_number} />
      <DetailRow label="Additional Details" value={pet.additional_details} />

      {/* FAMILY DETAILS */}
      <Text style={styles.section}>Family Details</Text>

      <DetailRow label="Mother Name" value={pet.mother_name} />
      <DetailRow label="Father Name" value={pet.father_name} />
      <DetailRow label="Breeding Line" value={pet.breeding_line} />

      {/* HEALTH DETAILS */}
      <Text style={styles.section}>Health Details</Text>

      <DetailRow label="Vaccination Status" value={health.vaccination_status} />
      <DetailRow
        label="Vaccination Details"
        value={health.vaccination_details}
      />
      <DetailRow label="Vaccination Notes" value={health.vaccination_notes} />
      <DetailRow label="Deworming Date" value={health.deworming_date} />
      <DetailRow
        label="Flea Tick Treatment Date"
        value={health.flea_tick_treatment_date}
      />
      <DetailRow label="Medical History" value={health.medical_history} />
      <DetailRow label="Allergies" value={health.allergies} />
      <DetailRow label="Medical Conditions" value={health.medical_conditions} />
      <DetailRow
        label="Current Medications"
        value={health.current_medications}
      />
      <DetailRow label="Surgery History" value={health.surgery_history} />
      <DetailRow
        label="Neutered / Spayed"
        value={health.neutered_spayed === "1" ? "Yes" : "No"}
      />

      {/* VET DETAILS */}
      <Text style={styles.section}>Veterinarian Details</Text>

      <DetailRow label="Vet Name" value={health.vet_name} />
      <DetailRow label="Vet Clinic Name" value={health.vet_clinic_name} />
      <DetailRow label="Vet Contact" value={health.vet_contact} />
      <DetailRow
        label="Special Care Required"
        value={health.special_care_required}
      />

      {/* BEHAVIOR & FEEDING */}
      <Text style={styles.section}>Behavior & Feeding</Text>

      <DetailRow label="Eating Habit" value={behavior.eating_habit} />
      <DetailRow
        label="Water Intake Habit"
        value={behavior.water_intake_habit}
      />
      <DetailRow
        label="Friendly With Humans"
        value={behavior.friendly_with_humans === "1" ? "Yes" : "No"}
      />
      <DetailRow
        label="Friendly With Dogs"
        value={behavior.friendly_with_dogs === "1" ? "Yes" : "No"}
      />
      <DetailRow
        label="Aggressive Behavior"
        value={behavior.aggressive_behavior === "1" ? "Yes" : "No"}
      />
      <DetailRow label="Anxiety Issues" value={behavior.anxiety_issues} />
      <DetailRow label="Biting History" value={behavior.biting_history} />
      <DetailRow label="Food Type" value={behavior.food_type} />
      <DetailRow label="Food Brand" value={behavior.food_brand} />
      <DetailRow label="Feeding Schedule" value={behavior.feeding_schedule} />
      <DetailRow label="Quantity Per Meal" value={behavior.quantity_per_meal} />
      <DetailRow
        label="Treats Allowed"
        value={behavior.treats_allowed === "1" ? "Yes" : "No"}
      />
      <DetailRow
        label="Food Allergies"
        value={behavior.food_allergies === "1" ? "Yes" : "No"}
      />
      <DetailRow
        label="Food Allergy Details"
        value={behavior.food_allergy_details}
      />

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#f97316",
    marginBottom: 15,
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f97316",
    marginTop: 20,
    marginBottom: 10,
  },

  row: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
  },

  value: {
    marginTop: 4,
    fontSize: 15,
    color: "#666",
  },
});
