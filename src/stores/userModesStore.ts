import { defineStore } from 'pinia'
import { ref } from 'vue'

export type UserMode = 'utils' | 'settings' | 'editor'

export const useUserModesStore = defineStore('userModes', () => {
  const mode = ref<UserMode>('editor')

  function setMode(newMode: UserMode) {
    mode.value = newMode
  }

  return {
    mode,
    setMode,
  }
})
