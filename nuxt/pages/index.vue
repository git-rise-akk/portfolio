<template>
  <intro
    v-if="!store.hideIntro"
    :video-loaded="videoLoaded"
    @playVideo="callbackEndIntro"
  />
  <section
    class="section"
    @mouseenter="updateCursorState('CustomCursor--big', 'звук')"
    @click="switchesSound()"
  >
    <div class="filter"></div>
    <video ref="video" class="video" :src="srcVideo" poster="/images/home/preview_video.jpg" playsinline loop muted :autoplay="showAttrAutoplay"></video>
  </section>
<!--  <div>{{ homeData.data.attributes.aboutText }}</div>-->
  <section class="section section--about">
    <div class="filter-about"></div>
    <h1 class="title">Обо мне</h1>
    <div class="content">
      <div class="content__left" v-html="homeData.data.attributes.aboutText"></div>
      <div class="content__right">
        <img src="/images/home/preview_video.jpg" alt="photo">
        <img src="/images/home/preview_video.jpg" alt="photo">
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useIntroStore } from '@/stores/intro';
  import { changesCursorState } from '@/stores/Cursor';
  const store = useIntroStore();
  const storeCursor = changesCursorState();

  const config = useRuntimeConfig();
  const video = ref(null);
  const srcVideo = ref('');
  const { data: homeData } = await useFetch(`${config.API_URL}/api/glavnaya-stranicza?populate=*`);
  let videoLoaded = ref(false);
  const route = useRoute();
  const soundOn = ref(false);
  // const nuxtContext = useContext()

  const showAttrAutoplay = computed(() => {
    return store.hideIntro ? 'autoplay' : 'no';
  });

  function canplayEvent() {
        videoLoaded.value = true;
  }

  onMounted(() => {
    video.value.addEventListener('canplay', canplayEvent());
    srcVideo.value = '/video/index.mp4';
     // store.hideIntro = !!$nuxt.value.context.from;
    // route.beforeEach((to, from) => {
    //   console.log(to, from);
    // });
  });

  onBeforeUnmount(() => {
    video.value.addEventListener('canplay', canplayEvent());
    updateCursorState('', '');
  });

  const callbackEndIntro = () => {
    video.value.play();
    setTimeout(() => { store.hideIntro = true }, 1100);
  }

  const updateCursorState = (newClass, text) => {
    storeCursor.toggleClass = newClass;
    storeCursor.text = text;
  };

  const switchesSound = () => {
    soundOn.value = !soundOn.value;
    if(soundOn.value) {
      video.value.muted = false;
      updateCursorState('CustomCursor--big CustomCursor--click-on-value', 'без звука')
    } else {
      video.value.muted = true;
      updateCursorState('CustomCursor--big CustomCursor--click-off-value', 'звук')
    }
  }

</script>

<style lang="scss">
  .section {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &.section--about {
      top: 100%;
      display: none;
      transform: translateY(-100%);
      .filter-about {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        -webkit-backdrop-filter: blur(7.5px);
        backdrop-filter: blur(7.5px);
      }
      .title {
        margin-bottom: 10rem
      }
      .content {
        position: relative;
        margin-left: 8.3rem;
        display: flex;
        z-index: 1;
        font-size: 2.8rem;
      }
      img {
        width: 10rem;
      }
    }
  }
</style>
