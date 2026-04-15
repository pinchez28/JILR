const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const BASE_URL = `${API_BASE}/events`;

export const eventsApi = {
  // 📥 GET ALL EVENTS
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/`);

    if (!res.ok) {
      throw new Error('Failed to fetch events');
    }

    return res.json();
  },

  // 📥 GET SINGLE EVENT
  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}/`);

    if (!res.ok) {
      throw new Error('Failed to fetch event');
    }

    return res.json();
  },

  // 🖼 IMAGE URL FIX (CLEAN + PRODUCTION SAFE)
  getImageUrl: (imagePath) => {
    if (!imagePath) return null;

    return imagePath.startsWith('http') ? imagePath : `${API_BASE}${imagePath}`;
  },
};
