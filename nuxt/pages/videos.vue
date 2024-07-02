<template>
  <div ref="root" class="page page-videos" :class="{mobile: !$device.isDesktop}">
    <template-page
        :filterOpacity="0.1"
        :bg-video="[createsPathBackground('video'), createsPathBackground('image')]"
        :titlePage="'Видео'"
    >
      <ul class="videos">
        <li v-for="(video, index) in videosData.data.attributes.videos"
            :key="`video-${index}`"
            ref="video"
            :class="[index % 2 === 0 ? 'video--left' : 'video--right', 'video']"
            @click="evenOpenPopup(index)"
            @mouseenter="changesState(true, index, 'CustomCursor--big', 'смотреть')"
            @mouseleave="changesState(false, index, '', '')"
        >
          <div class="video__cover" :class="getClass(index)">
            <div class="preview-wrapper">
              <img class="preview" :src="createsPathPreview(index, 'preview')"/>
              <video
                  ref="videoClip"
                  class="video-clip"
                  :src="createsPathPreview(index, 'video')"
                  playsinline
                  loop
                  muted
              >
              </video>
            </div>
            <div class="shadow"></div>
            <div class="cover-filter"></div>
            <div ref="loadingLine" class="loading-line"></div>
          </div>
          <div class="video__title" v-html="replaceAmpersand(video.title)"></div>
        </li>
      </ul>
    </template-page>
    <transition appear name="popup-fade">
      <PopupVideo
          v-if="openPopup"
          @closePopup="openPopup = !openPopup"
          :link="linkVideo"
          :preview="previewVideoPopup"
      />
    </transition>
  </div>
</template>

<script setup>
import { changesCursorState } from '@/stores/Cursor';
import Lenis from "@studio-freight/lenis";
const { isDesktop } = useDevice();
const store = changesCursorState();
const video = ref(null);
const videoClip = ref(null);
const loadingLine = ref(null);
const linkVideo = ref('');
const previewVideoPopup = ref('');
const config = useRuntimeConfig();
const openPopup = ref(false);
const root = ref(null);
const { data: backgroundData } = await useFetch(`${config.public.API_URL}/api/video?populate[backgroundVideo][populate]=*`);
const { data: videosData } = await useFetch(`${config.public.API_URL}/api/video?populate[videos][populate]=*`);

const createsPathBackground = (type) => {
  return config.public.API_URL + backgroundData.value.data.attributes.backgroundVideo[type].data.attributes.url;
}
const createsPathPreview = (index, type) => {
  return config.public.API_URL + videosData.value.data.attributes.videos[index][type].data.attributes.url;
}
const getClass = (index) => {
  const classNames = ['n0', 'n1', 'n2', 'n3', 'n4'];
  const classNameIndex = index % classNames.length;
  return classNames[classNameIndex];
}
const replaceAmpersand = (input) => {
  return input.replace(/&/g, '<br />');
}

const changesState = (state, index, newClass, text) => {
  if (isDesktop) {
    if  (state) {
      loadingLine.value[index].classList.add('loading-line--active');
      setTimeout(() => {
        videoClip.value[index].play();
      }, 1000);
      store.toggleClass = newClass;
      store.text = text;
    } else {
      loadingLine.value[index].classList.remove('loading-line--active');
      videoClip.value[index].pause();
      store.toggleClass = newClass;
      store.text = text;
    }
  }
}
const evenOpenPopup = (index) => {
  linkVideo.value = videosData.value.data.attributes.videos[index].link;
  previewVideoPopup.value = createsPathPreview(index, 'previewPopup');
  openPopup.value = !openPopup.value
  store.small = true;
}

onMounted(() => {
  const lenis = new Lenis({
    wrapper: root.value,
    content: root.value.querySelector('.scroll-content')
  });

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        rootMargin: '0px 0px 110px 0px',
        threshold: 0.5,
      }
  );

  if (video.value) {
    video.value.forEach((el) => observer.observe(el))
  }

  // lenis.lenis.value.resize();
});
</script>

<style lang="scss">
.page-videos {
  .popup-fade-enter-active,
  .popup-fade-leave-active {
    @include anim(.7s, opacity, transform);
  }
  .popup-fade-enter-from,
  .popup-fade-leave-to {
    transform: scale(.9);
    opacity: 0;
  }
  .content {
    padding: 0 29rem;
    .videos {
      padding-bottom: 10rem;
      .video {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 10rem;
        width: fit-content;
        cursor: pointer;
        opacity: 0;
        transition: 0.8s opacity linear;
        //animation: offset ease;
        //animation-timeline: view(block);
        //animation-range: cover 0% cover 100%;
        &:first-child {
          transition: 0.8s opacity linear .6s;
          .preview,
          .video-clip {
            transition: 1s transform .6s;
          }
        }
        //transition: 0.8s transform linear, 0.8s opacity linear;
        //&:first-child {
        //  transition: 0.9s transform linear .5s;
        //}
        //&--left {
        //  transform-origin: top right;
        //  transform: translateX(calc(-100% - 30.5rem)) rotate(20deg);
        //}
        //&--right {
        //  transform-origin: top left;
        //  transform: translateX(calc(100% + 30.5rem)) rotate(-20deg);
        //}

        .loading-line {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: #fff;
          @include anim(1s, width);
          &--active {
            width: 100%;
          }
        }
        &.visible {
          opacity: 1;
          .video__cover .preview,
          .video__cover .video-clip {
            transform: scale(1);
          }
        }
        &:nth-child(2n) {
          margin-left: auto;
        }
        &__cover {
          position: relative;
          width: 100%;
          height: 100%;
          .preview-wrapper {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            .preview,
            .video-clip {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              transform: scale(1.2);
              @include anim(1s, transform);
            }
          }
          &.n0 {
            width: 89.1rem;
            height: 50.3rem;
          }
          &.n1 {
            width: 70.6rem;
            height: 39.8rem;
          }
          &.n2 {
            width: 105.2rem;
            height: 59.2rem;
          }
          &.n3 {
            width: 89.5rem;
            height: 50.3rem;
          }
          &.n4 {
            width: 70.6rem;
            height: 39.8rem;
          }
          .shadow {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 3rem 1.5rem rgba(0, 0, 0, 0.25);
          }
        }
        &__title {
          font-size: 2.4rem;
          font-weight: bold;
          margin-top: 5.4rem;
        }

        @keyframes offset {
          from { transform: translateY(0); }
          to { transform: translateY(-30%); }
        }
      }
    }
  }
  &.mobile {
    .title {
      padding: 26.3rem 0 29.3rem;
    }
    .content {
      padding: 0;
      margin: 0 8.3rem;
      .video {
        width: 100%;
        .video__cover {
          &.n0,
          &.n1,
          &.n2,
          &.n3,
          &.n4 {
            aspect-ratio: 16/9;
            width: 100%;
            height: auto;
          }
        }
        .video__title {
          font-size: 3rem;
        }
        &:nth-child(2) {
          transition: 0.8s opacity linear 1.2s;
          .preview {
            transition: .4s opacity, .4s visibility, 1s transform 1.2s;
          }
        }
      }
    }
  }
}
</style>
