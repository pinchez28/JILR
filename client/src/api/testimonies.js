const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const BASE_URL = `${API_BASE}/testimonies`;

// 🔥 shared fetch helper
const request = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Request failed');
  }

  return res.json();
};

export const testimoniesApi = {
  // 📥 GET ALL TESTIMONIES
  getAll: (page = 1, search = '') => {
    return request(
      `${BASE_URL}/?page=${page}&search=${encodeURIComponent(search)}`,
    );
  },

  // 📥 GET SINGLE TESTIMONY
  getOne: (id) => {
    return request(`${BASE_URL}/${id}/`);
  },

  // ⬇ REAL FILE DOWNLOADER (REUSABLE CORE)
  downloadFile: async (url, filename = 'file.mp4') => {
    const res = await fetch(url);

    if (!res.ok) throw new Error('Download failed');

    const blob = await res.blob();
    const objectUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(objectUrl);
  },

  // ⬇ BEFORE DOWNLOAD (FIXED DRF FORMAT)
  downloadBefore: (id) => {
    return `${BASE_URL}/${id}/download-before/`;
  },

  // ⬇ AFTER DOWNLOAD (FIXED DRF FORMAT)
  downloadAfter: (id) => {
    return `${BASE_URL}/${id}/download-after/`;
  },
};
