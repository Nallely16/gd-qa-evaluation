<template>
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-gray-500 dark:text-gray-400">Logging out...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useLoginStore } from '~/stores/login'

onMounted(() => {
  const loginStore = useLoginStore()
  loginStore.logout()
})
</script>
