import { defineStore } from 'pinia'

export const changesCursorState = defineStore('changesCursorState', {
    state: () => ({
        toggleClass: '',
        text: '',
        small: false,
    }),
})
