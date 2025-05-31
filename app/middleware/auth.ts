export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = useCookie('auth_token').value

  if (!isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }
})