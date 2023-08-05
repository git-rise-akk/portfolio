<template>
  <div v-locomotive="{ options }" id="app" class="js-locomotive">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useScrollStore } from '@/stores/scroll';

export default defineComponent({
  name: 'LocomotiveScroll',
  directives: {
    locomotive: {
      mounted(el, binding, vnode) {
        vnode.locomotive = new vnode.LocomotiveScroll({
          el,
          ...binding.value.options,
        })
        vnode.locomotive.on('scroll', (e) => {
          vnode.onScroll(e)
          // vnode.emit('scroll')
        })
        vnode.emit('init')
      },
      unmounted(el, binding, vnode) {
        vnode.locomotive.destroy()
        vnode.locomotive = undefined
      },
    },
  },
  props: {
    gettedOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      locomotive: undefined,
      defaultOptions: {
        smooth: true,
      },
    }
  },
  computed: {
    options() {
      return { ...this.defaultOptions, ...this.gettedOptions }
    },
  },
  mounted() {
    this.$nuxt.$on('update-locomotive', () => {
      this?.locomotive?.update()
    })
  },
  methods: {
    onScroll(e) {
      const scrollStore = useScrollStore(); // Создание экземпляра стора
      scrollStore.setScroll({
        isScrolling: this.locomotive.scroll.isScrolling,
        limit: { ...e.limit },
        ...e.scroll, // x, y
      });
    },
  },
})
</script>

<style scoped lang="scss">
.has-scroll-smooth body {
  overflow: hidden;
}

.has-scroll-smooth .js-locomotive {
  min-height: 100%;
  width: 100%;
}
</style>
