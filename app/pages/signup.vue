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
import { useCookie } from '#app'
import { encryptData } from '~/shared/utils'

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
  const { username, email, password } = payload.data;
  const user = new UserExternal(username, email, password);
  try {
    await provider.saveUser(user);
    const response = await provider.getCredentials(email, password);

    const authToken = useCookie('auth_token');
    authToken.value = response.data.token;

    localStorage.setItem('user', encryptData(response.data.user))
    localStorage.setItem('sessionStart', encryptData({ value: Date.now().toString() }))

    toast.add({
      title: '¡Registro exitoso!',
      description: 'Has iniciado sesión correctamente.',
      icon: 'i-heroicons-check-circle'
    });

    await navigateTo('/home');
  } catch (error: any) {
    console.error('Error en registro/login:', error);
    toast.add({
      title: '¡Ups! Algo salió mal.',
      description: 'Ocurrió un problema con tu solicitud.',
      icon: 'i-heroicons-exclamation-circle'
    });
  }
}
</script>
