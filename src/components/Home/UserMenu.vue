<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const userImgLink = computed(() => userStore.profilePictureLink || '')
const userName = computed(() => userStore.displayName || 'Guest')
const profileLink = computed(() => userStore.externalUrl || '/')

const openUserProfile = ref(false);




</script>

<template>
  <div id="userIcon" class="cursor-pointer select-none fixed top-0 right-0 m-4 z-50">
    <img :src="userImgLink" alt="User Icon" class="rounded-full object-cover w-12 h-12 z-99" @click="openUserProfile = !openUserProfile">
    <div v-if="openUserProfile" class="absolute top-[-8px] right-[-8px] bg-[#555] shadow-lg rounded-lg p-4 z-[-10] w-48 h-24 flex flex-row items-start justify-start">
      <a :href="profileLink" target="_blank" class="text-blue-500 hover:underline">{{ userName }}</a>
      <button class="mt-2 text-blue-500 hover:underline self-end" @click="openUserProfile = false">Close</button>
    </div>
  </div>
</template>

<style scoped>

</style>
