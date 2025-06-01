<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/home">
        <LogoPro class="w-auto h-6 shrink-0" />
      </NuxtLink>
    </template>

    <div class="flex-1"></div>

    <template #right>
      <UColorModeButton size="lg" />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          size="lg"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>

      <UDropdownMenu
        :items="items"
        :ui="{ content: 'w-48' }"
        :content="{ align: 'start', side: 'bottom', sideOffset: 8 }"
      >
        <UButton icon="i-lucide-user" color="neutral" variant="ghost" size="lg" />
      </UDropdownMenu>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHomeStore } from '~/stores/home'
import type { DropdownMenuItem } from '@nuxt/ui'

const homeStore = useHomeStore()
const avatarUrl = 'https://avatars.githubusercontent.com/u/1?v=4'

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: homeStore.user.name || 'User',
      avatar: { src: avatarUrl },
      type: 'label'
    }
  ],
  [
    { label: 'Home', icon: 'i-lucide-home', to: '/home' },
    { label: 'Profile', icon: 'i-lucide-user', to: '/profile' },
    { label: 'Settings', icon: 'i-lucide-cog', to: '/settings', disabled: true }
  ],
  [
    { label: 'Logout', icon: 'i-lucide-log-out', to: '/logout' }
  ]
])
</script>