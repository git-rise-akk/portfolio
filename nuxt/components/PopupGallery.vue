<template>
  <div class="PopupGallery">
    <div class="controls">
      <div
        class="control-element control-element__left"
        @mouseenter="updateCursorState('CustomCursor--big', 'назад')"
        @click="changesCurrentPhoto(-1)"
      ></div>
      <div
        class="control-element control-element__right"
        @mouseenter="updateCursorState('CustomCursor--big CustomCursor--anim-text', 'вперёд')"
        @click="changesCurrentPhoto(1)"
      ></div>
    </div>
    <div class="photos">
      <template v-for="(photo, key) in photos" :key="`photo${key}`">
        <transition :name="getDynamicTransitionName">
          <div v-show="currentPhoto === key" class="photo-wrapper">
            <nuxt-img :src="photo" class="photo" loading="lazy" />
          </div>
        </transition>
      </template>
    </div>
    <div class="counter-photos">
      <div class="current-photo" :style="{ width: widthNumber }">
        <transition :name="getTransitionNameNumber">
          <div :key="currentPhoto" class="number">{{ currentPhoto + 1 }}</div>
        </transition>
      </div>
      <div class="separator">/</div>
      <div class="total-photos" :style="{ width: widthNumber }">{{ photos.length }}</div>
    </div>
    <Close
      @click="emit('closePopup')"
      @mouseenter="updateCursorState('CustomCursor--big', '')"
    />
  </div>
</template>

<script setup>
  import { changesCursorState } from '@/stores/Cursor';
  const store = changesCursorState();
  const currentPhoto = ref(0);
  const direction = ref(1);

  const props = defineProps({
    photos: {
      type: Array,
      default: []
    },
  });
  const emit = defineEmits(['closePopup']);
  const updateCursorState = (newClass, text) => {
    store.toggleClass = newClass;
    if (text === 'назад' && currentPhoto.value === 0) {
      store.text = '';
    } else if (text === 'вперёд' && currentPhoto.value === props.photos.length - 1) {
      store.text = '';
    } else {
      store.text = text;
    }
  };
  const changesCurrentPhoto = (number) => {
    direction.value = number;
    if (currentPhoto.value === 0 && number === -1) {
      currentPhoto.value = 0;
    } else if (currentPhoto.value === props.photos.length - 1 && number === 1) {
      currentPhoto.value = props.photos.length - 1;
    } else {
      currentPhoto.value = currentPhoto.value + number;
    }
  }
  const getDynamicTransitionName = computed(() => {
    return direction.value === 1 ? 'photo-left' : 'photo-right';
  });
  const getTransitionNameNumber = computed(() => {
    return direction.value === 1 ? 'number-next' : 'number-back';
  });
  const widthNumber = computed(() => {
    const numberCharacters = String(props.photos.length).length;
    if ( numberCharacters < 2) {
      return '5rem';
    } else if (numberCharacters >= 2 && numberCharacters < 3) {
      return '10rem';
    } else {
      return '15rem';
    }
  });

  const WatchEffect = watchEffect(() => {
        if (currentPhoto.value === 0) {
          updateCursorState('CustomCursor--big', '');
        } else if (currentPhoto.value === props.photos.length - 1) {
          updateCursorState('CustomCursor--big', '');
        }
    },
    {flush: 'post'}
  );
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
  position: fixed;
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
    height: 9rem;
    display: flex;
    align-items: center;
    font-family: Sverdlovsk, Arial, Helvetica, sans-serif;
    font-size: 9.6rem;
    .number-next-enter-active,
    .number-next-leave-active,
    .number-back-enter-active,
    .number-back-leave-active {
      @include anim(.5s, transform);
    }
    .number-next-enter-from,
    .number-back-leave-to {
      transform: translateY(100%);
    }
    .number-next-leave-to,
    .number-back-enter-from {
      transform: translateY(-100%);
    }
    .current-photo {
      position: relative;
      width: 5rem;
      height: 100%;
      overflow: hidden;
      .number {
        @include d100;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .total-photos {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .photos {
    position: relative;
    height: 100%;
    .photo-wrapper {
      @include d100;
      display: flex;
      align-items: center;
      justify-content: center;
      .photo {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .photo-left-enter-active,
  .photo-left-leave-active,
  .photo-right-enter-active,
  .photo-right-leave-active {
    @include anim(.7s, transform, opacity);
  }
  .photo-left-enter-from {
    transform: translateX(-100%);
    opacity: 0;
  }
  .photo-left-leave-to,
  .photo-right-leave-to {
    transform: translateX(0);
    opacity: 0;
  }
  .photo-right-enter-from {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
