<script setup lang="ts">
const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  toast.add({
    title: 'Subscribed!',
    description: 'You\'ve been subscribed to our newsletter.'
  })
}
</script>

<template>
  <USeparator icon="i-simple-icons-nuxtdotjs" class="h-px" />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <div class="w-full text-center py-2">
      <p class="text-muted text-sm">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </div>
  </UFooter>
</template>
