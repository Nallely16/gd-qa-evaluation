<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div class="w-64 flex flex-col border-r border-gray-300 dark:border-slate-700 bg-white dark:bg-transparent ml-0">
      <div class="flex items-center space-x-2 py-4 px-2">
        <i class="i-heroicons-user-circle text-xl text-gray-800 dark:text-white" />
        <span class="font-semibold text-lg text-gray-800 dark:text-white">Cuenta</span>
      </div>

      <nav class="flex flex-col mt-4 ml-0">
        <button
          @click="activeTab = 'profile'"
          :class="[
            'flex items-center px-4 py-2 space-x-2 rounded transition-colors',
            activeTab === 'profile'
              ? 'bg-gray-200 dark:bg-slate-700/40 text-blue-600 dark:text-blue-500 font-semibold'
              : 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-white'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Perfil</span>
        </button>
        <button
          @click="activeTab = 'password'"
          :class="[
            'flex items-center px-4 py-2 space-x-2 rounded transition-colors',
            activeTab === 'password'
              ? 'bg-gray-200 dark:bg-slate-700/40 text-blue-600 dark:text-blue-500 font-semibold'
              : 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-white'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-keyhole-icon lucide-lock-keyhole"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>
          <span>Cambiar contraseña</span>
        </button>
      </nav>
    </div>

    <!-- Panel principal -->
    <div class="flex-1 p-8 overflow-y-auto flex flex-col items-center space-y-6">
      <div class="text-center">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {{ activeTab === 'profile' ? 'Información del perfil' : 'Cambiar contraseña' }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ activeTab === 'profile'
            ? 'Actualiza el nombre de tu cuenta'
            : 'Actualiza tu contraseña de acceso.' }}
        </p>
      </div>

      <div class="border border-gray-300 dark:border-slate-700 rounded-lg p-8 w-full max-w-2xl bg-white/60 dark:bg-slate-900/20 backdrop-blur-sm space-y-6">
        <!-- Perfil -->
        <div v-if="activeTab === 'profile'" class="space-y-4 text-left">
          <div class="flex items-center space-x-4">
            <div class="flex items-center justify-center w-16 h-16 rounded-full border border-blue-400 dark:border-blue-500 text-blue-500 font-bold text-xl">
              {{ homeStore.user.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="font-medium text-gray-800 dark:text-gray-100">{{ homeStore.user.name }}</p>
              <p class="text-gray-500 dark:text-slate-400 text-sm">{{ homeStore.user.email }}</p>
            </div>
          </div>

          <hr class="border-gray-300 dark:border-slate-700" />

          <UForm :state="homeStore.profileForm" @submit.prevent="updateName" class="space-y-4">
            <UFormField label="Nombre:">
              <UInput v-model="homeStore.profileForm.name" placeholder="Tu nombre" />
            </UFormField>

            <UFormField label="Correo electrónico:">
              <UInput
                v-model="homeStore.user.email"
                readonly
                class="bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400"
              />
            </UFormField>

            <div class="flex justify-end">
              <UButton type="submit" color="primary" class="cursor-pointer">Guardar cambios</UButton>
            </div>
          </UForm>
        </div>

        <!-- Cambiar contraseña -->
        <div v-else-if="activeTab === 'password'" class="space-y-4">
          <UForm :state="passwordForm" @submit.prevent="updatePassword" class="space-y-4">
            <UFormField label="Nueva contraseña:">
              <UInput type="password" v-model="passwordForm.newPassword" placeholder="Nueva contraseña" />
            </UFormField>

            <UFormField label="Confirmar contraseña:">
              <UInput type="password" v-model="passwordForm.confirmPassword" placeholder="Repite la contraseña" />
            </UFormField>

            <div class="flex justify-end">
              <UButton type="submit" color="primary" class="cursor-pointer">Actualizar contraseña</UButton>
            </div>
          </UForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHomeStore } from '~/stores/home'
import { useToast } from '#imports'

definePageMeta({
  layout: 'profile',
  middleware: 'auth'
})

const homeStore = useHomeStore()
const toast = useToast()
const activeTab = ref<'profile' | 'password'>('profile')

onMounted(() => {
  homeStore.loadUserFromLocalStorage()
})

const updateName = async () => {
  await homeStore.updateUserName()
  toast.add({
    title: '¡Actualizado!',
    description: 'Tu nombre ha sido actualizado correctamente.',
    icon: 'i-heroicons-check-circle'
  })
}

const passwordForm = ref({
  newPassword: '',
  confirmPassword: ''
})

const updatePassword = async () => {
  if (!passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
    toast.add({
      title: 'Error',
      description: 'Debes llenar ambos campos de contraseña.',
      icon: 'i-heroicons-exclamation-circle'
    })
    return
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    toast.add({
      title: 'Error',
      description: 'Las contraseñas no coinciden.',
      icon: 'i-heroicons-exclamation-circle'
    })
    return
  }

  passwordForm.value.newPassword = ''
  passwordForm.value.confirmPassword = ''
  toast.add({
    title: '¡Contraseña actualizada!',
    description: 'Tu contraseña se actualizó correctamente.',
    icon: 'i-heroicons-check-circle'
  })
}
</script>
