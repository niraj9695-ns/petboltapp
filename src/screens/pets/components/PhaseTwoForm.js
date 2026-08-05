import React, { useState } from "react";

import {
  View,
  TextInput,
  Switch,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import * as DocumentPicker from "expo-document-picker";

import createPhaseTwoFormStyles from "../styles/PhaseTwoFormStyles";
import { useTheme } from "../../../context/ThemeContext";

export default function PhaseTwoForm({ petData, setPetData }) {
  const [showDewormingPicker, setShowDewormingPicker] = useState(false);

  const [showFleaTickPicker, setShowFleaTickPicker] = useState(false);
  const { theme } = useTheme();
  const phaseTwoFormStyles = createPhaseTwoFormStyles(theme);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
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
          Alert.alert(
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
      Alert.alert("Error", "Unable to pick vaccination certificate");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Mother Name"
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

      <Text style={phaseTwoFormStyles.sectionLabel}>
        Vaccination Certificate
      </Text>

      <TouchableOpacity
        style={phaseTwoFormStyles.dateInput}
        onPress={pickVaccinationCertificate}
      >
        <Text style={phaseTwoFormStyles.dateInputText} numberOfLines={1}>
          {petData.vaccination_certificate?.name ||
            petData.vaccination_certificate?.uri?.split("/").pop() ||
            "Select PDF certificate"}
        </Text>
        <Ionicons name="cloud-upload-outline" size={18} color="#6b21a8" />
      </TouchableOpacity>

      {/* DEWORMING DATE */}

      <Text style={phaseTwoFormStyles.sectionLabel}>Deworming Date</Text>

      <TouchableOpacity
        style={phaseTwoFormStyles.dateInput}
        onPress={() => setShowDewormingPicker(true)}
      >
        <Text style={phaseTwoFormStyles.dateInputText}>
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
        <Text style={phaseTwoFormStyles.dateInputText}>
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
