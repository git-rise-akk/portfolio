<template>
  <div class="PopupGallery">
    <div class="controls">
      <div
        class="control-element control-element__left"
        @mouseenter="updateCursorState('CustomCursor--big', 'назад')"
      ></div>
      <div
        class="control-element control-element__right"
        @mouseenter="updateCursorState('CustomCursor--big CustomCursor--anim-text', 'вперёд')"
      ></div>
    </div>
    <div class="photos">
      <div
        v-for="(photo, key) in photos"
        :key="`photo${key}`"
        class="photo-wrapper">
        <img :src="photo" class="photo"/>
      </div>
    </div>
    <div class="counter-photos">
      <div class="current-photo">3</div>
      <div class="separator">/</div>
      <div class="total-photos">230</div>
    </div>
    <Close
      @click="emit('closePopup')"
      @mouseenter="updateCursorState('CustomCursor--big', '')" />
  </div>
</template>

<script setup>
  import { changesCursorState } from '@/stores/Cursor';
  const store = changesCursorState();

  const props = defineProps({
    photos: {
      type: Array,
      default: ['/images/intro/1.jpg', '/images/home/preview_video.jpg', '/images/intro/intro.jpg']
    },
  });
  const emit = defineEmits(['closePopup']);
  const updateCursorState = (newClass, text) => {
    store.toggleClass = newClass;
    store.text = text;
  };
  onBeforeUnmount(() => {
    updateCursorState('', '');
  });
</script>

<style lang="scss">
.PopupGallery {
  @include d100;
  background-color: $main;
  z-index: 4;
  overflow: hidden;
  .controls {
    @include d100;
    display: flex;
    z-index: 1;
    .control-element {
      position: relative;
      height: 100%;
      width: 50%;
      -webkit-tap-highlight-color: transparent;
    }
  }
  .counter-photos {
    position: absolute;
    bottom: 7rem;
    left: 7rem;
    display: flex;
    font-family: Sverdlovsk, Arial, Helvetica, sans-serif;
    font-size: 9.6rem;
  }
  .photos {
    position: relative;
    height: 100%;
    .photo-wrapper {
      @include d100;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $main;
      .photo {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
