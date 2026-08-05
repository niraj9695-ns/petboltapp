import {
  BOARDING_API_URL,
  AVAILABILITY_API_URL,
  BOOKING_API_URL,
} from "../constants/api";

export const fetchBoardingCentersApi = async (
  city = "",
  type = "",
  page = 1,
  perPage = 20,
) => {
  const queryParams = new URLSearchParams();

  if (city) queryParams.append("city", city);
  if (type) queryParams.append("type", type);
  if (page) queryParams.append("page", String(page));
  if (perPage) queryParams.append("per_page", String(perPage));

  const response = await fetch(
    `${BOARDING_API_URL}/list?${queryParams.toString()}`,
  );
  const text = await response.text();

  if (!text || text.trim() === "") {
    return {
      centers: [],
      pagination: {
        total: 0,
        page,
        per_page: perPage,
        total_pages: 1,
      },
    };
  }

  const data = JSON.parse(text);

  if (data?.status !== "success") {
    return {
      centers: [],
      pagination: {
        total: 0,
        page,
        per_page: perPage,
        total_pages: 1,
      },
    };
  }

  const centers = Array.isArray(data?.data?.data)
    ? data.data.data
    : Array.isArray(data?.data)
      ? data.data
      : [];

  return {
    centers,
    pagination: {
      total: Number(data?.data?.total ?? centers.length),
      page: Number(data?.data?.page ?? page),
      per_page: Number(data?.data?.per_page ?? perPage),
      total_pages: Number(data?.data?.total_pages ?? 1),
    },
  };
};

export const fetchBoardingCenterByIdApi = async (centerId) => {
  const response = await fetch(`${BOARDING_API_URL}/${centerId}`);
  const text = await response.text();

  if (!text || text.trim() === "") {
    return null;
  }

  const data = JSON.parse(text);

  return data?.status === "success" ? data.data || null : null;
};

export const fetchBookedDatesApi = async (centerId, year, month) => {
  const response = await fetch(
    `${AVAILABILITY_API_URL}/booked-dates?center_id=${centerId}&year=${year}&month=${month}`,
  );

  const text = await response.text();

  if (!text || text.trim() === "") {
    return [];
  }

  const json = JSON.parse(text);
  let dates = [];

  if (Array.isArray(json)) {
    dates = json;
  } else if (Array.isArray(json.data)) {
    dates = json.data;
  } else if (Array.isArray(json.booked_dates)) {
    dates = json.booked_dates;
  } else if (Array.isArray(json.data?.booked_dates)) {
    dates = json.data.booked_dates;
  }

  return dates;
};

export const createAndPayBookingApi = async ({
  token,
  petId,
  centerId,
  startDate,
  endDate,
  specialInstructions,
}) => {
  const formData = new FormData();

  formData.append("pet_id", String(petId));
  formData.append("center_id", String(centerId));
  formData.append("start_date", startDate);
  formData.append("end_date", endDate);
  formData.append("special_instructions", specialInstructions || "");

  const response = await fetch(`${BOOKING_API_URL}/create-and-pay`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  });

  return response.json();
};

export const verifyPaymentApi = async ({
  token,
  paymentId,
  razorpayPaymentId,
  razorpayOrderId,
  razorpaySignature,
}) => {
  const formData = new FormData();

  formData.append("payment_id", String(paymentId));
  formData.append("razorpay_payment_id", razorpayPaymentId);
  formData.append("razorpay_order_id", razorpayOrderId);
  formData.append("razorpay_signature", razorpaySignature);

  const response = await fetch(
    "https://www.cgpisoftware.com/cheerytail/api/payments/verify",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    },
  );

  return response.json();
};

export const fetchPricingApi = async ({
  centerId,
  petId,
  startDate,
  endDate,
  token,
}) => {
  try {
    const query = new URLSearchParams({
      center_id: String(centerId),
      pet_id: String(petId),
      start_date: startDate,
      end_date: endDate,
    });

    const response = await fetch(
      `${AVAILABILITY_API_URL}/pricing?${query.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    const text = await response.text();

    if (!text || text.trim() === "") {
      return null;
    }

    const json = JSON.parse(text);
    return json?.data ?? json?.pricing ?? json?.result ?? json ?? null;
  } catch (error) {
    return null;
  }
};

export const fetchMyBookingsApi = async (token, page = 1, perPage = 20) => {
  try {
    const query = new URLSearchParams({
      page: String(page),
      per_page: String(perPage),
    });

    const response = await fetch(
      `${BOOKING_API_URL}/my-bookings?${query.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    const text = await response.text();

    if (!text || text.trim() === "") {
      return {
        bookings: [],
        pagination: {
          total: 0,
          page,
          per_page: perPage,
          total_pages: 1,
        },
      };
    }

    const json = JSON.parse(text);

    if (json?.status !== "success") {
      return {
        bookings: [],
        pagination: {
          total: 0,
          page,
          per_page: perPage,
          total_pages: 1,
        },
      };
    }

    const bookings = Array.isArray(json?.data?.data)
      ? json.data.data
      : Array.isArray(json?.data)
        ? json.data
        : [];

    return {
      bookings,
      pagination: {
        total: Number(json?.data?.total ?? bookings.length),
        page: Number(json?.data?.page ?? page),
        per_page: Number(json?.data?.per_page ?? perPage),
        total_pages: Number(json?.data?.total_pages ?? 1),
      },
    };
  } catch (error) {
    return {
      bookings: [],
      pagination: {
        total: 0,
        page,
        per_page: perPage,
        total_pages: 1,
      },
    };
  }
};
