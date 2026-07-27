import AsyncStorage from "@react-native-async-storage/async-storage";

import { Platform } from "react-native";

import BASE_URL, { IMAGE_API_URL } from "../constants/api";

const normalizeImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${BASE_URL}${url}`;
  return `${BASE_URL}/${url}`;
};

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
      imageUrl = normalizeImageUrl(img.image_url);
    } else if (img.url) {
      imageUrl = normalizeImageUrl(img.url);
    } else if (img.pet_image) {
      imageUrl = normalizeImageUrl(img.pet_image);
    } else if (img.image) {
      const imageValue = String(img.image).trim();
      imageUrl =
        imageValue.startsWith("http://") || imageValue.startsWith("https://")
          ? normalizeImageUrl(imageValue)
          : normalizeImageUrl(`uploads/pets/${imageValue}`);
    } else if (img.image_path) {
      imageUrl = normalizeImageUrl(img.image_path);
    }

    return {
      ...img,
      image_url: imageUrl,
    };
  });
};

export const uploadPetImagesApi = async (petId, selectedImages) => {
  if (selectedImages.length === 0) return { ok: true, data: null };

  const token = await AsyncStorage.getItem("token");

  const formData = new FormData();
  formData.append("pet_id", String(petId));

  selectedImages.forEach((img, index) => {
    const fileExtension = String(
      img.uri || img.image_url || img.url || img.pet_image,
    )
      .split(".")
      .pop();

    formData.append("images[]", {
      uri:
        Platform.OS === "ios"
          ? String(img.uri).replace("file://", "")
          : String(img.uri),
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

  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (error) {}

  return {
    ok: response.ok,
    data,
  };
};

export const setPetProfileImageApi = async (petId, imageId) => {
  const token = await AsyncStorage.getItem("token");

  const formData = new FormData();
  formData.append("pet_id", String(petId));
  formData.append("image_id", String(imageId));

  const response = await fetch(`${IMAGE_API_URL}/set-profile`, {
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
