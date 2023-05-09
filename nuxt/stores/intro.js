import { defineStore } from 'pinia'

export const useIntroStore = defineStore('intro', {
    state: () => ({ hideIntro: false }),
})
