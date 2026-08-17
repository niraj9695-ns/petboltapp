import AsyncStorage from "@react-native-async-storage/async-storage";

import { Platform } from "react-native";

import BASE_URL, { IMAGE_API_URL } from "../constants/api";

export const normalizeImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${BASE_URL}${url}`;
  return `${BASE_URL}/${url}`;
};

const collectImageCandidates = (payload, seen = new Set()) => {
  if (!payload) return [];

  if (typeof payload === "string") {
    return [payload];
  }

  if (Array.isArray(payload)) {
    return payload.flatMap((item) => collectImageCandidates(item, seen));
  }

  if (typeof payload !== "object") return [];
  if (seen.has(payload)) return [];
  seen.add(payload);

  const candidateFields = [
    "image_url",
    "url",
    "uri",
    "path",
    "pet_image",
    "image",
    "profile_image",
    "photo",
    "photo_url",
    "avatar",
    "thumbnail",
    "thumbnail_url",
  ];

  const values = [];

  for (const field of candidateFields) {
    const value = payload[field];
    if (value !== undefined && value !== null) {
      values.push(value);
    }
  }

  if (payload.file && typeof payload.file === "object") {
    for (const field of ["uri", "url", "path"]) {
      const value = payload.file[field];
      if (value !== undefined && value !== null) {
        values.push(value);
      }
    }
  }

  Object.values(payload).forEach((value) => {
    if (value !== null && typeof value === "object") {
      values.push(...collectImageCandidates(value, seen));
    }
  });

  return values;
};

export const extractImageUrlFromPayload = (payload) => {
  const candidates = collectImageCandidates(payload);

  for (const candidate of candidates) {
    if (typeof candidate === "string") {
      const trimmed = candidate.trim();
      if (trimmed) {
        return normalizeImageUrl(trimmed);
      }
    }
  }

  return "";
};

const extractImagesFromResponse = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.images)) return payload.images;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.images)) return payload.data.images;
  if (Array.isArray(payload?.data?.image)) return payload.data.image;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.data?.result)) return payload.data.result;

  if (payload?.data && typeof payload.data === "object") {
    const nested = payload.data;
    if (Array.isArray(nested.data)) return nested.data;
    if (Array.isArray(nested.images)) return nested.images;
    if (Array.isArray(nested.image)) return nested.image;
    if (Array.isArray(nested.items)) return nested.items;
    if (Array.isArray(nested.result)) return nested.result;
  }

  return [];
};

export const fetchPetImagesApi = async (petId) => {
  const token = await AsyncStorage.getItem("token");
  const query = new URLSearchParams({
    page: "1",
    per_page: "20",
  });

  const response = await fetch(
    `${IMAGE_API_URL}/${petId}?${query.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  const text = await response.text();

  if (!text || text.trim() === "") {
    return [];
  }

  const json = JSON.parse(text);

  const images = extractImagesFromResponse(json);

  return images.map((img) => ({
    ...img,
    image_url: extractImageUrlFromPayload(img),
  }));
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
