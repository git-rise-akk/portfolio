<template>
  <div
    class="MenuBtn"
    :class="{ 'MenuBtn--close': store.menuOpened }"
    @click="store.menuOpened = !store.menuOpened,  storeCursor.small = true"
    @mouseenter="updateCursorState('CustomCursor--big', '')"
    @mouseleave="updateCursorState('', '')"
  >
    <div class="lines">
      <div class="line line--top"></div>
      <div class="line line--bottom"></div>
    </div>
  </div>
</template>

<script setup>
  import { useMenuStore } from '@/stores/menu';
  import { changesCursorState } from '@/stores/Cursor';
  const store = useMenuStore();
  const storeCursor = changesCursorState();
  const updateCursorState = (newClass, text) => {
    storeCursor.toggleClass = newClass;
    storeCursor.text = text;
  };
</script>

<style lang="scss" scoped>
.MenuBtn {
  width: 10rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  .lines {
    position: relative;
    height: 1.8rem;
    width: 6rem;
    .line {
      position: absolute;
      top: 0;
      width: 6rem;
      height: 3px;
      background: #fff;
      transition: transform 0.3s ease-in, top 0.5s ease-out 0.3s;
      &.line--bottom {
        top: initial;
        bottom: 0;
        transition: transform 0.3s ease-in, bottom 0.3s ease-out 0.3s;
      }
    }
  }
  &.MenuBtn--close {
    .lines {
      .line--top {
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
        transition: top 0.3s ease-out , transform 0.3s ease-in 0.3s;
      }
      .line--bottom {
        bottom: 50%;
        transform: translateY(25%) rotate(-45deg);
        transition: bottom 0.3s ease-out , transform 0.3s ease-in 0.3s;
      }
    }
  }
}
</style>
