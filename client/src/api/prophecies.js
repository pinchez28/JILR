// src/api/prophecyApi.js
const BASE_URL = 'http://127.0.0.1:8000/api/prophecies';

export const prophecyApi = {
  // 📝 GET ALL PROPHECIES
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/`);
    if (!res.ok) throw new Error('Failed to fetch prophecies');
    return res.json();
  },

  // 🌀 GET SINGLE PROPHECY WITH FULFILLMENTS
  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}/`);
    if (!res.ok) throw new Error('Failed to fetch prophecy');
    return res.json();
  },

  // 🔗 GET FULFILLMENTS BY PROPHECY
  getFulfillments: async (prophecyId) => {
    const res = await fetch(`${BASE_URL}/fulfillments/?prophecy=${prophecyId}`);
    if (!res.ok) throw new Error('Failed to fetch fulfillments');
    return res.json();
  },

  // ⬇ GET MEDIA URL (prophecy or fulfillment)
  getMediaUrl: (mediaPath) => {
    return mediaPath; // already absolute from backend
  },
};
