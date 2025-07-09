<script setup lang="ts">
import ModeSelection from '@/components/Home/Drawer/ModeSelection.vue'
import DrawerContent from '@/components/Home/Drawer/DrawerContent.vue'
</script>

<template>
  <div class="w-[400px] h-full absolute top-0 left-0 p-3">
    <ModeSelection/>
    <DrawerContent/>
  </div>
</template>

<style scoped>

</style>
