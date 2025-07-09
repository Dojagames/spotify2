import { defineStore } from 'pinia';
import { callApi } from '@/composables/api';

export const useSpotifyStore = defineStore('spotify', {
  state: () => ({
    playlists: {} as Record<string, any>,
    tracks: {} as Record<string, any>,
    users: {} as Record<string, any>,
    playlistOrder: [] as string[],
    currentPlaylistId: null as string | null,
    loadedPlaylists: {} as Record<string, { tracks: any[], timestamp: number }>
  }),
  actions: {
    setPlaylists(playlists: any[], userId: string) {
      playlists.forEach(playlist => {
        console.log(playlist.owner.id, userId)
        if(userId && playlist.owner.id === userId) {
          this.playlists[playlist.id] = playlist;
          if (!this.playlistOrder.includes(playlist.id)) {
            this.playlistOrder.push(playlist.id);
          }
        }

      });
    },
    setTracks(tracks: any[]) {
      tracks.forEach(track => {
        this.tracks[track.id] = track;
      });
    },
    setUsers(users: any[]) {
      users.forEach(user => {
        this.users[user.id] = user;
      });
    },
    setCurrentPlaylist(id: string) {
      if (this.playlists[id]) {
        this.currentPlaylistId = id;
      } else {
        this.currentPlaylistId = null;
      }
    },
    async loadPlaylistTracks(id: string) {
      const cached = this.loadedPlaylists[id];
      const now = Date.now();

      // If cached within the last 60 seconds, skip
      if (cached && now - cached.timestamp < 60_000) return;

      try {
        const tracks: any[] = [];
        let nextUrl = `playlists/${id}/tracks?limit=100`;

        while (nextUrl) {
          const res = await callApi({ endpoint: nextUrl, fetchAll: false });
          if (res.items) tracks.push(...res.items);
          nextUrl = res.next?.replace('https://api.spotify.com/v1/', '') ?? null;
        }

        this.loadedPlaylists[id] = {
          tracks,
          timestamp: now
        };
      } catch (err) {
        console.error(`Failed to load playlist ${id}:`, err);
      }
    },
    clearStore() {
      this.playlists = {};
      this.tracks = {};
      this.users = {};
      this.playlistOrder = [];
      this.currentPlaylistId = null;
    }
  },
  getters: {
    getCurrentPlaylist(state) {
      if (state.currentPlaylistId && state.loadedPlaylists[state.currentPlaylistId]) {
        return {
          playlist: state.playlists[state.currentPlaylistId],
          tracks: state.loadedPlaylists[state.currentPlaylistId].tracks
        };
      }
      return null;
    },
    getAllPlaylists: (state) => {
      return (searchTerm: string) => {
        const lowerSearch = searchTerm.toLowerCase();
        return state.playlistOrder
          .map(id => state.playlists[id])
          .filter(playlist =>
            playlist.name.toLowerCase().includes(lowerSearch)
          );
      };
    },
    getPlaylistTracks: (state) => (id: string) =>
      state.loadedPlaylists[id]?.tracks || []
  }
});
