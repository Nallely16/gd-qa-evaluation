import Axios from 'axios'
import type UserExternal from '~/models/user.external'
import { useRuntimeConfig } from '#app'

function getApiUrl() {
  if (process.server) {
    return process.env.NUXT_PUBLIC_API_URL + '/api/v1'
  } else {
    const config = useRuntimeConfig()
    return config.public.apiUrl + '/api/v1'
  }
}

function createAxios() {
  return Axios.create({
    baseURL: getApiUrl(),
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000
  })
}

export const provider = {
  saveUser(user: UserExternal) {
    const axios = createAxios()
    return axios.post('/user', user.toJSON())
  },
}
