import { useAuthStore } from '@/stores/authStore';
let authStore: ReturnType<typeof useAuthStore>;

const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

// const REDIRECT_URI= "https://spotify.jonx.dev/callback";
const REDIRECT_URI = "http://localhost:5173/callback";
const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";


function authApi(body: string){
  fetch(TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + btoa(clientID + ":" + clientSecret)
    },
    body: body
  })
    .then(response => response.json())
    .then(data => {
      console.log("Received data:", data);
      if (data.access_token) {
        authStore.setTokens(data.access_token, data.refresh_token);
      } else {
        console.error("Failed to retrieve access token:", data);
      }
    })
    .catch(error => console.error("Error fetching access token:", error));
}


export function onLoad(){
  authStore = useAuthStore();
  console.log(authStore.accessToken, authStore.refreshToken);
  if ( window.location.search.length > 0 ){
    retrieveTokenFromUrl();
    return;
  }

  if ( authStore.accessToken == null || authStore.accessToken.length == 0 ){
      console.log("no token found");
      RequestAuthorization();
      return;
  }

  console.log(authStore.accessToken);
  refreshAccessToken();
}

export function retrieveTokenFromUrl(){
  const authCode = getAuthCode();
  if (authCode){
    fetchAccessToken(authCode)
  }

}

function getAuthCode(){
  let code = null;
  const queryString = window.location.search;
  if ( queryString.length > 0 ){
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get('code')
  }
    return code;
}


function fetchAccessToken(authCode: string){
  let body = "grant_type=authorization_code";
  body += "&code=" + authCode;
  body += "&redirect_uri=" + encodeURI(REDIRECT_URI);
  body += "&client_id=" + clientID;
  body += "&client_secret=" + clientSecret;
  authApi(body);
}


function refreshAccessToken(){
  let body = "grant_type=refresh_token";
  body += "&refresh_token=" + authStore.refreshToken;
  body += "&client_id=" + clientID;
  console.log(body)
  authApi(body);
}


function RequestAuthorization(){
  let url = AUTHORIZE;
  url += "?client_id=" + clientID;
  url += "&response_type=code";
  url += "&redirect_uri=" + REDIRECT_URI;
  url += "&show_dialog=true";
  url += "&scope=user-library-read user-modify-playback-state user-read-playback-state playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-top-read" ;
  window.location.href = url; // Show Spotify's authorization screen
}
