<script setup lang="ts">
import { onLoad } from './composables/auth.ts';
import { onMounted } from 'vue'
import { callApi }  from '@/composables/api.ts'
import { useUserStore} from '@/stores/userStore.ts'
import { useSpotifyStore } from '@/stores/dataStore.ts'
import Home from '@/components/Home.vue'

const userStore = useUserStore();
const spotifyStore = useSpotifyStore();

onMounted(() => {
    onLoad()
      .then(() => {
        callApi({endpoint: 'me'}).then(response => {
          userStore.setUser(response);
        });
        callApi({endpoint: 'me/playlists', fetchAll: true}).then(response => {
          spotifyStore.setPlaylists(response.items);
          console.log(JSON.parse(JSON.stringify(spotifyStore.getAllPlaylists(''))));
        });

      })
      .catch(error => {
        console.error("Error during onLoad:", error);
      });
});

</script>

<template>
  <!-- v-if logged in-->
  <Home/>
</template>

<style scoped>

</style>
