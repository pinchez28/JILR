// src/api/radioApi.js

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const BASE_URL = `${API_BASE}/radio`;

export const radioApi = {
  // ▶ START
  startRecording: async (sessionId) => {
    const res = await fetch(`${BASE_URL}/start/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId }),
    });

    if (!res.ok) throw new Error('Failed to start recording');
    return res.json();
  },

  // ⏹ STOP
  stopRecording: async (sessionId) => {
    const res = await fetch(`${BASE_URL}/stop/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId }),
    });

    if (!res.ok) throw new Error('Failed to stop recording');
    return res.json();
  },

  // ⬇ DOWNLOAD
  getDownloadUrl: (id) => {
    return `${BASE_URL}/download/${id}/`;
  },
};
