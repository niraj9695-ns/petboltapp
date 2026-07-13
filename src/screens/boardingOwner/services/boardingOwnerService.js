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
  "is_active",
];

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

export const buildCenterFormData = (payload = {}, options = {}) => {
  const formData = new FormData();
  const { centerId, licenseProof, centerPhotos = [] } = options;

  if (centerId) {
    formData.append("center_id", String(centerId));
  }

  CENTER_FIELDS.forEach((key) => {
    appendCenterValue(formData, key, payload[key]);
  });

  if (licenseProof) {
    formData.append("license_proof", {
      uri: licenseProof.uri,
      name: licenseProof.name,
      type: licenseProof.mimeType || "application/pdf",
    });
  }

  centerPhotos.forEach((img) => {
    formData.append("center_photos[]", {
      uri: img.uri,
      name: img.fileName || img.name || `photo_${Date.now()}.jpg`,
      type: img.mimeType || "image/jpeg",
    });
  });

  return formData;
};

export const getCenters = async () => {
  const headers = await getAuthHeaders();

  const response = await axios.get(`${BASE_URL}/api/centers`, {
    headers,
  });

  return response.data;
};

export const getDateDiscounts = async (centerId) => {
  const headers = await getAuthHeaders();

  const response = await axios.get(
    `${BASE_URL}/api/owner/date-discounts?center_id=${centerId}`,
    {
      headers,
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

  const response = await axios.post(
    `${BASE_URL}/api/centers/create`,
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

export const updateCenter = async (formData) => {
  const headers = await getAuthHeaders();

  const response = await axios.post(
    `${BASE_URL}/api/centers/update`,
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
        message: "The delete-image endpoint is not available on the server right now.",
      };
    }

    throw error;
  }
};

export const getOwnerBookings = async () => {
  const headers = await getAuthHeaders();

  const response = await axios.get(`${BASE_URL}/api/bookings/owner`, {
    headers,
  });

  return response.data;
};

export const rejectBooking = async (bookingId, rejectReason) => {
  const headers = await getAuthHeaders();
  const formData = new FormData();

  formData.append("booking_id", String(bookingId));
  formData.append("reject_reason", rejectReason);

  const response = await axios.post(`${BASE_URL}/api/bookings/reject`, formData, {
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getBookingDetails = async (bookingId) => {
  const headers = await getAuthHeaders();

  const response = await axios.get(`${BASE_URL}/api/bookings/${bookingId}`, {
    headers,
  });

  return response.data;
};
