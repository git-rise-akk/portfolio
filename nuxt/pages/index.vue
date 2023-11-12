<template>
  <div class="page home">
    <intro
        v-if="!store.hideIntro"
        :video-loaded="videoLoaded"
        @playVideo="callbackEndIntro"
    />
    <section
      class="section section--home"
      @mouseenter="updateCursorState('CustomCursor--big', 'звук')"
      @click="switchesSound()"
    >
      <div class="filter"></div>
      <video ref="video" :class="['video', {'video--animation': step === 1}]" :src="srcVideo" poster="/images/home/preview_video.jpg" playsinline loop muted></video>
      <div
        class="sound_wrapper"
        :class="{active: soundOn}"
      >
        <div class="line"></div>
        <nuxt-icon name="sound" filled />
      </div>
      <div class="scroll-down_wrapper">
        <nuxt-icon name="scroll" filled />
      </div>
    </section>
    <transition name="fake">
      <section
          ref="sectionAbout"
          class="section section--about"
          v-show="step === 1"
          @mouseenter="updateCursorState('', '')"
      >
        <div class="filter-about"></div>
        <h1 ref="title" class="title">Обо мне</h1>
        <div :class="['content', {'content--active': animationImg}]">
          <div class="content__left" v-html="formattedText(homeData.data.attributes.aboutText)"></div>
          <div class="content__right">
            <div class="about-images-one">
              <img :src="createsPathImage(0)" alt="photo">
            </div>
            <div class="about-images-two">
              <img :src="createsPathImage(1)" alt="photo">
            </div>
          </div>
        </div>
      </section>
    </transition>
  </div>
</template>

<script setup>
  import { useIntroStore } from '@/stores/intro';
  import { changesCursorState } from '@/stores/Cursor';
  import { toggleLetters } from '@/mixins/globalMixin.js';
  const lenis = inject('lenis');
  const store = useIntroStore();
  const storeCursor = changesCursorState();
  const config = useRuntimeConfig();
  const video = ref(null);
  const srcVideo = ref('');
  const { data: homeData } = await useFetch(`${config.public.API_URL}/api/glavnaya-stranicza?populate=*`);
  let videoLoaded = ref(false);
  const route = useRoute();
  const soundOn = ref(false);
  const sectionAbout = ref(null);
  const step = ref(0);
  const title = ref(null);
  const animationImg = ref(false);
  const router = useRouter()

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
    return config.public.API_URL + homeData.value.data.attributes.aboutImages.data[index].attributes.url;
  }

  const changesStep = (direction) => {
    if (lenis.lenis.value.animatedScroll === 0 && direction === 1) {
      step.value = 1;
    } else
    if( lenis.lenis.value.animatedScroll === 0 && direction === -1) {
      step.value = 2;
    }
  }

  watch(() => step.value, (newStep, oldStep) => {
    if (newStep === 1) {
      lenis.lenis.value.stop();
      setTimeout(() => {
        lenis.lenis.value.start();
        lenis.lenis.value.resize();
      }, 1000);
      setTimeout(() => { page_title?.toggle(true); }, 500);
      setTimeout(() => { animationImg.value = true; }, 0);
      router.push({ query: { section: 'about' }, });
    } else {
      setTimeout(() => { page_title?.toggle(false); }, 500);
      setTimeout(() => { animationImg.value = false; }, 0);
      router.push({ query: {}, });
    }
  });
  let page_title;
  onMounted(() => {
    lenis.lenis.value.start();
    video.value.addEventListener('canplay', canplayEvent());
    srcVideo.value = '/video/index.mp4';
    const html = document.querySelector('html');
    html.addEventListener('wheel', (e) => {
      const direction = e.deltaY / 100;
      changesStep(direction);
    });

    if (router.currentRoute.value.query.section === 'about') {
      step.value = 1;
    }

    page_title = new toggleLetters({
      duration: 500,
      frame: title.value,
    })

    console.log(showAttrAutoplay.value)
  });

  onBeforeUnmount(() => {
    video.value.addEventListener('canplay', canplayEvent());
    updateCursorState('', '');
  });

  const callbackEndIntro = () => {
    console.log('play');
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
</script>

<style lang="scss">
.home {
  .fake-enter-active,
  .fake-leave-active {
    transition: transform 1.5s cubic-bezier(0.33, 1, 0.68, 1);
  }

  .fake-enter-from,
  .fake-leave-to {
    transform: translateY(100%);
  }
  .section {
    position: relative;
    width: 100vw;
    .filter {
      z-index: 1;
    }
    .video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      @include anim(1.2s, transform);
      &--animation {
        transform: scale(1.2);
      }
    }
    &.section--home {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      z-index: 1;
    }
    &.section--fake {
      position: absolute;
      height: 101vh;
      width: 100%;
      z-index: 2;
    }
    .sound_wrapper {
      position: absolute;
      right: 6.3rem;
      bottom: 4.3rem;
      width: 2.5rem;
      height: 2.5rem;
      padding: 2rem;
      z-index: 1;
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
    .scroll-down_wrapper {
      position: absolute;
      bottom: 4.3rem;
      left: 50%;
      transform: translateX(-50%);
      animation: animation-up-down 1.5s linear infinite alternate;
      z-index: 1;
      svg {
        margin-bottom: 0;
        vertical-align: initial;
        font-size: 4rem;
      }
    }
    &.section--about {
      z-index: 2;
      .filter-about {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        -webkit-backdrop-filter: blur(7.5px);
        backdrop-filter: blur(7.5px);
      }
      .title {
        padding-top: 22.2rem;
        margin-bottom: 14.4rem
      }
      .content {
        position: relative;
        margin-left: 8.3rem;
        display: flex;
        justify-content: space-between;
        z-index: 1;
        font-size: 2.5rem;
        padding-bottom: 10rem;
        &--active {
          .content__right {
            .about-images-two {
              transform: translateX(0);
              opacity: 1;
            }
            img {
              transform: scale(1);
            }
          }
          .content__left {
            opacity: 1;
            transform: translateY(0);
          }
        }
        &__left {
          width: 40%;
          max-width: 70rem;
          opacity: 0;
          transform: translateY(30%);
          transition: transform 1s .6s, opacity 1s .6s;
        }
        &__right {
          position: relative;
          width: 49%;
          img {
            height: 100%;
            width: auto;
            transform: scale(1.2);
            transition: transform .7s .5s;
          }
          .about-images-one {
            position: absolute;
            top: 25rem;
            left: 0;
            height: 39.2rem;
            z-index: 1;
            overflow: hidden;
          }
          .about-images-two {
            position: absolute;
            top: -18.8rem;
            left: 23.6rem;
            height: 92.5rem;
            opacity: 0;
            transform: translateX(80%);
            @include anim(1.5s, opacity, transform);
            overflow: hidden;
          }
        }
      }
      img {
        width: 10rem;
      }
    }
  }
}
</style>
