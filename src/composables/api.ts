import { useAuthStore } from '@/stores/authStore';

export function callApi(endpoint: string, method: string = 'GET', body: string | null = null, headers: Record<string, string> = {}) {
  const authStore = useAuthStore();
  const accessToken = authStore.accessToken;

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return fetch(`https://api.spotify.com/v1/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body ? JSON.stringify(body) : null
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });

}
