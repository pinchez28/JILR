// src/api/programsApi.js

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// your backend is nested like: /api/programs/programs/
const BASE_URL = `${API_BASE}/programs`;

export const programsApi = {
  // 📥 GET ALL PROGRAMS
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/`);

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || 'Failed to fetch programs');
    }

    return res.json();
  },

  // 📥 GET SINGLE PROGRAM
  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}/`);

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || 'Failed to fetch program');
    }

    return res.json();
  },
};
