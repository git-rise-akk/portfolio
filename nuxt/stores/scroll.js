import { defineStore } from 'pinia';

export const useScrollStore = defineStore('scroll', {
    state: () => ({
        isScrolling: false,
        limit: {
            x: 0,
            y: 0,
        },
        x: 0,
        y: 0,
    }),

    actions: {
        setScroll(payload) {
            this.$state.isScrolling = payload.isScrolling;
            this.$state.limit = { ...this.$state.limit, ...payload.limit };
            this.$state.x = payload.x;
            this.$state.y = payload.y;
        },
    },
});
