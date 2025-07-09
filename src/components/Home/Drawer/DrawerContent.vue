<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useSpotifyStore } from '@/stores/dataStore.ts';

  const spotifyStore = useSpotifyStore();

  const searchTerm = ref('');
  const filteredPlaylists = computed(() => {
    console.log(spotifyStore.getAllPlaylists(''));
    return spotifyStore.getAllPlaylists(searchTerm.value);
  });


  function setPlaylist(id: string) {
    spotifyStore.setCurrentPlaylist(id);
  }

  function preloadPlaylist(id: string){
    spotifyStore.loadPlaylistTracks(id);
  }

</script>

<template>
  <div id="drawerBottomArea" class="w-full h-[calc(100vh-110px-38px)] max-h-[calc(100vh-110px)]] overflow-y-auto overflow-x-hidden bg-[#212121] rounded-[12px] ">
    <div id="searchBar">
      <input v-model="searchTerm" type="text" placeholder="Search playlists..." class="w-[80%] h-12 ml-[10%] my-3 px-3 rounded-[12px] bg-[#333333] text-white focus:outline-none focus:ring-2 focus:ring-[#1db954]" />
    </div>
    <div v-for="list in filteredPlaylists" class="cursor-pointer p-3 mb-2 w-full h-16 relative" @click="setPlaylist(list.id);" @mouseover="preloadPlaylist(list.id)">
      <img :src="(list['images'] && list.images.length > 0) ? list.images[0].url : ''" class="rounded-[12px] w-16 h-16 object-cover" @error="preloadPlaylist(list.id)">
      <p class="m-0 absolute top-[27%] left-[85px] whitespace-nowrap overflow-hidden text-lg">{{ list.name }}</p>
      <small class="absolute top-[62%] left-[85px] ">{{ list.tracks.total }} songs</small>
    </div>
  </div>
</template>

<style scoped>

</style>
