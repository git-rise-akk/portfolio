// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    css: [
        '@/assets/css/main.scss',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/css/variables.scss";',
                },
            },
        },
    },
    modules: [
        '@pinia/nuxt',
        'nuxt-icons',
        '@nuxt/image',
        '@nuxtjs/device',
        'nuxt-lenis',
    ],
    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL,
        },
    },
    app: {
        pageTransition: { name: 'page'}
    },
})
