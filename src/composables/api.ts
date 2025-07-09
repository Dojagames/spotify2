import { useAuthStore } from '@/stores/authStore';

interface CallApiOptions {
  endpoint: string;
  method?: string;
  body?: Record<string, any> | string | null;
  headers?: Record<string, string>;
  fetchAll?: boolean;
}

export async function callApi({
  endpoint,
  method = 'GET',
  body = null,
  headers = {},
  fetchAll = false
}:CallApiOptions) {
  const authStore = useAuthStore();
  const accessToken = authStore.accessToken;

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const baseHeaders = {
    'Content-Type': 'application/json',
    ...headers
  };

  const results: any[] = [];
  let url = `https://api.spotify.com/v1/${endpoint}`;

  while (url) {
    const response = await fetch(url, {
      method,
      headers: baseHeaders,
      body: body && typeof body !== 'string' ? JSON.stringify(body) : body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (fetchAll && json.items) {
      results.push(...json.items);
      url = json.next;
    } else {
      return json;
    }
  }

  return { items: results };
}
