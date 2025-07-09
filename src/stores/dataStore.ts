import { defineStore } from 'pinia';

export const useSpotifyStore = defineStore('spotify', {
  state: () => ({
    playlists: {} as Record<string, any>,
    tracks: {} as Record<string, any>,
    users: {} as Record<string, any>,
    playlistOrder: [] as string[],
    currentPlaylistId: null as string | null,
  }),
  actions: {
    setPlaylists(playlists: any[]) {
      playlists.forEach(playlist => {
        this.playlists[playlist.id] = playlist;
        if (!this.playlistOrder.includes(playlist.id)) {
          this.playlistOrder.push(playlist.id);
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
      if (state.currentPlaylistId) {
        return state.playlists[state.currentPlaylistId] || null;
      }
      return null;
    }
  }
});
