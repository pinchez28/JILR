const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const BASE_URL = `${API_BASE}/prophecies/prophecies`;

const request = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Request failed');
  }

  const data = await res.json();

  // ALWAYS return array if possible
  return Array.isArray(data) ? data : (data?.results ?? data);
};

export const prophecyApi = {
  getAll: (page = 1) => request(`${BASE_URL}/?page=${page}`),

  getById: (id) => request(`${BASE_URL}/${id}/`),

  getFulfillments: (prophecyId) =>
    request(`${API_BASE}/prophecies/fulfillments/?prophecy=${prophecyId}`),

  downloadProphecy: (id) => `${BASE_URL}/${id}/download/`,

  downloadFulfillment: (id) =>
    `${API_BASE}/prophecies/fulfillments/${id}/download/`,
};
