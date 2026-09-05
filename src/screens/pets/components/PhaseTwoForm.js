import { appAlert } from "../../../utils/alert";
import React, { useState } from "react";

import {
  View,
  TextInput,
  Switch,
  Text,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import * as DocumentPicker from "expo-document-picker";

import createPhaseTwoFormStyles from "../styles/PhaseTwoFormStyles";
import { useTheme } from "../../../context/ThemeContext";
import FormLabel from "./FormLabel";

export default function PhaseTwoForm({
  petData,
  setPetData,
  fieldErrors = {},
  fieldPositions,
}) {
  const [showDewormingPicker, setShowDewormingPicker] = useState(false);

  const [showFleaTickPicker, setShowFleaTickPicker] = useState(false);
  const { theme } = useTheme();
  const phaseTwoFormStyles = createPhaseTwoFormStyles(theme);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const getVaccinationCertificateLabel = (certificate) => {
    if (!certificate) return "Select PDF certificate";
    if (typeof certificate === "string") {
      const trimmed = certificate.trim();
      if (!trimmed) return "Select PDF certificate";
      return trimmed.split("/").pop();
    }
    return (
      certificate?.name ||
      certificate?.uri?.split("/").pop() ||
      certificate?.path?.split("/").pop() ||
      "Vaccination Certificate"
    );
  };

  const pickVaccinationCertificate = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/png", "image/jpeg", "image/jpg"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets?.[0] || result;
        const fileSize = file.size || file.fileSize || 0;

        if (fileSize > 5 * 1024 * 1024) {
          appAlert.alert(
            "File too large",
            "Vaccination certificate must be a PDF under 5MB.",
          );
          return;
        }

        setPetData({
          ...petData,
          vaccination_certificate: file,
        });
      }
    } catch (error) {
      appAlert.alert("Error", "Unable to pick vaccination certificate");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Mother Name"
        placeholderTextColor={theme.placeholder}
        style={phaseTwoFormStyles.input}
        value={petData.mother_name}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            mother_name: text,
          })
        }
      />

      <TextInput
        placeholder="Father Name"
        placeholderTextColor={theme.placeholder}
        style={phaseTwoFormStyles.input}
        value={petData.father_name}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            father_name: text,
          })
        }
      />

      <TextInput
        placeholder="Breeding Line"
        placeholderTextColor={theme.placeholder}
        style={phaseTwoFormStyles.input}
        value={petData.breeding_line}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            breeding_line: text,
          })
        }
      />

      <TextInput
        placeholder="Vaccination Status"
        placeholderTextColor={theme.placeholder}
        style={phaseTwoFormStyles.input}
        value={petData.vaccination_status}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            vaccination_status: text,
          })
        }
      />

      <TextInput
        placeholder="Vaccination Details"
        placeholderTextColor={theme.placeholder}
        multiline
        style={[phaseTwoFormStyles.input, phaseTwoFormStyles.textArea]}
        value={petData.vaccination_details}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            vaccination_details: text,
          })
        }
      />

      <TextInput
        placeholder="Vaccination Notes"
        placeholderTextColor={theme.placeholder}
        multiline
        style={[phaseTwoFormStyles.input, phaseTwoFormStyles.textArea]}
        value={petData.vaccination_notes}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            vaccination_notes: text,
          })
        }
      />

      <View
        onLayout={(e) => {
          fieldPositions.current.vaccination_certificate =
            e.nativeEvent.layout.y;
        }}
      >
        <FormLabel
          title="Vaccination Certificate"
          required
          error={fieldErrors.vaccination_certificate}
        />
        <TouchableOpacity
          style={[
            phaseTwoFormStyles.dateInput,
            fieldErrors.vaccination_certificate &&
              phaseTwoFormStyles.inputError,
          ]}
          onPress={pickVaccinationCertificate}
        >
          <Text
            style={[
              phaseTwoFormStyles.dateInputText,
              {
                color: petData.vaccination_certificate
                  ? theme.textPrimary
                  : theme.textSecondary,
              },
            ]}
            numberOfLines={1}
          >
            {getVaccinationCertificateLabel(petData.vaccination_certificate)}
          </Text>
          <Ionicons name="cloud-upload-outline" size={18} color="#6b21a8" />
        </TouchableOpacity>
      </View>

      {/* DEWORMING DATE */}

      <Text style={phaseTwoFormStyles.sectionLabel}>Deworming Date</Text>

      <TouchableOpacity
        style={phaseTwoFormStyles.dateInput}
        onPress={() => setShowDewormingPicker(true)}
      >
        <Text
          style={[
            phaseTwoFormStyles.dateInputText,
            {
              color: petData.deworming_date
                ? theme.textPrimary
                : theme.textSecondary,
            },
          ]}
        >
          {petData.deworming_date || "Select Deworming Date"}
        </Text>
        <Ionicons name="calendar-outline" size={18} color="#6b21a8" />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showDewormingPicker}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => {
          setPetData({
            ...petData,
            deworming_date: formatDate(date),
          });

          setShowDewormingPicker(false);
        }}
        onCancel={() => setShowDewormingPicker(false)}
      />

      {/* FLEA TICK DATE */}

      <Text style={phaseTwoFormStyles.sectionLabel}>
        Flea Tick Treatment Date
      </Text>

      <TouchableOpacity
        style={phaseTwoFormStyles.dateInput}
        onPress={() => setShowFleaTickPicker(true)}
      >
        <Text
          style={[
            phaseTwoFormStyles.dateInputText,
            {
              color: petData.flea_tick_treatment_date
                ? theme.textPrimary
                : theme.textSecondary,
            },
          ]}
        >
          {petData.flea_tick_treatment_date ||
            "Select Flea Tick Treatment Date"}
        </Text>
        <Ionicons name="calendar-outline" size={18} color="#6b21a8" />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showFleaTickPicker}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => {
          setPetData({
            ...petData,
            flea_tick_treatment_date: formatDate(date),
          });

          setShowFleaTickPicker(false);
        }}
        onCancel={() => setShowFleaTickPicker(false)}
      />

      <TextInput
        placeholder="Medical History"
        placeholderTextColor={theme.placeholder}
        multiline
        style={[phaseTwoFormStyles.input, phaseTwoFormStyles.textArea]}
        value={petData.medical_history}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            medical_history: text,
          })
        }
      />

      <TextInput
        placeholder="Allergies"
        placeholderTextColor={theme.placeholder}
        style={phaseTwoFormStyles.input}
        value={petData.allergies}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            allergies: text,
          })
        }
      />

      <TextInput
        placeholder="Medical Conditions"
        placeholderTextColor={theme.placeholder}
        multiline
        style={[phaseTwoFormStyles.input, phaseTwoFormStyles.textArea]}
        value={petData.medical_conditions}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            medical_conditions: text,
          })
        }
      />

      <TextInput
        placeholder="Current Medication"
        placeholderTextColor={theme.placeholder}
        style={phaseTwoFormStyles.input}
        value={petData.current_medication}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            current_medication: text,
          })
        }
      />

      <TextInput
        placeholder="Surgery History"
        placeholderTextColor={theme.placeholder}
        multiline
        style={[phaseTwoFormStyles.input, phaseTwoFormStyles.textArea]}
        value={petData.surgery_history}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            surgery_history: text,
          })
        }
      />

      <View style={phaseTwoFormStyles.switchContainer}>
        <Text style={phaseTwoFormStyles.switchLabel}>Neutered / Spayed</Text>

        <Switch
          value={petData.neutered_spayed}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              neutered_spayed: value,
            })
          }
        />
      </View>
    </View>
  );
}
