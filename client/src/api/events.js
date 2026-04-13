const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// ⚠️ your backend route is: /api/events/events/
const BASE_URL = `${API_BASE}/events/events`;

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

  // ⬇ POSTER URL HELPER (optional convenience)
  getPosterUrl: (posterPath) => {
    if (!posterPath) return null;
    return posterPath.startsWith('http')
      ? posterPath
      : `${API_BASE}${posterPath}`;
  },
};
