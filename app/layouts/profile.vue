<template>
  <div class="min-h-screen flex flex-col">
    <Header class="fixed top-0 left-0 right-0 z-50" />
    <main class="flex-1 overflow-y-auto pt-16 p-0">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
</script>
