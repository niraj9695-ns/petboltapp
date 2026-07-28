import React, { useState } from "react";
import FloatingInput from "../inputs/FloatingInput";
import { PasswordInput } from "../inputs/PasswordInput";
import DateInput from "../inputs/DateInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
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
import styles from "../../styles/BoardingOwnerRegisterStyles";

export default function BoardingOwnerRegister({
  setStep,
  setOtpType,
  setEmail: setGlobalEmail,
}) {
  const [currentStep, setCurrentStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");

  const [alternateContactNumber, setAlternateContactNumber] = useState("");

  const [emergencyContactName, setEmergencyContactName] = useState("");

  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");

  const [businessName, setBusinessName] = useState("");

  const [centerName, setCenterName] = useState("");

  const [address, setAddress] = useState("");

  const [addressLine2, setAddressLine2] = useState("");

  const [city, setCity] = useState("");

  const [stateName, setStateName] = useState("");

  const [pinCode, setPinCode] = useState("");

  const [propertyType, setPropertyType] = useState("");

  const [fencingStatus, setFencingStatus] = useState("");

  const [supervisionLevel, setSupervisionLevel] = useState("");

  const [totalCapacity, setTotalCapacity] = useState("");

  const [description, setDescription] = useState("");

  const [petPriceRows, setPetPriceRows] = useState([
    { petType: "", price: "" },
  ]);

  const [acceptedPetTypes, setAcceptedPetTypes] = useState([]);

  const [sizeWeightRestrictions, setSizeWeightRestrictions] = useState("");

  const [agePreferences, setAgePreferences] = useState("");

  const [requiredVaccines, setRequiredVaccines] = useState("");

  const [boardingServices, setBoardingServices] = useState("");

  const [amenities, setAmenities] = useState("");

  const [vaccinationPolicy, setVaccinationPolicy] = useState("");

  const [aadharFile, setAadharFile] = useState(null);

  const [licenseProof, setLicenseProof] = useState(null);

  const [centerPhotos, setCenterPhotos] = useState([]);

  // error state for inline validation messages (shown above inputs)
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [vetClinicName, setVetClinicName] = useState("");

  const [vetClinicAddress, setVetClinicAddress] = useState("");

  const [vetClinicContact, setVetClinicContact] = useState("");

  const [registrationLicenseNumber, setRegistrationLicenseNumber] =
    useState("");

  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState("");

  const [insuranceProviderName, setInsuranceProviderName] = useState("");

  const [insuranceExpiryDate, setInsuranceExpiryDate] = useState(null);

  const [openingTime, setOpeningTime] = useState(() => {
    const date = new Date();
    date.setHours(10, 0, 0, 0);
    return date;
  });

  const [closingTime, setClosingTime] = useState(() => {
    const date = new Date();
    date.setHours(22, 0, 0, 0);
    return date;
  });

  const [showOpeningPicker, setShowOpeningPicker] = useState(false);

  const [showClosingPicker, setShowClosingPicker] = useState(false);

  const [specialInstructions, setSpecialInstructions] = useState("");

  const [authorizedPersonName, setAuthorizedPersonName] = useState("");

  const [digitalSignature, setDigitalSignature] = useState("");

  // default signature date to today
  const [signatureDate, setSignatureDate] = useState(new Date());

  const [termsAccepted, setTermsAccepted] = useState(false);

  const PET_TYPES = ["dog", "cat", "bird", "rabbit", "turtle", "others"];

  const pickAadhar = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
    });

    if (!result.canceled) {
      setAadharFile(result.assets[0]);
      setErrors((prev) => ({ ...prev, aadhar: "", stepError: "" }));
    }
  };

  const pickLicense = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
    });

    if (!result.canceled) {
      setLicenseProof(result.assets[0]);
      setErrors((prev) => ({ ...prev, license: "", stepError: "" }));
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

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      const cleanMobile = mobileNumber.replace(/\D/g, "");
      const cleanAlternate = (alternateContactNumber || "").replace(/\D/g, "");
      const cleanEmergency = (emergencyContactNumber || "").replace(/\D/g, "");

      if (!fullName.trim()) {
        newErrors.fullName = "Full name is required";
      } else if (fullName.trim().length < 3) {
        newErrors.fullName = "Minimum 3 characters required";
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || "").trim())) {
        newErrors.email = "Enter a valid email address";
      }

      if (!password || password.length < 8) {
        newErrors.password = "Minimum 8 characters required";
      }

      if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
        newErrors.mobile = "Please enter a valid 10-digit mobile number";
      }

      if (cleanAlternate && !/^[6-9]\d{9}$/.test(cleanAlternate)) {
        newErrors.alternate = "Invalid alternate number";
      }

      if (cleanAlternate && cleanAlternate === cleanMobile) {
        newErrors.alternate =
          "Alternate number should be different from mobile";
      }

      if (!emergencyContactName.trim()) {
        newErrors.emergencyName = "Emergency contact name is required";
      }

      if (!/^[6-9]\d{9}$/.test(cleanEmergency)) {
        newErrors.emergencyNumber = "Invalid emergency contact number";
      }

      if (cleanEmergency === cleanMobile) {
        newErrors.emergencyNumber =
          "Emergency number should be different from mobile";
      }

      if (Object.keys(newErrors).length > 0) {
        newErrors.stepError = "Please fix the highlighted fields";
        setErrors(newErrors);
        return false;
      }

      // clear step errors
      setErrors({});
      return true;
    }

    if (currentStep === 2) {
      if (!address) newErrors.address = "Address is required";
      if (!city) newErrors.city = "City is required";
      if (!stateName) newErrors.stateName = "State is required";
      if (!/^[0-9]{6}$/.test(pinCode))
        newErrors.pinCode = "Enter valid 6-digit pin code";
      if (!propertyType) newErrors.propertyType = "Property type is required";
      if (!fencingStatus)
        newErrors.fencingStatus = "Fencing status is required";
      if (!supervisionLevel)
        newErrors.supervisionLevel = "Supervision level is required";
      if (!totalCapacity)
        newErrors.totalCapacity = "Total capacity is required";

      if (
        petPriceRows.some(
          (row) =>
            !row.petType ||
            !row.price ||
            Number.isNaN(Number(row.price)) ||
            Number(row.price) <= 0,
        )
      ) {
        newErrors.prices =
          "Please add valid pet prices for all selected pet types";
      }

      if (Object.keys(newErrors).length > 0) {
        newErrors.stepError = "Please fix the highlighted fields";
        setErrors(newErrors);
        return false;
      }

      setErrors({});
      return true;
    }

    if (currentStep === 3) {
      if (!acceptedPetTypes || acceptedPetTypes.length === 0) {
        newErrors.acceptedPetTypes = "Select at least one accepted pet type";
      }
      if (!vaccinationPolicy || vaccinationPolicy.trim().length < 10) {
        newErrors.vaccinationPolicy =
          "Provide vaccination policy details (min 10 chars)";
      }

      if (Object.keys(newErrors).length > 0) {
        newErrors.stepError = "Please fix the highlighted fields";
        setErrors(newErrors);
        return false;
      }

      setErrors({});
      return true;
    }

    if (currentStep === 4) {
      if (!aadharFile) newErrors.aadhar = "Aadhar file is required";
      if (!licenseProof) newErrors.license = "License proof is required";

      if (Object.keys(newErrors).length > 0) {
        newErrors.stepError = "Please upload required documents";
        setErrors(newErrors);
        return false;
      }

      setErrors({});
      return true;
    }

    if (currentStep === 5) {
      if (!digitalSignature || !digitalSignature.trim())
        newErrors.digitalSignature = "Digital signature is required";
      if (!signatureDate)
        newErrors.signatureDate = "Signature date is required";
      if (!openingTime) newErrors.openingTime = "Opening time is required";
      if (!closingTime) newErrors.closingTime = "Closing time is required";
      if (openingTime && closingTime && closingTime <= openingTime) {
        newErrors.closingTime = "Closing time must be after opening time";
      }
      if (!termsAccepted)
        newErrors.terms = "Accept terms and conditions to continue";

      if (Object.keys(newErrors).length > 0) {
        newErrors.stepError = "Please fix the highlighted fields";
        setErrors(newErrors);
        return false;
      }

      setErrors({});
      return true;
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleRegister = async () => {
    // validate final step before submitting
    if (!validateStep()) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("full_name", fullName);

      formData.append("email", email);

      formData.append("password", password);

      formData.append("mobile_number", mobileNumber);

      formData.append("alternate_contact_number", alternateContactNumber);

      formData.append("emergency_contact_name", emergencyContactName);

      formData.append("emergency_contact_number", emergencyContactNumber);

      formData.append("business_name", businessName);

      formData.append("center_name", centerName);

      formData.append("address", address);

      formData.append("address_line_2", addressLine2);
      formData.append("city", city);

      formData.append("state", stateName);

      formData.append("pin_code", pinCode);

      formData.append("property_type", propertyType);

      formData.append("fencing_status", fencingStatus);

      formData.append("supervision_level", supervisionLevel);

      formData.append("total_capacity", totalCapacity);

      formData.append("description", description);

      const pricesObject = petPriceRows.reduce((acc, row) => {
        const petType = row.petType.trim().toLowerCase();
        const numericPrice = Number(row.price);

        if (petType && !Number.isNaN(numericPrice)) {
          acc[petType] = numericPrice;
        }

        return acc;
      }, {});

      const supportedPricesObject = Object.entries(pricesObject).reduce(
        (acc, [petType, price]) => {
          if (
            ["dog", "cat", "bird", "rabbit", "turtle", "others"].includes(
              petType,
            )
          ) {
            acc[petType] = price;
          }
          return acc;
        },
        {},
      );

      if (Object.keys(supportedPricesObject).length > 0) {
        formData.append("prices", JSON.stringify(supportedPricesObject));
      }

      formData.append("accepted_pet_types", JSON.stringify(acceptedPetTypes));

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

      formData.append(
        "opening_time",
        openingTime.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
      );

      formData.append(
        "closing_time",
        closingTime.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
      );

      formData.append("special_instructions", specialInstructions);

      formData.append("authorized_person_name", authorizedPersonName);

      formData.append("digital_signature", digitalSignature);

      formData.append(
        "signature_date",
        signatureDate ? signatureDate.toISOString().split("T")[0] : "",
      );

      formData.append("terms_accepted", "1");

      // Helper to deduce file name and type when DocumentPicker returns minimal info
      const getExtension = (uri) => {
        try {
          const parts = uri.split(".");
          return parts.length > 1 ? parts.pop().split(/[#?]/)[0] : null;
        } catch (e) {
          return null;
        }
      };

      const normalizeFile = (file, fallbackName) => {
        const uri = file.uri || file;
        let name = file.name;
        if (!name) {
          const ext = getExtension(uri) || "jpg";
          name = `${fallbackName}.${ext}`;
        }
        const type =
          file.mimeType ||
          file.type ||
          (name.endsWith(".pdf") ? "application/pdf" : "image/jpeg");
        return { uri, name, type };
      };

      if (aadharFile) {
        const f = normalizeFile(aadharFile, "aadhar");
        formData.append("aadhar_file", {
          uri: f.uri,
          name: f.name,
          type: f.type,
        });
      }

      if (licenseProof) {
        const f = normalizeFile(licenseProof, "license");
        formData.append("license_proof", {
          uri: f.uri,
          name: f.name,
          type: f.type,
        });
      }

      if (centerPhotos && centerPhotos.length > 0) {
        centerPhotos.forEach((photo, idx) => {
          const f = normalizeFile(photo, `center_photo_${idx + 1}`);
          // Some backends accept repeated 'center_photos[]', others 'center_photos'. Keep []
          formData.append("center_photos[]", {
            uri: f.uri,
            name: f.name,
            type: f.type,
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
        // After successful registration, send OTP to email (ensure first-time send works)
        try {
          const otpResponse = await fetch(
            "https://www.cgpisoftware.com/cheerytail/api/auth/send-email-otp",
            {
              method: "POST",
              body: (() => {
                const f = new FormData();
                f.append("email", email);
                return f;
              })(),
            },
          );

          const otpResult = await otpResponse.json();

          if (otpResult.status === true || otpResult.status === "success") {
            setGlobalEmail(email); // store globally
            setOtpType("register");
            setStep("otp"); // navigate to OTP screen
          } else {
            setServerError(otpResult.message || "Failed to send OTP");
          }
        } catch (err) {
          setServerError(
            err.message || "Something went wrong while sending OTP",
          );
        }
      } else {
        setServerError(result.message || "Registration Failed");
      }
    } catch (error) {
      setServerError(error.message || "Something went wrong");
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

      {serverError ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerTitle}>Registration Error</Text>
          <Text style={styles.errorBannerText}>{serverError}</Text>
        </View>
      ) : null}
      {/* =====================================
STEP 1 - OWNER DETAILS
===================================== */}

      {currentStep === 1 && (
        <View>
          <Text style={styles.heading}>Owner Details</Text>

          {errors.fullName ? (
            <Text style={styles.errorTopText}>{errors.fullName}</Text>
          ) : null}
          <FloatingInput
            label="Full Name *"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              setErrors((prev) => ({ ...prev, fullName: "" }));
            }}
          />

          {errors.email ? (
            <Text style={styles.errorTopText}>{errors.email}</Text>
          ) : null}
          <FloatingInput
            label="Email *"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {errors.password ? (
            <Text style={styles.errorTopText}>{errors.password}</Text>
          ) : null}
          <PasswordInput
            label="Password *"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
          />

          {errors.mobile ? (
            <Text style={styles.errorTopText}>{errors.mobile}</Text>
          ) : null}

          <View style={styles.phoneWrapper}>
            <View style={styles.countryPicker}>
              <Text style={styles.countryText}>+91</Text>
            </View>

            <TextInput
              style={styles.phoneInput}
              placeholder="Enter mobile number"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              maxLength={10}
              value={mobileNumber}
              onChangeText={(text) => {
                const cleaned = text.replace(/\D/g, "").slice(0, 10);
                setMobileNumber(cleaned);
                setErrors((prev) => ({ ...prev, mobile: "" }));
              }}
            />
          </View>

          {errors.alternate ? (
            <Text style={styles.errorTopText}>{errors.alternate}</Text>
          ) : null}

          <View style={styles.phoneWrapper}>
            <View style={styles.countryPicker}>
              <Text style={styles.countryText}>+91</Text>
            </View>

            <TextInput
              style={styles.phoneInput}
              placeholder="Alternate Contact Number"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              maxLength={10}
              value={alternateContactNumber}
              onChangeText={(text) => {
                const cleaned = text.replace(/\D/g, "").slice(0, 10);
                setAlternateContactNumber(cleaned);
                setErrors((prev) => ({ ...prev, alternate: "" }));
              }}
            />
          </View>

          {errors.emergencyName ? (
            <Text style={styles.errorTopText}>{errors.emergencyName}</Text>
          ) : null}
          <FloatingInput
            label="Emergency Contact Name *"
            value={emergencyContactName}
            onChangeText={(text) => {
              setEmergencyContactName(text);
              setErrors((prev) => ({ ...prev, emergencyName: "" }));
            }}
          />

          {errors.emergencyNumber ? (
            <Text style={styles.errorTopText}>{errors.emergencyNumber}</Text>
          ) : null}
          <View style={styles.phoneWrapper}>
            <View style={styles.countryPicker}>
              <Text style={styles.countryText}>+91</Text>
            </View>

            <TextInput
              style={styles.phoneInput}
              placeholder="Emergency Contact Number"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              maxLength={10}
              value={emergencyContactNumber}
              onChangeText={(text) => {
                const cleaned = text.replace(/\D/g, "").slice(0, 10);
                setEmergencyContactNumber(cleaned);
                setErrors((prev) => ({ ...prev, emergencyNumber: "" }));
              }}
            />
          </View>

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

          {errors.stepError ? (
            <Text style={styles.errorTopText}>{errors.stepError}</Text>
          ) : null}

          <FloatingInput
            label="Center Name"
            value={centerName}
            onChangeText={setCenterName}
          />

          {errors.address ? (
            <Text style={styles.errorTopText}>{errors.address}</Text>
          ) : null}
          <FloatingInput
            label="Boarding Center Address *"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              setErrors((prev) => ({ ...prev, address: "" }));
            }}
            multiline
            height={100}
          />

          <FloatingInput
            label="Address Line 2"
            value={addressLine2}
            onChangeText={setAddressLine2}
          />

          {errors.city ? (
            <Text style={styles.errorTopText}>{errors.city}</Text>
          ) : null}
          <FloatingInput
            label="City *"
            value={city}
            onChangeText={(text) => {
              setCity(text);
              setErrors((prev) => ({ ...prev, city: "" }));
            }}
          />

          {errors.stateName ? (
            <Text style={styles.errorTopText}>{errors.stateName}</Text>
          ) : null}
          <FloatingInput
            label="State *"
            value={stateName}
            onChangeText={(text) => {
              setStateName(text);
              setErrors((prev) => ({ ...prev, stateName: "" }));
            }}
          />

          {errors.pinCode ? (
            <Text style={styles.errorTopText}>{errors.pinCode}</Text>
          ) : null}
          <FloatingInput
            label="Pin Code *"
            value={pinCode}
            onChangeText={(text) => {
              setPinCode(text);
              setErrors((prev) => ({ ...prev, pinCode: "" }));
            }}
            keyboardType="number-pad"
          />

          {errors.propertyType ? (
            <Text style={styles.errorTopText}>{errors.propertyType}</Text>
          ) : null}
          <FloatingInput
            label="Property Type *"
            value={propertyType}
            onChangeText={(text) => {
              setPropertyType(text);
              setErrors((prev) => ({ ...prev, propertyType: "" }));
            }}
          />

          {errors.fencingStatus ? (
            <Text style={styles.errorTopText}>{errors.fencingStatus}</Text>
          ) : null}
          <FloatingInput
            label="Fencing Status *"
            value={fencingStatus}
            onChangeText={(text) => {
              setFencingStatus(text);
              setErrors((prev) => ({ ...prev, fencingStatus: "" }));
            }}
          />

          {errors.supervisionLevel ? (
            <Text style={styles.errorTopText}>{errors.supervisionLevel}</Text>
          ) : null}
          <FloatingInput
            label="Supervision Level *"
            value={supervisionLevel}
            onChangeText={(text) => {
              setSupervisionLevel(text);
              setErrors((prev) => ({ ...prev, supervisionLevel: "" }));
            }}
          />

          {errors.totalCapacity ? (
            <Text style={styles.errorTopText}>{errors.totalCapacity}</Text>
          ) : null}
          <FloatingInput
            label="Total Capacity *"
            value={totalCapacity}
            onChangeText={(text) => {
              setTotalCapacity(text);
              setErrors((prev) => ({ ...prev, totalCapacity: "" }));
            }}
            keyboardType="number-pad"
          />

          <FloatingInput
            label="Center Description"
            value={description}
            onChangeText={setDescription}
            multiline
            height={100}
          />

          <Text style={styles.helperText}>
            Add pet prices for each animal type
          </Text>

          {errors.prices ? (
            <Text style={styles.errorTopText}>{errors.prices}</Text>
          ) : null}

          {petPriceRows.map((row, index) => (
            <View key={index} style={styles.priceRow}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={row.petType}
                  onValueChange={(value) => {
                    const updatedRows = [...petPriceRows];
                    updatedRows[index].petType = value;
                    setPetPriceRows(updatedRows);
                    setErrors((prev) => ({ ...prev, prices: "", stepError: "" }));
                  }}
                >
                  <Picker.Item label="Select Pet Type" value="" />
                  <Picker.Item label="Dog" value="dog" />
                  <Picker.Item label="Cat" value="cat" />
                  <Picker.Item label="Bird" value="bird" />
                  <Picker.Item label="Rabbit" value="rabbit" />
                  <Picker.Item label="Turtle" value="turtle" />
                  <Picker.Item label="Others" value="others" />
                </Picker>
              </View>

              <TextInput
                style={styles.priceInput}
                placeholder="Price"
                value={row.price}
                keyboardType="number-pad"
                onChangeText={(value) => {
                  const updatedRows = [...petPriceRows];
                  updatedRows[index].price = value;
                  setPetPriceRows(updatedRows);
                  setErrors((prev) => ({ ...prev, prices: "", stepError: "" }));
                }}
              />

              {petPriceRows.length > 1 && (
                <TouchableOpacity
                  style={styles.removeRowButton}
                  onPress={() => {
                    const updatedRows = petPriceRows.filter(
                      (_, rowIndex) => rowIndex !== index,
                    );
                    setPetPriceRows(
                      updatedRows.length > 0
                        ? updatedRows
                        : [{ petType: "", price: "" }],
                    );
                    setErrors((prev) => ({ ...prev, prices: "", stepError: "" }));
                  }}
                >
                  <Text style={styles.removeRowText}>-</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          <TouchableOpacity
            style={styles.addRowButton}
            onPress={() => {
              setPetPriceRows([...petPriceRows, { petType: "", price: "" }]);
              setErrors((prev) => ({ ...prev, prices: "", stepError: "" }));
            }}
          >
            <Text style={styles.addRowText}>+ Add More</Text>
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
STEP 3 - SERVICES & AMENITIES
===================================== */}

      {currentStep === 3 && (
        <View>
          <Text style={styles.heading}>Services & Amenities</Text>

          {errors.stepError ? (
            <Text style={styles.errorTopText}>{errors.stepError}</Text>
          ) : null}

          <Text style={styles.helperText}>
            Tap to toggle accepted pet types
          </Text>

          {errors.acceptedPetTypes ? (
            <Text style={styles.errorTopText}>{errors.acceptedPetTypes}</Text>
          ) : null}

          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 12 }}
          >
            {PET_TYPES.map((pt) => {
              const selected = acceptedPetTypes.includes(pt);
              return (
                <TouchableOpacity
                  key={pt}
                  style={[styles.chip, selected ? styles.chipSelected : null]}
                  onPress={() => {
                    if (selected) {
                      setAcceptedPetTypes(
                        acceptedPetTypes.filter((p) => p !== pt),
                      );
                    } else {
                      setAcceptedPetTypes([...acceptedPetTypes, pt]);
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selected ? styles.chipSelectedText : null,
                    ]}
                  >
                    {pt.charAt(0).toUpperCase() + pt.slice(1)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

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

          {errors.vaccinationPolicy ? (
            <Text style={styles.errorTopText}>{errors.vaccinationPolicy}</Text>
          ) : null}

          <FloatingInput
            label="Vaccination Policy *"
            value={vaccinationPolicy}
            onChangeText={(text) => {
              setVaccinationPolicy(text);
              setErrors((prev) => ({ ...prev, vaccinationPolicy: "" }));
            }}
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

          {errors.stepError ? (
            <Text style={styles.errorTopText}>{errors.stepError}</Text>
          ) : null}

          {/* AADHAR */}

          {errors.aadhar ? (
            <Text style={styles.errorTopText}>{errors.aadhar}</Text>
          ) : null}
          <TouchableOpacity style={styles.uploadButton} onPress={pickAadhar}>
            <Text style={styles.uploadText}>
              {aadharFile ? aadharFile.name : "Upload Aadhar File"}
            </Text>
          </TouchableOpacity>

          {/* LICENSE */}

          {errors.license ? (
            <Text style={styles.errorTopText}>{errors.license}</Text>
          ) : null}
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
            onPress={() => {
              setTermsAccepted(!termsAccepted);
              setErrors((prev) => ({ ...prev, terms: "", stepError: "" }));
            }}
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
              I accept Terms & Conditions{" "}
              <Text style={{ color: "#DC2626" }}>*</Text>
            </Text>
          </TouchableOpacity>

          {errors.terms ? (
            <Text style={styles.errorTopText}>{errors.terms}</Text>
          ) : null}

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

          {errors.stepError ? (
            <Text style={styles.errorTopText}>{errors.stepError}</Text>
          ) : null}

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

          {errors.openingTime ? (
            <Text style={styles.errorTopText}>{errors.openingTime}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.timePickerButton}
            onPress={() => {
              setShowOpeningPicker(true);
              setErrors((prev) => ({
                ...prev,
                openingTime: "",
                stepError: "",
              }));
            }}
          >
            <Text style={styles.timePickerLabel}>Opening Time</Text>
            <Text style={styles.timePickerValue}>
              {openingTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>

          {showOpeningPicker && (
            <DateTimePicker
              value={openingTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={(_, selectedTime) => {
                setShowOpeningPicker(false);
                if (selectedTime) {
                  setOpeningTime(selectedTime);
                }
              }}
            />
          )}

          {errors.closingTime ? (
            <Text style={styles.errorTopText}>{errors.closingTime}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.timePickerButton}
            onPress={() => {
              setShowClosingPicker(true);
              setErrors((prev) => ({
                ...prev,
                closingTime: "",
                stepError: "",
              }));
            }}
          >
            <Text style={styles.timePickerLabel}>Closing Time</Text>
            <Text style={styles.timePickerValue}>
              {closingTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>

          {showClosingPicker && (
            <DateTimePicker
              value={closingTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={(_, selectedTime) => {
                setShowClosingPicker(false);
                if (selectedTime) {
                  setClosingTime(selectedTime);
                }
              }}
            />
          )}

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

          {errors.digitalSignature ? (
            <Text style={styles.errorTopText}>{errors.digitalSignature}</Text>
          ) : null}
          <FloatingInput
            label="Digital Signature"
            value={digitalSignature}
            onChangeText={(text) => {
              setDigitalSignature(text);
              setErrors((prev) => ({ ...prev, digitalSignature: "" }));
            }}
          />

          {errors.signatureDate ? (
            <Text style={styles.errorTopText}>{errors.signatureDate}</Text>
          ) : null}
          <DateInput
            label="Signature Date"
            value={signatureDate}
            onChange={(date) => {
              setSignatureDate(date);
              setErrors((prev) => ({ ...prev, signatureDate: "" }));
            }}
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
