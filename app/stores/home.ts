import { defineStore } from 'pinia'
import { decryptData, encryptData } from '~/shared/utils'
import type { UserData } from '~/interfaces'
import { provider } from '~/services/provider'
import { useToast } from '#imports'

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    user: {
      name: '',
      email: ''
    },
    profileForm: {
      name: ''
    },
    message: '',
    error: ''
  }),

  actions: {
    loadUserFromLocalStorage() {
      const encryptedUserData = localStorage.getItem('user')
      if (!encryptedUserData) return

      const decryptedUser = decryptData(encryptedUserData) as UserData
      this.user.name = decryptedUser.username || decryptedUser.name || 'User'
      this.user.email = decryptedUser.email || 'No email'
      this.profileForm.name = this.user.name
    },

    async updateUserName() {
      try {
        const response = await provider.changeUsername(
          this.profileForm.name,
          this.user.email
        )

        const updatedUser = response.data
        this.user.name = updatedUser.username
        this.profileForm.name = updatedUser.username

        localStorage.setItem('user', encryptData(updatedUser))

        useToast().add({
          title: '¡Nombre actualizado!',
          description: 'Tu nombre se actualizó correctamente.',
          icon: 'i-heroicons-check-circle'
        })

        this.message = 'Nombre actualizado correctamente.'
        this.error = ''
      } catch {
        this.error = 'Error al actualizar el nombre.'
        this.message = ''
        useToast().add({
          title: 'Error',
          description: 'No se pudo actualizar el nombre.',
          icon: 'i-heroicons-exclamation-circle'
        })
      }
    },

    async updatePassword(email: string, currentPassword: string, newPassword: string) {
      try {
        await provider.updatePassword(email, currentPassword, newPassword)
        this.message = 'Contraseña actualizada correctamente.'
        this.error = ''
      } catch {
        this.message = ''
        this.error = 'Error al actualizar la contraseña.'
        throw new Error('No se pudo actualizar la contraseña.')
      }
    }

  }
})
