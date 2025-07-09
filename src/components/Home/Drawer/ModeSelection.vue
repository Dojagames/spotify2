<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserModesStore } from '@/stores/userModesStore';

const userModes = useUserModesStore();

const selections = ref([
  "Playlist editor",
  "utils"
])

const UserMode: Record<string, number> = {
  'editor' : 0,
  'utils': 1,
} as const;

const activeSelection = computed(() => UserMode[userModes.mode]);

function switchMode(index: number) {
  if(index === 0) {
    userModes.setMode("editor");
  } else if(index === 1) {
    userModes.setMode("utils");
  }
}

</script>

<template>
  <div class="h-[110px] w-full relative bg-[#212121] rounded-[12px] flex flex-col justify-center gap-4 items-start pl-5 mb-3">
    <div v-for="(selection, index) in selections" :key="index" class="text-2xl leading-none font-bold cursor-pointer select-none" :style="{color: activeSelection === index ? '#1db954' : 'white'}" @click="switchMode(index)">
      {{ selection }}
    </div>
  </div>
</template>

<style scoped>

</style>
