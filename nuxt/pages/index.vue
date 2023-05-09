<template>
  <intro v-if="!store.hideIntro"
         :video-loaded="videoLoaded"
         @playVideo="callbackEndIntro"
  />
  <div class="filter"></div>
  <video ref="video" class="video" :src="srcVideo" poster="/images/home/preview_video.jpg" playsinline loop muted :autoplay="showAttrAutoplay"></video>
<!--  <div>{{ homeData.data.attributes.aboutText }}</div>-->
</template>

<script setup>
  import { useIntroStore } from '@/stores/intro';

  const store = useIntroStore();
  const  config = useRuntimeConfig();
  const video = ref(null);
  const hideIntro = ref(true);
  const srcVideo = ref('');
  const { data: homeData } = await useFetch(`${config.API_URL}/api/glavnaya-stranicza`);
  let videoLoaded = ref(false);

  const showAttrAutoplay = computed(() => {
    return store.hideIntro ? 'autoplay' : 'no';
  });

  function canplayEvent() {
        videoLoaded.value = true;
  }

  onMounted(() => {
    video.value.addEventListener('canplay', canplayEvent());
    srcVideo.value = '/video/index.mp4';
  });

  onBeforeUnmount(() => {
    video.value.addEventListener('canplay', canplayEvent());
  });

  const callbackEndIntro = () => {
    video.value.play();
    setTimeout(() => { store.hideIntro = true }, 1100);
  }
</script>

<style lang="scss">
  .video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
