// Paste the Web App URL you get after deploying setup.gs (Deploy -> New deployment -> Web app).
// It looks like: https://script.google.com/macros/s/AKfycb.../exec
const APP_URL = 'https://script.google.com/macros/s/AKfycbzltr6RpPCOTkuIj6HM9kkTJFI9_jNe_iGJaDwEpxYVcevcILqGMhweQ-NFfbEreAsv/exec';

// Generic helper to call the backend. Uses text/plain content-type on purpose
// so the browser sends a "simple" request and Apps Script doesn't choke on CORS preflight.
async function callApi(action, payload) {
  const res = await fetch(APP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(Object.assign({ action }, payload))
  });
  return res.json();
}

// Converts a <input type="file"> selected image into a base64 data URL.
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve('');
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getSession() {
  const raw = localStorage.getItem('cpl_session');
  return raw ? JSON.parse(raw) : null;
}

function setSession(profile) {
  localStorage.setItem('cpl_session', JSON.stringify(profile));
}

function clearSession() {
  localStorage.removeItem('cpl_session');
}
