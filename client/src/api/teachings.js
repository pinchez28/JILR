const BASE_URL = 'http://127.0.0.1:8000/api/teachings';

export const teachingsApi = {
  getAll: async (page = 1, search = '') => {
    const res = await fetch(`${BASE_URL}/?page=${page}&search=${search}`);
    return res.json();
  },

  getOne: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}/`);
    return res.json();
  },

  getDownloadUrl: (id) => {
    return `${BASE_URL}/${id}/download/`;
  },
};
