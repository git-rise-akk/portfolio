// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '@/assets/css/main.scss',
    ],
    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL,
        },
    },
})
