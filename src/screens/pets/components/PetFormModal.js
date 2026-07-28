import React, { useMemo, useState } from "react";

import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import petFormModalStyles from "../styles/PetFormModalStyles";

import StepIndicator from "./StepIndicator";

import PhaseOneForm from "./PhaseOneForm";

import PhaseTwoForm from "./PhaseTwoForm";

import PhaseThreeForm from "./PhaseThreeForm";

export default function PetFormModal({
  visible,
  editingId,
  step,
  setStep,
  petData,
  setPetData,
  selectedImages,
  pickImages,
  removeImage, // NEW
  profileImageIndex,
  setProfileImageIndex,
  loading,
  onClose,
  onSubmit,
}) {
  const [fieldErrors, setFieldErrors] = useState({});

  const requiredFieldsByStep = useMemo(
    () => ({
      1: [
        "pet_name",
        "pet_type",
        "breed",
        "gender",
        "age",
        "date_of_birth",
        "weight",
      ],
      2: [],
      3: ["food_type"],
    }),
    [],
  );

  const validateCurrentStep = () => {
    const currentRequiredFields = requiredFieldsByStep[step] || [];
    const missing = {};

    currentRequiredFields.forEach((field) => {
      const value = petData?.[field];
      if (typeof value === "string" && !value.trim()) {
        missing[field] = true;
      } else if (!value) {
        missing[field] = true;
      }
    });

    setFieldErrors(missing);

    if (Object.keys(missing).length > 0) {
      const labels = currentRequiredFields
        .filter((field) => missing[field])
        .map((field) => field.replace(/_/g, " "));

      Alert.alert(
        "Required fields missing",
        `Please complete: ${labels.join(", ")}`,
      );
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    setStep(step + 1);
  };

  const handleSubmit = () => {
    if (!validateCurrentStep()) return;
    onSubmit();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={petFormModalStyles.modalContainer}>
        <ScrollView
          style={petFormModalStyles.modalContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={petFormModalStyles.header}>
            <Text style={petFormModalStyles.modalTitle}>
              {editingId ? "Update Pet" : "Add Pet"}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={petFormModalStyles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <StepIndicator step={step} />

          {step === 1 && (
            <PhaseOneForm
              petData={petData}
              setPetData={setPetData}
              fieldErrors={fieldErrors}
              pickImages={pickImages}
              selectedImages={selectedImages}
              removeImage={removeImage}
              profileImageIndex={profileImageIndex}
              setProfileImageIndex={setProfileImageIndex}
            />
          )}

          {step === 2 && (
            <PhaseTwoForm
              petData={petData}
              setPetData={setPetData}
            />
          )}

          {step === 3 && (
            <PhaseThreeForm
              petData={petData}
              setPetData={setPetData}
              fieldErrors={fieldErrors}
            />
          )}

          {/* BUTTONS */}

          <View style={petFormModalStyles.stepButtonRow}>
            {step > 1 && (
              <TouchableOpacity
                style={petFormModalStyles.backBtn}
                onPress={() => setStep(step - 1)}
              >
                <Text style={petFormModalStyles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}

            {step < 3 ? (
              <TouchableOpacity style={petFormModalStyles.nextBtn} onPress={handleNext}>
                <Text style={petFormModalStyles.buttonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={petFormModalStyles.button}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={petFormModalStyles.buttonText}>
                    {editingId ? "Update Pet" : "Add Pet"}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* CLOSE BUTTON */}

          <TouchableOpacity style={petFormModalStyles.closeBtn} onPress={onClose}>
            <Text style={petFormModalStyles.closeText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

