import AsyncStorage from "@react-native-async-storage/async-storage";

import { Platform } from "react-native";

import BASE_URL, { IMAGE_API_URL } from "../constants/api";

// FETCH PET IMAGES
export const fetchPetImagesApi = async (petId) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${IMAGE_API_URL}/${petId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const text = await response.text();

  if (!text || text.trim() === "") {
    return [];
  }

  const json = JSON.parse(text);

  let images = [];

  if (Array.isArray(json)) {
    images = json;
  } else if (Array.isArray(json.data)) {
    images = json.data;
  } else if (Array.isArray(json.images)) {
    images = json.images;
  }

  return images.map((img) => {
    let imageUrl = "";

    if (img.image_url) {
      imageUrl = img.image_url;
    } else if (img.image) {
      imageUrl = `${BASE_URL}/uploads/pets/${img.image}`;
    } else if (img.image_path) {
      imageUrl = `${BASE_URL}/${img.image_path}`;
    }

    return {
      ...img,
      image_url: imageUrl,
    };
  });
};

// UPLOAD PET IMAGES
export const uploadPetImagesApi = async (petId, selectedImages) => {
  if (selectedImages.length === 0) return;

  const token = await AsyncStorage.getItem("token");

  const formData = new FormData();

  formData.append("pet_id", String(petId));

  selectedImages.forEach((img, index) => {
    const fileExtension = img.uri.split(".").pop();

    formData.append("images[]", {
      uri: Platform.OS === "ios" ? img.uri.replace("file://", "") : img.uri,

      name: `pet_image_${index}.${fileExtension || "jpg"}`,

      type: img.mimeType || "image/jpeg",
    });
  });

  const response = await fetch(`${IMAGE_API_URL}/add`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  });

  return response.ok;
};

export const deletePetImageApi = async (imageId) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${IMAGE_API_URL}/delete/${imageId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const text = await response.text();

  return response.ok;
};
