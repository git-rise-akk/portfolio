// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '@/assets/css/main.scss',
    ],
    modules: [
        '@pinia/nuxt',
    ],
    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL,
        },
    },
    vue: {
        compilerOptions: {
            isCustomElement: (tag:string) => ['locomotive-scroll'].includes(tag),
        },
    },
})
