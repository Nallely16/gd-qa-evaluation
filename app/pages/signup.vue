<template>
  <UAuthForm :fields="fields" :schema="schema" title="Create an account" :submit="{ label: 'Create account' }"
    @submit="onSubmit">
    <template #description>
      Already have an account?
      <ULink to="/login" class="text-primary font-medium">Login</ULink>.
    </template>

    <template #footer>
      By signing up, you agree to our
      <ULink to="/" class="text-primary font-medium">Terms of Service</ULink>.
    </template>
  </UAuthForm>
</template>

<script setup lang="ts">
import { provider } from '~/services/provider'
import UserExternal from '~/models/user.external'
import type { FormSubmitEvent } from '@nuxt/ui'
import { ref } from 'vue'
import { navigateTo } from '#app'
import * as z from 'zod'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Sign up',
  description: 'Create an account to get started'
})

const toast = useToast()

const fields = [
  { name: 'username', type: 'text' as const, label: 'Username', placeholder: 'Enter your username' },
  { name: 'email', type: 'text' as const, label: 'Email', placeholder: 'Enter your email' },
  { name: 'password', label: 'Password', type: 'password' as const, placeholder: 'Enter your password' }
]

const formData = ref({
  username: '',
  email: '',
  password: ''
})

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const user = new UserExternal(payload.data.username, payload.data.email, payload.data.password)
  try {
    await provider.saveUser(user)
    toast.add({
      title: '¡Registro exitoso!',
      description: 'Se inició sesión correctamente.',
      icon: 'i-heroicons-check-circle'
    })

    // Limpiar los datos del formulario
    formData.value = {
      username: '',
      email: '',
      password: ''
    }

    // Redirigir a home
    navigateTo('/home')
  } catch (error: any) {
    toast.add({
      title: '¡Ups! Algo salió mal.',
      description: 'Ocurrió un problema con tu solicitud.',
      icon: 'i-heroicons-exclamation-circle'
    })
  }
}
</script>
