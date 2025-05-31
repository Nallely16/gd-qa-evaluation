export const getApiUrl = () => {
  if (process.server) {
    return process.env.NUXT_PUBLIC_API_URL + '/api/v1'
  } else {
    const config = useRuntimeConfig()
    return config.public.apiUrl + '/api/v1'
  }
}
