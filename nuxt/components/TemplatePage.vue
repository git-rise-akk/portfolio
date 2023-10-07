<template>
  <div class="filter" :style="{ background: `rgba(0, 0, 0, ${filterOpacity})`}"></div>
  <div v-if="bgImage" class="bg-image" :style="{ backgroundImage: 'url(' + bgImage + ')'}"></div>
  <video v-if="bgVideo" class="bg-video" :src="bgVideo[0]" :poster="bgVideo[1]" playsinline loop muted autoplay></video>
  <Scroll>
    <h1 ref="title" class="title">{{ titlePage }}</h1>
    <div class="content">
      <slot></slot>
    </div>
  </Scroll>
</template>

<script setup>
  import { toggleLetters } from '@/mixins/globalMixin.js';
  const title = ref(null);
  const props = defineProps({
    filterOpacity: {
      type: Number,
      default: 0.25
    },
    bgImage: {
      type: String,
      default: undefined
    },
    bgVideo: {
      type: Array,
      default: undefined
    },
    titlePage: {
      type: String,
      default: 'Название раздела'
    }
  });
  let page_title;
  onMounted(() => {
    page_title = new toggleLetters({
      duration: 500,
      frame: title.value,
    })
  });
  setTimeout(() => {
    page_title.toggle(true);
  }, 500);
</script>

<style lang="scss" scoped>
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.25);
  }
  .title {
    position: relative;
    padding-top: 26.3rem;
    text-align: center;
    z-index: 1;
    margin-bottom: 10rem;
  }
  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .bg-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .scroll__wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .scroll__content {
      position: relative;
    }
  }
  .content {
    position: relative;
    z-index: 1;
  }
</style>
