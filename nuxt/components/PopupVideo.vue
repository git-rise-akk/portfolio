<template>
  <div class="PopupVideo">
    <div
      class="video-wrapper"
      @mouseenter="store.toggleClass = 'CustomCursor--default'"
      @mouseleave="store.toggleClass = ''"
    >
      <transition name="preview">
        <img v-show="!isVideoLoaded" class="video-preview" :src="preview">
      </transition>
      <div id="player" class="player"></div>
    </div>
    <Close
        @click="emit('closePopup')"
        @mouseenter="store.toggleClass = 'CustomCursor--big'"
        @mouseleave="store.toggleClass = ''"
    />
  </div>
</template>

<script setup>
import { changesCursorState } from '@/stores/Cursor';
const store = changesCursorState();
const emit = defineEmits(['closePopup']);
const isVideoLoaded = ref(false);
const props = defineProps({
  link: {
    type: String,
    default: ''
  },
  preview: {
    type: String,
    default: ''
  }
});
const onPlayerReady = () => {
  isVideoLoaded.value = true;
};
const onYouTubeIframeAPIReady = () => {
  const playerYouTube = new YT.Player('player', {
    videoId: props.link,
    events: {
      'onReady': onPlayerReady,
    }
  });
}
onMounted(() => {
  if (!window.onYouTubeIframeAPIReady) {
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady();
  } else {
    window.onYouTubeIframeAPIReady();
  }
});
</script>

<style lang="scss">
.PopupVideo {
  @include d100;
  background-color: $main;
  z-index: 4;
  overflow: hidden;
  position: fixed;
  .preview-enter-active,
  .preview-leave-active {
    @include anim(1s, opacity);
  }
  .preview-enter-from,
  .preview-leave-to {
    opacity: 0;
  }
  .video-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 60rem;
    width: auto;
    aspect-ratio: 16 / 9;
    border: none;
    box-shadow: 0 0 3rem 1.5rem rgba(0, 0, 0, 0.25);
    .player {
      width: 100%;
      height: 100%;
    }
    .video-preview {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
