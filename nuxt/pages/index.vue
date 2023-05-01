<template>
  <div class="filter"></div>
  <video ref="video" class="video" :src="srcVideo" poster="/images/home/preview_video.jpg" playsinline loop muted></video>
<!--  <div>{{ homeData.data.attributes.aboutText }}</div>-->
  <intro
      :video-loaded="videoLoaded"
      @playVideo="video.play()"
  />
</template>

<script setup>
  const  config = useRuntimeConfig();
  const video = ref(null);
  const srcVideo = ref('');
  const { data: homeData } = await useFetch(`${config.API_URL}/api/glavnaya-stranicza`);
  let videoLoaded = ref(false);

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
</script>

<style lang="scss">
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.25);
  }
  .video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
