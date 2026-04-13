const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const BASE_URL = `${API_BASE}/prophecies/prophecies`;

const request = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Request failed');
  }

  return res.json();
};

export const prophecyApi = {
  // 📝 GET ALL PROPHECIES
  getAll: () => request(`${BASE_URL}/`),

  // 🌀 GET SINGLE PROPHECY (includes fulfillments via serializer)
  getById: (id) => request(`${BASE_URL}/${id}/`),

  // ⚠️ OPTIONAL: ONLY USE IF YOU ADD FILTERING IN BACKEND
  getFulfillments: (prophecyId) =>
    request(`${API_BASE}/fulfillments/?prophecy=${prophecyId}`),

  // ⬇ DOWNLOAD PROPHECY MEDIA
  downloadProphecy: (id) => `${BASE_URL}/${id}/download/`,

  // ⬇ DOWNLOAD FULFILLMENT MEDIA
  downloadFulfillment: (id) => `${API_BASE}/fulfillments/${id}/download/`,
};
