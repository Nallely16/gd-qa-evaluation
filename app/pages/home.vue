<template>
  <UPageHero
    title="Ultimate Vue UI library"
    description="A Nuxt/Vue-integrated UI library providing a rich set of fully-styled, accessible and highly customizable components for building modern web applications."
    headline="New release"
    orientation="horizontal"
    reverse
    :links="links"
  >
    <img
      src="https://ui.nuxt.com/templates/dashboard1.png"
      alt="App screenshot"
      class="rounded-lg shadow-2xl ring ring-default"
    />
  </UPageHero>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home',
  middleware: 'auth'
})

const links = ref([
  {
    label: 'Get started',
    href: 'https://ui.nuxt.com/getting-started',
    icon: 'i-lucide-square-play'
  },
  {
    label: 'Learn more',
    href: 'https://ui.nuxt.com/getting-started/theme',
    color: 'neutral' as const,
    variant: 'subtle' as const,
    trailingIcon: 'i-lucide-arrow-right'
  }
])
</script>
