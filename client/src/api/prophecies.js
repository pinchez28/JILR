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

  // 🌀 GET SINGLE PROPHECY
  getById: (id) => request(`${BASE_URL}/${id}/`),

  // ⚠️ OPTIONAL
  getFulfillments: (prophecyId) =>
    request(`${API_BASE}/prophecies/fulfillments/?prophecy=${prophecyId}`),

  // ⬇ DOWNLOAD PROPHECY
  downloadProphecy: (id) => `${BASE_URL}/${id}/download/`,

  // ✅ FIXED DOWNLOAD FULFILLMENT
  downloadFulfillment: (id) =>
    `${API_BASE}/prophecies/fulfillments/${id}/download/`,
};
