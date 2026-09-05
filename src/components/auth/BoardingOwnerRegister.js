import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import FloatingInput from "../inputs/FloatingInput";
import { PasswordInput } from "../inputs/PasswordInput";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import styles from "../../styles/BoardingOwnerRegisterStyles";
import { useTheme } from "../../context/ThemeContext";

export default function BoardingOwnerRegister({
  setStep,
  setOtpType,
  setEmail: setGlobalEmail,
}) {
  const currentStep = 1;

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
  const { theme } = useTheme();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
      newErrors.alternate = "Alternate number should be different from mobile";
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

    setErrors({});
    return true;
  };

  const handleRegister = async () => {
    setServerError("");
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
      {serverError ? (
        <View
          style={[
            styles.errorBanner,
            {
              backgroundColor: theme.errorBackground,
              borderColor: theme.error,
            },
          ]}
        >
          <Text style={styles.errorBannerTitle}>Registration Error</Text>
          <Text style={styles.errorBannerText}>{serverError}</Text>
        </View>
      ) : null}

      {currentStep === 1 && (
        <View>
          <Text style={styles.heading}>Owner Details</Text>

          <FloatingInput
            label="Full Name *"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              setErrors((prev) => ({ ...prev, fullName: "" }));
            }}
          />

          {errors.fullName ? (
            <Text style={styles.errorTopText}>{errors.fullName}</Text>
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

          {errors.email ? (
            <Text style={styles.errorTopText}>{errors.email}</Text>
          ) : null}

          <PasswordInput
            label="Password *"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
          />

          {errors.password ? (
            <Text style={styles.errorTopText}>{errors.password}</Text>
          ) : null}

          <View style={styles.phoneWrapper}>
            <View style={styles.countryPicker}>
              <Text style={styles.countryText}>+91</Text>
            </View>

            <TextInput
              style={[
                styles.phoneInput,
                {
                  color: theme.textPrimary,
                  backgroundColor: theme.inputBackground,
                },
              ]}
              placeholder="Enter mobile number"
              placeholderTextColor={theme.placeholder}
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

          {errors.mobile ? (
            <Text style={styles.errorTopText}>{errors.mobile}</Text>
          ) : null}

          <FloatingInput
            label="Emergency Contact Name *"
            value={emergencyContactName}
            onChangeText={(text) => {
              setEmergencyContactName(text);
              setErrors((prev) => ({ ...prev, emergencyName: "" }));
            }}
          />

          {errors.emergencyName ? (
            <Text style={styles.errorTopText}>{errors.emergencyName}</Text>
          ) : null}

          <View style={styles.phoneWrapper}>
            <View style={styles.countryPicker}>
              <Text style={styles.countryText}>+91</Text>
            </View>

            <TextInput
              style={[
                styles.phoneInput,
                {
                  color: theme.textPrimary,
                  backgroundColor: theme.inputBackground,
                },
              ]}
              placeholder="Emergency Contact Number"
              placeholderTextColor={theme.placeholder}
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

          {errors.emergencyNumber ? (
            <Text style={styles.errorTopText}>{errors.emergencyNumber}</Text>
          ) : null}

          <FloatingInput
            label="Business Name"
            value={businessName}
            onChangeText={setBusinessName}
          />

          <TouchableOpacity style={styles.nextButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register Boarding Owner</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
