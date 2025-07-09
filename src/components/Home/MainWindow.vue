<script setup lang="ts">
import Content from '@/components/Home/MainWindow/Content.vue'
import Player from '@/components/Home/MainWindow/Player.vue'
import Settings from '@/components/Home/MainWindow/Settings.vue'
import { ref } from 'vue'

const mode = ref<'main' | 'settings'>('main')

</script>

<template>
  <div class="w-[calc(100vw-400px)] h-full bg-[#212121] absolute top-0 right-0">
    <Content v-if="mode === 'main'"/>
    <Settings v-else-if="mode === 'settings'"/>
    <Player/>
  </div>
</template>

<style scoped>

</style>
