const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const BASE_URL = `${API_BASE}/gallery`;

export const galleryApi = {
  // 📸 GET ALL PHOTOS
  getAll: async (page = 1, search = '') => {
    const query = new URLSearchParams({
      page,
      search,
    }).toString();

    const res = await fetch(`${BASE_URL}/?${query}`);

    if (!res.ok) throw new Error('Failed to fetch gallery');

    return res.json();
  },

  // 📄 GET SINGLE PHOTO
  getOne: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}/`);

    if (!res.ok) throw new Error('Failed to fetch item');

    return res.json();
  },

  // ⬇ DOWNLOAD IMAGE
  getDownloadUrl: (imageUrl) => {
    return imageUrl; // since backend already returns full URL
  },
};
