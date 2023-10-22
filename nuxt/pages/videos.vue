<template>
  <div class="page page-videos" :class="{mobile: !$device.isDesktop}">
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
              <img class="preview-bg" :src="createsPathPreview(index, 'preview')"/>
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
const store = changesCursorState();
const video = ref(null);
const videoClip = ref(null);
const linkVideo = ref('');
const previewVideoPopup = ref('');
const config = useRuntimeConfig();
const openPopup = ref(false);
const { data: backgroundData } = await useFetch(`${config.API_URL}/api/video?populate[backgroundVideo][populate]=*`);
const { data: videosData } = await useFetch(`${config.API_URL}/api/video?populate[videos][populate]=*`);
const createsPathBackground = (type) => {
  return config.API_URL + backgroundData.value.data.attributes.backgroundVideo[type].data.attributes.url;
}
const createsPathPreview = (index, type) => {
  return config.API_URL + videosData.value.data.attributes.videos[index][type].data.attributes.url;
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
  if  (state) {
    video.value[index].classList.add('video--play-video');
    videoClip.value[index].currentTime = 0;
    videoClip.value[index].play();
    store.toggleClass = newClass;
    store.text = text;
  } else {
    video.value[index].classList.remove('video--play-video');
    store.toggleClass = newClass;
    store.text = text;
  }
}
const evenOpenPopup = (index) => {
  linkVideo.value = videosData.value.data.attributes.videos[index].link;
  previewVideoPopup.value = createsPathPreview(index, 'previewPopup');
  openPopup.value = !openPopup.value
  store.small = true;
}
onMounted(() => {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
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
        //margin-top: 5rem;
        margin-top: 10rem;
        width: fit-content;
        cursor: pointer;
        //transform: translateY(30%);
        //opacity: 0;
        //&--left {
        //  transform: translateX(calc((100vw - 100% + 100%) * -1)) rotate(20deg);
        //}
        //&--right{
        //  transform: translateX(calc((100vw - 100% + 100%) * 1)) rotate(-20deg);
        //}
        &:first-child {
          margin-top: 0;
        }
        &:nth-child(2n) {
          margin-left: auto;
        }
        &.video--play-video {
          .video__cover .preview-wrapper{
            .preview {
              opacity: 0;
              visibility: hidden;
              transition: 1s opacity, 1s visibility;
            }
            .video-clip {
              opacity: 1;
              visibility: visible;
              transition: .4s opacity, .4s visibility;
            }
          }
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
            .video-clip,
            .preview-bg {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .preview {
              opacity: 1;
              visibility: visible;
              transition: .4s opacity, .4s visibility;
            }
            .video-clip {
              opacity: 0;
              visibility: hidden;
              transition: 1s opacity, 1s visibility;
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
      }
    }
  }
  &.mobile {
    .content {
      margin: 0 8.3rem;
      .video {
        width: 100%;
        .video__cover {
          &.n0,
          &.n1,
          &.n2,
          &.n3,
          &.n4 {
            aspect-ratio: 16 / 9;
            width: 100%;
            height: auto;
          }
        }
        .video__title {
          font-size: 3rem;
        }
      }
    }
  }
}
</style>
