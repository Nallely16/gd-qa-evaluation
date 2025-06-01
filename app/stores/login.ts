import { defineStore } from 'pinia'
import { useToast } from '#imports'
import { provider } from '~/services/provider'
import { decryptData, encryptData } from '~/shared/utils'
import { navigateTo, useCookie } from '#app'
import type { UserData } from '~/interfaces'

export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    user: null as UserData | null,
  }),

  actions: {
    async login(email: string, password: string) {
      const toast = useToast()
      try {
        const response = await provider.getCredentials(email, password)

        const authToken = useCookie('auth_token')
        authToken.value = response.data.token

        localStorage.setItem('user', encryptData(response.data.user))
        localStorage.setItem('sessionStart', encryptData({ value: Date.now().toString() }))

        this.user = {
          username: response.data.user.username,
          email: response.data.user.email
        }

        toast.add({
          title: '¡Bienvenido!',
          description: 'Has iniciado sesión correctamente.',
          icon: 'i-heroicons-check-circle'
        })

        await navigateTo('/home')
      } catch {
        toast.add({
          title: 'Error al iniciar sesión',
          description: 'Verifica tus credenciales o intenta nuevamente.',
          icon: 'i-heroicons-exclamation-circle'
        })
      }
    },

    logout() {
      const toast = useToast()
      const authToken = useCookie('auth_token')
      authToken.value = null
      localStorage.removeItem('user')
      localStorage.removeItem('sessionStart')

      this.user = null

      toast.add({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión correctamente.',
        icon: 'i-heroicons-check-circle'
      })

      navigateTo('/')
    },

    initializeSession() {
      const encryptedUserData = localStorage.getItem('user')
      if (encryptedUserData) {
        const decryptedUser = decryptData(encryptedUserData) as UserData
        this.user = {
          username: decryptedUser.username,
          email: decryptedUser.email
        }
      }
    }
  },

  getters: {
    isLoggedIn: (state) => !!state.user
  }
})