// https://nuxt.com/docs/api/configuration/nuxt-config
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
    ],
    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL,
        },
    },
    vue: {
        compilerOptions: {
            isCustomElement: (tag:string) => ['LocomotiveScroll'].includes(tag),
        },
    },
})
