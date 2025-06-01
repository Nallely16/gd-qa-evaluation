export default defineAppConfig({
  toaster: {
    position: 'bottom-right' as const,
    expand: true,
    duration: 1000 // 1 segundo por defecto
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    }
  }
})
