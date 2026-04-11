// src/api/teachingsApi.js

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const BASE_URL = `${API_BASE}/teachings`;

export const teachingsApi = {
  getAll: async (page = 1, search = '') => {
    const res = await fetch(`${BASE_URL}/?page=${page}&search=${search}`);

    if (!res.ok) throw new Error('Failed to fetch teachings');

    return res.json();
  },

  getOne: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}/`);

    if (!res.ok) throw new Error('Failed to fetch teaching');

    return res.json();
  },

  getDownloadUrl: (id) => {
    return `${BASE_URL}/${id}/download/`;
  },
};
