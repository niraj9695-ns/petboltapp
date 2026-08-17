import React, { useMemo, useState, useRef } from "react";

import { Modal, View, Text, ScrollView, TouchableOpacity } from "react-native";
import PremiumLoader from "../../../components/PremiumLoader";

import createPetFormModalStyles from "../styles/PetFormModalStyles";
import { useTheme } from "../../../context/ThemeContext";

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

  const scrollViewRef = useRef(null);
  const fieldPositions = useRef({});
  const { theme } = useTheme();
  const petFormModalStyles = createPetFormModalStyles(theme);

  const requiredFieldsByStep = useMemo(
    () => ({
      1: ["pet_name", "pet_type", "breed", "gender"],
      2: ["vaccination_certificate"],
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
      const firstErrorField = Object.keys(missing)[0];

      scrollViewRef.current?.scrollTo({
        y: fieldPositions.current[firstErrorField] || 0,
        animated: true,
      });
    }
    if (Object.keys(missing).length > 0) {
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
          ref={scrollViewRef}
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
              fieldPositions={fieldPositions}
            />
          )}

          {step === 2 && (
            <PhaseTwoForm
              petData={petData}
              setPetData={setPetData}
              fieldErrors={fieldErrors}
              fieldPositions={fieldPositions}
            />
          )}

          {step === 3 && (
            <PhaseThreeForm
              petData={petData}
              setPetData={setPetData}
              fieldErrors={fieldErrors}
              fieldPositions={fieldPositions}
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
              <TouchableOpacity
                style={petFormModalStyles.nextBtn}
                onPress={handleNext}
              >
                <Text style={petFormModalStyles.buttonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={petFormModalStyles.button}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <PremiumLoader size={20} color="#fff" showLabel={false} />
                ) : (
                  <Text style={petFormModalStyles.buttonText}>
                    {editingId ? "Update Pet" : "Add Pet"}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* CLOSE BUTTON */}

          <TouchableOpacity
            style={petFormModalStyles.closeBtn}
            onPress={onClose}
          >
            <Text style={petFormModalStyles.closeText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}
