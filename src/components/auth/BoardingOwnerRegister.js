import React, { useState } from "react";
import FloatingInput from "../inputs/FloatingInput";
import { PasswordInput } from "../inputs/PasswordInput";
import DateInput from "../inputs/DateInput";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";

export default function BoardingOwnerRegister({
  setStep,
  setOtpType,
  setEmail: setGlobalEmail,
}) {
  const [currentStep, setCurrentStep] = useState(1);

  const [loading, setLoading] = useState(false);

  // =====================================
  // STEP 1 - OWNER DETAILS
  // =====================================

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");

  const [alternateContactNumber, setAlternateContactNumber] = useState("");

  const [emergencyContactName, setEmergencyContactName] = useState("");

  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");

  const [businessName, setBusinessName] = useState("");

  // =====================================
  // STEP 2 - CENTER DETAILS
  // =====================================

  const [centerName, setCenterName] = useState("");

  const [address, setAddress] = useState("");

  const [addressLine2, setAddressLine2] = useState("");

  const [city, setCity] = useState("");

  const [stateName, setStateName] = useState("");

  const [pinCode, setPinCode] = useState("");
  const [latitude, setLatitude] = useState("");

  const [longitude, setLongitude] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const [fencingStatus, setFencingStatus] = useState("");

  const [supervisionLevel, setSupervisionLevel] = useState("");

  const [totalCapacity, setTotalCapacity] = useState("");

  const [description, setDescription] = useState("");

  const [pricePerDay, setPricePerDay] = useState("");

  // =====================================
  // STEP 3 - SERVICES
  // =====================================

  const [acceptedPetTypes, setAcceptedPetTypes] = useState("");

  const [sizeWeightRestrictions, setSizeWeightRestrictions] = useState("");

  const [agePreferences, setAgePreferences] = useState("");

  const [requiredVaccines, setRequiredVaccines] = useState("");

  const [boardingServices, setBoardingServices] = useState("");

  const [amenities, setAmenities] = useState("");

  const [vaccinationPolicy, setVaccinationPolicy] = useState("");

  // =====================================
  // STEP 4 - DOCUMENTS
  // =====================================

  const [aadharFile, setAadharFile] = useState(null);

  const [licenseProof, setLicenseProof] = useState(null);

  const [centerPhotos, setCenterPhotos] = useState([]);

  // =====================================
  // STEP 5 - EXTRA DETAILS
  // =====================================

  const [vetClinicName, setVetClinicName] = useState("");

  const [vetClinicAddress, setVetClinicAddress] = useState("");

  const [vetClinicContact, setVetClinicContact] = useState("");

  const [registrationLicenseNumber, setRegistrationLicenseNumber] =
    useState("");

  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState("");

  const [insuranceProviderName, setInsuranceProviderName] = useState("");

  const [insuranceExpiryDate, setInsuranceExpiryDate] = useState(null);

  const [openingTime, setOpeningTime] = useState("");

  const [closingTime, setClosingTime] = useState("");

  const [specialInstructions, setSpecialInstructions] = useState("");

  const [authorizedPersonName, setAuthorizedPersonName] = useState("");

  const [digitalSignature, setDigitalSignature] = useState("");

  const [signatureDate, setSignatureDate] = useState(null);

  const [termsAccepted, setTermsAccepted] = useState(false);

  //file pickers
  const pickAadhar = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
    });

    if (!result.canceled) {
      setAadharFile(result.assets[0]);
    }
  };

  const pickLicense = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
    });

    if (!result.canceled) {
      setLicenseProof(result.assets[0]);
    }
  };

  const pickCenterPhotos = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      multiple: true,
    });

    if (!result.canceled) {
      setCenterPhotos(result.assets);
    }
  };

  // =====================================
  // STEP VALIDATION
  // =====================================

  const validateStep = () => {
    if (currentStep === 1) {
      if (
        !fullName ||
        !email ||
        !password ||
        !mobileNumber ||
        !emergencyContactName ||
        !emergencyContactNumber
      ) {
        Alert.alert("Validation", "Please fill all owner details");
        return false;
      }
    }

    if (currentStep === 2) {
      if (
        !address ||
        !city ||
        !stateName ||
        !pinCode ||
        !propertyType ||
        !fencingStatus ||
        !supervisionLevel ||
        !totalCapacity
      ) {
        Alert.alert("Validation", "Please fill all boarding center details");
        return false;
      }
    }

    if (currentStep === 3) {
      if (!acceptedPetTypes || !vaccinationPolicy) {
        Alert.alert("Validation", "Please fill required service details");
        return false;
      }
    }

    return true;
  };

  // =====================================
  // NEXT STEP
  // =====================================

  const nextStep = () => {
    if (!validateStep()) return;

    setCurrentStep(currentStep + 1);
  };

  // =====================================
  // PREVIOUS STEP
  // =====================================

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // =====================================
  // SUBMIT REGISTRATION
  // =====================================

  const handleRegister = async () => {
    if (!termsAccepted) {
      Alert.alert("Validation", "Please accept terms and conditions");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // ==========================
      // OWNER
      // ==========================

      formData.append("full_name", fullName);

      formData.append("email", email);

      formData.append("password", password);

      formData.append("mobile_number", mobileNumber);

      formData.append("alternate_contact_number", alternateContactNumber);

      formData.append("emergency_contact_name", emergencyContactName);

      formData.append("emergency_contact_number", emergencyContactNumber);

      //   formData.append(
      //     "residential_address",
      //     residentialAddress
      //   );

      formData.append("business_name", businessName);

      // ==========================
      // CENTER
      // ==========================

      formData.append("center_name", centerName);

      formData.append("address", address);

      formData.append("address_line_2", addressLine2);
      formData.append("city", city);

      formData.append("state", stateName);

      formData.append("pin_code", pinCode);

      formData.append("latitude", latitude);

      formData.append("longitude", longitude);

      formData.append("property_type", propertyType);

      formData.append("fencing_status", fencingStatus);

      formData.append("supervision_level", supervisionLevel);

      formData.append("total_capacity", totalCapacity);

      formData.append("description", description);

      formData.append("price_per_day", pricePerDay);

      // ==========================
      // ARRAYS
      // ==========================

      formData.append(
        "accepted_pet_types",
        JSON.stringify(
          acceptedPetTypes
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      );

      formData.append(
        "size_weight_restrictions",
        JSON.stringify(
          sizeWeightRestrictions
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      );

      formData.append(
        "age_preferences",
        JSON.stringify(
          agePreferences
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      );

      formData.append(
        "required_vaccines",
        JSON.stringify(
          requiredVaccines
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      );

      formData.append(
        "boarding_services",
        JSON.stringify(
          boardingServices
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      );

      formData.append(
        "amenities",
        JSON.stringify(
          amenities
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
      );

      formData.append("vaccination_policy", vaccinationPolicy);

      // ==========================
      // EXTRA DETAILS
      // ==========================

      formData.append("vet_clinic_name", vetClinicName);

      formData.append("vet_clinic_address", vetClinicAddress);

      formData.append("vet_clinic_contact", vetClinicContact);

      formData.append("registration_license_number", registrationLicenseNumber);

      formData.append("insurance_policy_number", insurancePolicyNumber);

      formData.append("insurance_provider_name", insuranceProviderName);

      formData.append(
        "insurance_expiry_date",
        insuranceExpiryDate
          ? insuranceExpiryDate.toISOString().split("T")[0]
          : "",
      );

      formData.append("opening_time", openingTime);

      formData.append("closing_time", closingTime);

      formData.append("special_instructions", specialInstructions);

      formData.append("authorized_person_name", authorizedPersonName);

      formData.append("digital_signature", digitalSignature);

      formData.append(
        "signature_date",
        signatureDate ? signatureDate.toISOString().split("T")[0] : "",
      );

      formData.append("terms_accepted", "1");

      // ==========================
      // FILES
      // ==========================

      if (aadharFile) {
        formData.append("aadhar_file", {
          uri: aadharFile.uri,
          name: aadharFile.name,
          type: aadharFile.mimeType || "image/jpeg",
        });
      }

      if (licenseProof) {
        formData.append("license_proof", {
          uri: licenseProof.uri,
          name: licenseProof.name,
          type: licenseProof.mimeType || "image/jpeg",
        });
      }

      if (centerPhotos && centerPhotos.length > 0) {
        centerPhotos.forEach((photo) => {
          formData.append("center_photos[]", {
            uri: photo.uri,
            name: photo.name,
            type: photo.mimeType || "image/jpeg",
          });
        });
      }

      const response = await fetch(
        "https://www.cgpisoftware.com/cheerytail/api/owner/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        },
      );
      const result = await response.json();

      if (result.status === true || result.status === "success") {
        setGlobalEmail(email); // store globally

        setOtpType("register");
        setStep("otp"); // navigate to OTP screen
      } else {
        Alert.alert("Error", result.message || "Registration Failed");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          height: 8,
          backgroundColor: "#e5e7eb",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            height: 8,
            width: `${(currentStep / 5) * 100}%`,
            backgroundColor: "#6b21a8",
            borderRadius: 10,
          }}
        />
      </View>

      <Text
        style={{
          textAlign: "center",
          marginBottom: 20,
          color: "#666",
          fontWeight: "600",
        }}
      >
        Step {currentStep} of 5
      </Text>
      {/* =====================================
STEP 1 - OWNER DETAILS
===================================== */}

      {currentStep === 1 && (
        <View>
          <Text style={styles.heading}>Owner Details</Text>
          <FloatingInput
            label="Full Name *"
            value={fullName}
            onChangeText={setFullName}
          />

          <FloatingInput
            label="Email *"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <PasswordInput
            label="Password *"
            value={password}
            onChangeText={setPassword}
          />

          <FloatingInput
            label="Mobile Number *"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
          />

          <FloatingInput
            label="Alternate Contact Number"
            value={alternateContactNumber}
            onChangeText={setAlternateContactNumber}
            keyboardType="phone-pad"
          />

          <FloatingInput
            label="Emergency Contact Name *"
            value={emergencyContactName}
            onChangeText={setEmergencyContactName}
          />

          <FloatingInput
            label="Emergency Contact Number *"
            value={emergencyContactNumber}
            onChangeText={setEmergencyContactNumber}
            keyboardType="phone-pad"
          />

          <FloatingInput
            label="Business Name"
            value={businessName}
            onChangeText={setBusinessName}
          />

          <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* =====================================
STEP 2 - CENTER DETAILS
===================================== */}

      {currentStep === 2 && (
        <View>
          <Text style={styles.heading}>Boarding Center Details</Text>

          <FloatingInput
            label="Center Name"
            value={centerName}
            onChangeText={setCenterName}
          />

          <FloatingInput
            label="Boarding Center Address *"
            value={address}
            onChangeText={setAddress}
            multiline
            height={100}
          />

          <FloatingInput
            label="Address Line 2"
            value={addressLine2}
            onChangeText={setAddressLine2}
          />

          <FloatingInput label="City *" value={city} onChangeText={setCity} />

          <FloatingInput
            label="State *"
            value={stateName}
            onChangeText={setStateName}
          />

          <FloatingInput
            label="Pin Code *"
            value={pinCode}
            onChangeText={setPinCode}
            keyboardType="number-pad"
          />

          <FloatingInput
            label="Latitude"
            value={latitude}
            onChangeText={setLatitude}
          />

          <FloatingInput
            label="Longitude"
            value={longitude}
            onChangeText={setLongitude}
          />

          <FloatingInput
            label="Property Type *"
            value={propertyType}
            onChangeText={setPropertyType}
          />

          <FloatingInput
            label="Fencing Status *"
            value={fencingStatus}
            onChangeText={setFencingStatus}
          />

          <FloatingInput
            label="Supervision Level *"
            value={supervisionLevel}
            onChangeText={setSupervisionLevel}
          />

          <FloatingInput
            label="Total Capacity *"
            value={totalCapacity}
            onChangeText={setTotalCapacity}
            keyboardType="number-pad"
          />

          <FloatingInput
            label="Center Description"
            value={description}
            onChangeText={setDescription}
            multiline
            height={100}
          />

          <FloatingInput
            label="Price Per Day"
            value={pricePerDay}
            onChangeText={setPricePerDay}
            keyboardType="number-pad"
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity style={styles.backButton} onPress={prevStep}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* =====================================
STEP 3 - SERVICES & AMENITIES
===================================== */}

      {currentStep === 3 && (
        <View>
          <Text style={styles.heading}>Services & Amenities</Text>

          <Text style={styles.helperText}>
            Enter multiple values separated by commas (,)
          </Text>

          <FloatingInput
            label="Accepted Pet Types (Dogs, Cats, Birds) *"
            value={acceptedPetTypes}
            onChangeText={setAcceptedPetTypes}
          />

          <FloatingInput
            label="Size / Weight Restrictions"
            value={sizeWeightRestrictions}
            onChangeText={setSizeWeightRestrictions}
          />

          <FloatingInput
            label="Age Preferences"
            value={agePreferences}
            onChangeText={setAgePreferences}
          />

          <FloatingInput
            label="Required Vaccines"
            value={requiredVaccines}
            onChangeText={setRequiredVaccines}
          />

          <FloatingInput
            label="Boarding Services"
            value={boardingServices}
            onChangeText={setBoardingServices}
          />

          <FloatingInput
            label="Amenities"
            value={amenities}
            onChangeText={setAmenities}
          />

          <FloatingInput
            label="Vaccination Policy *"
            value={vaccinationPolicy}
            onChangeText={setVaccinationPolicy}
            multiline
            height={100}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity style={styles.backButton} onPress={prevStep}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* =====================================
STEP 4 - DOCUMENTS
===================================== */}

      {currentStep === 4 && (
        <View>
          <Text style={styles.heading}>Documents Upload</Text>

          {/* AADHAR */}

          <TouchableOpacity style={styles.uploadButton} onPress={pickAadhar}>
            <Text style={styles.uploadText}>
              {aadharFile ? aadharFile.name : "Upload Aadhar File"}
            </Text>
          </TouchableOpacity>

          {/* LICENSE */}

          <TouchableOpacity style={styles.uploadButton} onPress={pickLicense}>
            <Text style={styles.uploadText}>
              {licenseProof ? licenseProof.name : "Upload License Proof"}
            </Text>
          </TouchableOpacity>

          {/* CENTER PHOTOS */}

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={pickCenterPhotos}
          >
            <Text style={styles.uploadText}>
              {centerPhotos.length > 0
                ? `${centerPhotos.length} Photos Selected`
                : "Upload Center Photos"}
            </Text>
          </TouchableOpacity>

          {/* TERMS */}

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 25,
            }}
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            <View
              style={{
                width: 22,
                height: 22,
                borderWidth: 1,
                borderColor: "#6b21a8",
                marginRight: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: termsAccepted ? "#6b21a8" : "#fff",
              }}
            >
              {termsAccepted && (
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </Text>
              )}
            </View>

            <Text
              style={{
                flex: 1,
                color: "#444",
              }}
            >
              I accept Terms & Conditions
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity style={styles.backButton} onPress={prevStep}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* =====================================
STEP 5 - EXTRA DETAILS & SUBMIT
===================================== */}

      {currentStep === 5 && (
        <View>
          <Text style={styles.heading}>Additional Details</Text>

          <FloatingInput
            label="Vet Clinic Name"
            value={vetClinicName}
            onChangeText={setVetClinicName}
          />

          <FloatingInput
            label="Vet Clinic Address"
            value={vetClinicAddress}
            onChangeText={setVetClinicAddress}
          />

          <FloatingInput
            label="Vet Clinic Contact"
            value={vetClinicContact}
            onChangeText={setVetClinicContact}
            keyboardType="phone-pad"
          />

          <FloatingInput
            label="Registration License Number"
            value={registrationLicenseNumber}
            onChangeText={setRegistrationLicenseNumber}
          />

          <FloatingInput
            label="Insurance Policy Number"
            value={insurancePolicyNumber}
            onChangeText={setInsurancePolicyNumber}
          />

          <FloatingInput
            label="Insurance Provider Name"
            value={insuranceProviderName}
            onChangeText={setInsuranceProviderName}
          />

          <DateInput
            label="Insurance Expiry Date"
            value={insuranceExpiryDate}
            onChange={(date) => setInsuranceExpiryDate(date)}
          />

          <FloatingInput
            label="Opening Time"
            value={openingTime}
            onChangeText={setOpeningTime}
          />

          <FloatingInput
            label="Closing Time"
            value={closingTime}
            onChangeText={setClosingTime}
          />

          <FloatingInput
            label="Special Instructions"
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            multiline
            height={100}
          />

          <FloatingInput
            label="Authorized Person Name"
            value={authorizedPersonName}
            onChangeText={setAuthorizedPersonName}
          />

          <FloatingInput
            label="Digital Signature"
            value={digitalSignature}
            onChangeText={setDigitalSignature}
          />

          <DateInput
            label="Signature Date"
            value={signatureDate}
            onChange={(date) => setSignatureDate(date)}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
              paddingHorizontal: 4,
              gap: 12,
            }}
          >
            <TouchableOpacity style={styles.backButton} onPress={prevStep}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Register Boarding Owner</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#222",
  },

  helperText: {
    color: "#666",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  uploadButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  uploadText: {
    color: "#444",
  },

  nextButton: {
    backgroundColor: "#6b21a8",
    padding: 14,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
  },

  backButton: {
    backgroundColor: "#999",
    padding: 14,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
  },

  submitButton: {
    backgroundColor: "#6b21a8",
    padding: 14,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
