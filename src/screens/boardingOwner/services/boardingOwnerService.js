import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://www.cgpisoftware.com/cheerytail";

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
};

export const getOwnerProfile = async () => {
  const headers = await getAuthHeaders();

  const response = await axios.get(`${BASE_URL}/api/owner/profile`, {
    headers,
  });

  return response.data;
};

export const updateOwnerProfile = async (formData) => {
  const headers = await getAuthHeaders();

  const response = await axios.post(
    `${BASE_URL}/api/owner/profile/update`,
    formData,
    {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

const CENTER_FIELDS = [
  "center_name",
  "address",
  "city",
  "state",
  "zip_code",
  "center_type",
  "registration_license_number",
  "address_line_2",
  "latitude",
  "longitude",
  "service_area_radius",
  "total_capacity",
  "daily_capacity",
  "description",
  "price_per_day",
  "property_type",
  "fencing_status",
  "supervision_level",
  "accepted_pet_types",
  "size_weight_restrictions",
  "age_preferences",
  "vaccination_policy",
  "required_vaccines",
  "vet_clinic_name",
  "vet_clinic_address",
  "vet_clinic_contact",
  "insurance_policy_number",
  "insurance_provider_name",
  "insurance_expiry_date",
  "boarding_services",
  "opening_time",
  "closing_time",
  "primary_contact_number",
  "email_address",
  "website_url",
  "amenities",
  "special_instructions",
  "prices",
  "pet_type_prices",
  "is_active",
];

const normalizeListValue = (value) => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean);
      }
    } catch (error) {
      // Fall through to comma-splitting for plain strings.
    }

    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return [];
};

const normalizeCenterPayload = (payload = {}) => {
  const normalized = { ...payload };
  const listFields = [
    "amenities",
    "accepted_pet_types",
    "size_weight_restrictions",
    "age_preferences",
    "required_vaccines",
    "boarding_services",
  ];

  listFields.forEach((key) => {
    const value = normalized[key];
    if (typeof value === "string" || Array.isArray(value)) {
      normalized[key] = normalizeListValue(value);
    }
  });

  if (typeof normalized.prices === "string" && normalized.prices.trim()) {
    try {
      normalized.prices = JSON.parse(normalized.prices);
    } catch (error) {
      normalized.prices = { value: normalized.prices };
    }
  }

  if (normalized.prices && typeof normalized.prices === "object" && !Array.isArray(normalized.prices)) {
    normalized.pet_type_prices = { ...normalized.prices };
  }

  return normalized;
};

const appendCenterValue = (formData, key, value) => {
  if (value === undefined || value === null || value === "") {
    return;
  }

  if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
    formData.append(key, JSON.stringify(value));
    return;
  }

  formData.append(key, String(value));
};

const getFileExtension = (uri, fallback = "jpg") => {
  if (!uri || typeof uri !== "string") return fallback;

  const cleanUri = uri.split("?")[0].split("#")[0];
  const extension = cleanUri.split(".").pop();
  return extension && extension.length <= 5 ? extension : fallback;
};

const normalizeFilePayload = (file, fallbackName = "file") => {
  if (!file) return null;

  const uri = file.uri || file;
  if (!uri) return null;

  const name =
    file.name ||
    file.fileName ||
    file.filename ||
    `${fallbackName}.${getFileExtension(uri, file.type === "application/pdf" ? "pdf" : "jpg")}`;

  const type =
    file.mimeType ||
    file.type ||
    (name.toLowerCase().endsWith(".pdf") ? "application/pdf" : "image/jpeg");

  return {
    uri,
    name,
    type,
  };
};

export const buildCenterFormData = (payload = {}, options = {}) => {
  const formData = new FormData();
  const { centerId, licenseProof, insuranceProof, centerPhotos = [] } = options;
  const normalizedPayload = normalizeCenterPayload(payload);

  if (centerId) {
    formData.append("center_id", String(centerId));
  }

  CENTER_FIELDS.forEach((key) => {
    appendCenterValue(formData, key, normalizedPayload[key]);
  });

  const normalizedLicenseProof = normalizeFilePayload(licenseProof, "license");
  if (normalizedLicenseProof) {
    formData.append("license_proof", normalizedLicenseProof);
    formData.append("license_document", normalizedLicenseProof);
  }

  const normalizedInsuranceProof = normalizeFilePayload(insuranceProof, "insurance");
  if (normalizedInsuranceProof) {
    formData.append("insurance_proof", normalizedInsuranceProof);
    formData.append("insurance_document", normalizedInsuranceProof);
  }

  centerPhotos.forEach((img, index) => {
    const normalizedImage = normalizeFilePayload(img, `photo_${index}`);
    if (normalizedImage) {
      formData.append("center_photos[]", normalizedImage);
      formData.append("images[]", normalizedImage);
    }
  });

  return formData;
};

export const getCenters = async (page = 1, perPage = 20) => {
  const headers = await getAuthHeaders();

  const response = await axios.get(`${BASE_URL}/api/centers`, {
    headers,
    params: {
      page,
      per_page: perPage,
    },
  });

  return response.data;
};

export const getDateDiscounts = async (centerId, page = 1, perPage = 20) => {
  const headers = await getAuthHeaders();

  const response = await axios.get(
    `${BASE_URL}/api/owner/date-discounts`,
    {
      headers,
      params: {
        center_id: centerId,
        page,
        per_page: perPage,
      },
    },
  );

  return response.data;
};

export const createDateDiscount = async (payload) => {
  const headers = await getAuthHeaders();

  const response = await axios.post(
    `${BASE_URL}/api/owner/date-discounts`,
    payload,
    {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export const getDateDiscountDetails = async (discountId) => {
  const headers = await getAuthHeaders();

  const response = await axios.get(
    `${BASE_URL}/api/owner/date-discounts/${discountId}`,
    {
      headers,
    },
  );

  return response.data;
};

export const updateDateDiscount = async (discountId, payload) => {
  const headers = await getAuthHeaders();

  const response = await axios.put(
    `${BASE_URL}/api/owner/date-discounts/${discountId}`,
    payload,
    {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export const deleteDateDiscount = async (discountId) => {
  const headers = await getAuthHeaders();

  const response = await axios.delete(
    `${BASE_URL}/api/owner/date-discounts/${discountId}`,
    {
      headers,
    },
  );

  return response.data;
};

export const getCenterDetails = async (centerId) => {
  const headers = await getAuthHeaders();

  const response = await axios.get(`${BASE_URL}/api/centers/${centerId}`, {
    headers,
  });

  return response.data;
};

export const createCenter = async (formData) => {
  const headers = await getAuthHeaders();

  const response = await fetch(`${BASE_URL}/api/centers/create`, {
    method: "POST",
    headers: {
      ...headers,
      Accept: "application/json",
    },
    body: formData,
  });

  const responseText = await response.text();
  try {
    return responseText ? JSON.parse(responseText) : {};
  } catch (error) {
    return {
      raw: responseText,
      status: response.status,
      ok: response.ok,
    };
  }
};

export const updateCenter = async (formData) => {
  const headers = await getAuthHeaders();

  const response = await fetch(`${BASE_URL}/api/centers/update`, {
    method: "POST",
    headers: {
      ...headers,
      Accept: "application/json",
    },
    body: formData,
  });

  const responseText = await response.text();
  try {
    return responseText ? JSON.parse(responseText) : {};
  } catch (error) {
    return {
      raw: responseText,
      status: response.status,
      ok: response.ok,
    };
  }
};

export const deletePetTypePricing = async (centerId, petType) => {
  const headers = await getAuthHeaders();

  const response = await axios.post(
    `${BASE_URL}/api/centers/delete-pet-pricing`,
    {
      center_id: centerId,
      pet_type: petType,
    },
    {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export const deleteCenterImage = async (centerId, imagePath) => {
  const headers = await getAuthHeaders();

  try {
    const response = await axios.post(
      `${BASE_URL}/api/centers/delete-image`,
      {
        center_id: centerId,
        image: imagePath,
      },
      {
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return {
        success: false,
        localOnly: true,
        message:
          "The delete-image endpoint is not available on the server right now.",
      };
    }

    throw error;
  }
};

export const getOwnerBookings = async (page = 1, perPage = 20) => {
  const headers = await getAuthHeaders();

  const response = await axios.get(
    `${BASE_URL}/api/bookings/owner?page=${page}&per_page=${perPage}`,
    {
      headers,
    },
  );

  return response.data;
};

export const updateBookingStatus = async (
  bookingId,
  status,
  rejectReason = "",
) => {
  const token = await AsyncStorage.getItem("token");

  const formData = new FormData();
  formData.append("booking_id", bookingId);
  formData.append("status", status);

  if (rejectReason) {
    formData.append("reject_reason", rejectReason);
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/api/bookings/update-status`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookingDetails = async (bookingId) => {
  const headers = await getAuthHeaders();

  const response = await axios.get(`${BASE_URL}/api/bookings/${bookingId}`, {
    headers,
  });

  return response.data;
};

export const setPickupDropTime = async (payload) => {
  const headers = await getAuthHeaders();

  const response = await axios.post(
    `${BASE_URL}/api/bookings/set-pickup-drop`,
    payload,
    {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};
