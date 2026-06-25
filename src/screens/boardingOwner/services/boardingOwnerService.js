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

export const getCenters = async () => {
  const headers = await getAuthHeaders();

  const response = await axios.get(`${BASE_URL}/api/centers`, {
    headers,
  });

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

export const getBookingDetails = async (bookingId) => {
  const headers = await getAuthHeaders();

  const response = await axios.get(`${BASE_URL}/api/bookings/${bookingId}`, {
    headers,
  });

  return response.data;
};
