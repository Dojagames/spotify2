<script setup lang="ts">
import { onLoad } from './composables/auth.ts';
import { onMounted } from 'vue'
import { callApi }  from '@/composables/api.ts'


onMounted(() => {
    onLoad();
});

function callTest() {
  callApi('me/player/queue', "GET")
    .then(response => {
      console.log("API call successful:", response);
    })
    .catch(error => {
      console.error("API call failed:", error);
    });
}

</script>

<template>
  <button @click="callTest">test</button>
</template>

<style scoped>

</style>
