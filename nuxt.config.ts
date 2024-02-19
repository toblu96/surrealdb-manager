// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      surrealdb_base_url: 'http://127.0.0.1:8000'
    }
  }
})
