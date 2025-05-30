<script setup lang="ts">
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <LogoPro class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <template #right>
      <UColorModeButton />
      <UButton icon="i-lucide-log-in" color="neutral" variant="ghost" to="/login" class="lg:hidden" />
      <UButton label="Sign in" color="neutral" variant="outline" to="/login" class="hidden lg:inline-flex" />
      <UButton label="Sign up" color="neutral" trailing-icon="i-lucide-arrow-right" class="hidden lg:inline-flex"
        to="/signup" />
    </template>

    <template #body>
      <USeparator class="my-6" />
      <UButton label="Sign in" color="neutral" variant="subtle" to="/login" block class="mb-3" />
      <UButton label="Sign up" color="neutral" to="/signup" block />
    </template>
  </UHeader>
</template>
