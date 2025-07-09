import { useAuthStore } from '@/stores/authStore';
let authStore: ReturnType<typeof useAuthStore>;

const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5173/callback";
const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";

function authApi(body: string): Promise<any> {
  return fetch(TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + btoa(clientID + ":" + clientSecret)
    },
    body: body
  })
    .then(response => response.json())
    .then(data => {
      if (data.access_token) {
        authStore.setTokens(data.access_token, data.refresh_token);
        return data;
      } else {
        throw new Error("Failed to retrieve access token");
      }
    });
}

export function onLoad(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    authStore = useAuthStore();

    if (window.location.search.length > 0) {
      try {
        await retrieveTokenFromUrl();
        resolve();
      } catch (e) {
        reject(e);
      }
      return;
    }

    if (!authStore.accessToken || authStore.accessToken.length === 0) {
      RequestAuthorization();
      // The page will redirect, so the promise will not resolve here
      return;
    }

    try {
      await refreshAccessToken();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

export async function retrieveTokenFromUrl(): Promise<void> {
  const authCode = getAuthCode();
  if (authCode) {
    await fetchAccessToken(authCode);
  }
}

function getAuthCode() {
  let code = null;
  const queryString = window.location.search;
  if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get('code');
  }
  return code;
}

async function fetchAccessToken(authCode: string): Promise<void> {
  let body = "grant_type=authorization_code";
  body += "&code=" + authCode;
  body += "&redirect_uri=" + encodeURI(REDIRECT_URI);
  body += "&client_id=" + clientID;
  body += "&client_secret=" + clientSecret;
  await authApi(body);
}

async function refreshAccessToken(): Promise<void> {
  let body = "grant_type=refresh_token";
  body += "&refresh_token=" + authStore.refreshToken;
  body += "&client_id=" + clientID;
  await authApi(body);
}

function RequestAuthorization() {
  let url = AUTHORIZE;
  url += "?client_id=" + clientID;
  url += "&response_type=code";
  url += "&redirect_uri=" + REDIRECT_URI;
  url += "&show_dialog=true";
  url += "&scope=user-library-read user-modify-playback-state user-read-playback-state playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-top-read";
  window.location.href = url;
}
