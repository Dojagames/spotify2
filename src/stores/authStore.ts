import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('access_token') || '',
    refreshToken: localStorage.getItem('refresh_token') || '',
    loggedIn: false
  }),
  actions: {
    setTokens(accessToken: string, refreshToken: string) {
      if(accessToken && accessToken.length > 0){
        this.accessToken = accessToken;
        localStorage.setItem('access_token', accessToken);
      }

      if(refreshToken && refreshToken.length > 0){
        this.loggedIn = true;
        this.refreshToken = refreshToken;
        localStorage.setItem('refresh_token', refreshToken);
      }
    },
    clearTokens() {
      this.accessToken = '';
      this.refreshToken = '';
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }
});
