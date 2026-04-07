const BASE_URL = 'http://127.0.0.1:8000/api/radio';

export const radioApi = {
  // ▶ START
  startRecording: async (sessionId) => {
    const res = await fetch(`${BASE_URL}/start/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId }),
    });

    return res.json();
  },

  // ⏹ STOP
  stopRecording: async (sessionId) => {
    const res = await fetch(`${BASE_URL}/stop/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId }),
    });

    return res.json();
  },

  // ⬇ DOWNLOAD
  getDownloadUrl: (id) => {
    return `${BASE_URL}/download/${id}/`;
  },
};
