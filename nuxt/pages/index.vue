<template>
  <div class="page home" @wheel="scrollEvent">
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
      <div
        class="sound_wrapper"
        :class="{active: soundOn}"
      >
        <div class="line"></div>
        <nuxt-icon name="sound" filled />
      </div>
    </section>
    <transition name="about">
      <section
        v-show="aboutActive"
        class="section section--about"
        @mouseenter="updateCursorState('', '')"
      >
        <scroll>
          <div class="filter-about"></div>
          <h1 class="title">Обо мне</h1>
          <div class="content">
            <div class="content__left" v-html="formattedText(homeData.data.attributes.aboutText)"></div>
            <div class="content__right">
              <img class="about-images-one" :src="createsPathImage(0)" alt="photo">
              <img class="about-images-two" :src="createsPathImage(1)" alt="photo">
            </div>
          </div>
        </scroll>
      </section>
    </transition>
  </div>
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
  let direction = ref(0);
  const aboutActive = ref(false);

  const showAttrAutoplay = computed(() => {
    return store.hideIntro ? 'autoplay' : 'no';
  });

  function canplayEvent() {
      videoLoaded.value = true;
  }

  const formattedText = (text) => {
    return text.replace(/\n/g, '<br>');
  };

  const createsPathImage = (index) => {
    return config.API_URL + homeData.value.data.attributes.aboutImages.data[index].attributes.url;
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
    if (video.value) {
      video.value.play();
    }
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
      storeCursor.small = true;
      updateCursorState('CustomCursor--big', 'без звука')
    } else {
      video.value.muted = true;
      storeCursor.small = true;
      updateCursorState('CustomCursor--big', 'звук')
    }
  }
  const scrollEvent = (e) => {
    if (e.deltaY > 0) {
      direction.value = 1;
    } else
    if (e.deltaY < 0) {
      direction.value = -1;
    }
  };

  watch(() => direction.value, (newValue, oldValue) => {
    if (newValue === 1) {
      aboutActive.value = true;
    } else  {
      aboutActive.value = false;
    }
  });
</script>

<style lang="scss">
.home {
  .section {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .filter {
      z-index: initial;
    }
    .video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &.section--about {
      .Scroll {
        overflow-x: hidden;
      }
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
        justify-content: space-between;
        z-index: 1;
        font-size: 2.8rem;
        padding-bottom: 20rem;
        &__left {
          width: 40%;
        }
        &__right {
          position: relative;
          width: 49%;
          img {
            width: auto;
          }
          .about-images-one {
            position: absolute;
            top: 34.5rem;
            left: 0;
            height: 39.2rem;
            z-index: 1;
          }
          .about-images-two {
            position: absolute;
            top: 0;
            left: 23.6rem;
            height: 92.5rem;
          }
        }
      }
      img {
        width: 10rem;
      }
    }
    .sound_wrapper {
      position: absolute;
      right: 6.3rem;
      bottom: 4.3rem;
      width: 2.5rem;
      height: 2.5rem;
      padding: 2rem;
      .nuxt-icon {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 2.5rem;
        svg {
          margin-bottom: 0;
          vertical-align: initial;
        }
      }
      .line {
        position: absolute;
        top: -3px;
        left: -1px;
        width:4rem;
        height: 2px;
        background: #fff;
        transform: rotate(45deg);
        transition: width 0.3s ease;
        transform-origin: left;
        @include anim(.3s, width);
      }
      &.active {
        .line {
          width: 0;
        }
      }
    }
  }
  .about-enter-active,
  .about-leave-active {
    @include anim(1s, transform, linear);
  }
  .about-enter-from,
  .about-leave-to {
    transform: translateY(100%);
  }
}
</style>
