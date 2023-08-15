<template>
  <div v-locomotive="{ options }" class="js-locomotive">
    <slot />
  </div>
</template>

<script>
import { useScrollStore } from '@/stores/scroll';

export default defineNuxtPlugin({
  name: 'LocomotiveScroll',
  parallel: true,
  async setup (nuxtApp) {
    const props = defineProps({
      gettedOptions: {
        type: Object,
        default: () => ({}),
      }
    });
    const locomotive = ref(undefined);
    const defaultOptions = ref({smooth: true,});
    onMounted(() => {
        this.$root.$on('update-locomotive', () => {
          locomotive?.update()
        })
    });
    const onScroll = (e) => {
      const scrollStore = useScrollStore(); // Создание экземпляра стора
      scrollStore.setScroll({
        isScrolling: locomotive.scroll.isScrolling,
        limit: { ...e.limit },
        ...e.scroll, // x, y
      });
    }
    nuxtApp.vueApp.directive('locomotive', {
      mounted(el, binding, vnode) {
        const options = computed(() => {
          return { ...defaultOptions, ...props.gettedOptions }
        });
        const emitInit = defineEmits(['init']);
        vnode.locomotive = new vnode.LocomotiveScroll({
          el: el.value,
          ...binding.options.value,
        })
        vnode.locomotive.on('scroll', (e) => {
          const emitScroll = defineEmits(['scroll']);
          onScroll(e)
          emitScroll('scroll')
        })
        emitInit('init');
      },
      unmounted(el, binding, vnode) {
        vnode.locomotive.destroy()
        vnode.locomotive = undefined
      },
    })
  }
})

// export default defineNuxtPlugin((nuxtApp) => {
//   name: 'LocomotiveScroll',
//   nuxtApp.vueApp.directive('locomotive', {
//     mounted (el, binding, vnode) {
//     },
//     getSSRProps (binding, vnode) {
//       // you can provide SSR-specific props here
//       return {}
//     }
//   })
// })

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
