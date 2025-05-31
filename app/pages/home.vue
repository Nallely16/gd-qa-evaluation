<template>
    <div class="space-y-4 p-4">
        <h1 class="text-2xl font-bold">Home - User Profile</h1>

        <UCard>
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-lg font-semibold">Welcome, {{ user.name }}</p>
                    <p class="text-sm text-gray-500">{{ user.email }}</p>
                </div>
                <UButton @click="logout" color="primary" variant="outline">Logout</UButton>
            </div>
        </UCard>

        <UCard>
            <h2 class="text-xl font-bold mb-2">Update Profile</h2>
            <UForm @submit="updateProfile" :state="profileForm" class="space-y-2">
                <UFormGroup label="Name">
                    <UInput v-model="profileForm.name" placeholder="New name" />
                </UFormGroup>
                <UFormGroup label="Password">
                    <UInput type="password" v-model="profileForm.password" placeholder="New password" />
                </UFormGroup>
                <UButton type="submit" color="primary">Update</UButton>
            </UForm>
        </UCard>

        <div v-if="message" class="text-center text-green-600">{{ message }}</div>
        <div v-if="error" class="text-center text-red-600">{{ error }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { navigateTo } from '#app'
import auth from '~/middleware/auth'

definePageMeta({
    layout: 'home',
    middleware: auth,
})

const user = ref({
    name: 'Test User',
    email: 'test@example.com'
})

const profileForm = ref({
    name: user.value.name,
    password: ''
})

const message = ref('')
const error = ref('')
const toast = useToast()

onMounted(() => {
    console.log('User profile loaded.')
})

async function updateProfile() {
    try {
        console.log('Updating profile:', profileForm.value)

        user.value.name = profileForm.value.name
        profileForm.value.password = ''
        message.value = 'Profile updated successfully.'
        error.value = ''

        toast.add({
            title: 'Profile Updated!',
            description: 'Your profile was updated successfully.',
            icon: 'i-heroicons-check-circle',
        })
    } catch (e: any) {
        error.value = 'Failed to update profile.'
        message.value = ''
        toast.add({
            title: 'Update Failed',
            description: 'Could not update profile.',
            icon: 'i-heroicons-exclamation-circle',
        })
    }
}

function logout() {
    navigateTo('/login')
}
</script>
