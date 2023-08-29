<template>
  <div
    class="CustomCursor"
    :class="[store.toggleClass, {'CustomCursor--small': store.small}]"
    :style="{ top: `${cursorY}px`, left: `${cursorX}px` }">
    <transition name="text-fade">
      <div class="CustomCursor__text" v-if="store.text" v-html="store.text"></div>
    </transition>
  </div>
</template>

<script setup>
  import { changesCursorState } from '@/stores/Cursor';
  const store = changesCursorState();
  const cursorX = ref(0);
  const cursorY = ref(0);
  const updateCursorPosition = (event) => {
    cursorX.value = event.clientX;
    cursorY.value = event.clientY;
  };
  const WatchEffect = watchEffect(() => {
        if (store.small) {
          setTimeout(() => {
            store.small = false;
          }, 200);
        }
      },
      {flush: 'post'}
  );
  onMounted(() => {
    document.addEventListener('mousemove', updateCursorPosition);
  });
  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', updateCursorPosition);
  });
</script>

<style lang="scss">
.CustomCursor {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4rem;
  height: 4rem;
  border: 2px solid #fff;
  z-index: 4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  @include anim( .3s, width, height);
  &.CustomCursor--default {
    border-color: transparent;
  }
  &.CustomCursor--anim-text {
    .CustomCursor__text {
      transform: rotate(360deg);
    }
  }
  &.CustomCursor--big {
    width: 10rem;
    height: 10rem;
  }
  &.CustomCursor--small {
    width: 8rem;
    height: 8rem;
  }
  .CustomCursor__text {
    font-size: 1.6rem;
    font-weight: bold;
    @include anim(.3s, transform);
  }
  .text-fade-enter-active,
  .text-fade-leave-active {
    @include anim(.2s, opacity);
  }
  .text-fade-enter-from,
  .text-fade-leave-to {
    opacity: 0;
  }
}
</style>
