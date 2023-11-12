<template>
  <div class="page photos" :class="{mobile: !$device.isDesktop}">
    <template-page
        :filterOpacity="0.55"
        :bgImage="imageSrc"
        :titlePage="'Фото'"
    >
      <ul class="albums">
        <li v-for="(album, index) in photosData.data.attributes.albums"
            :key="`album-${index}`"
            :class="[index % 2 === 0 ? 'album--left' : 'album--right', 'album']"
            @click="evenOpenPopup(index)"
            @mouseenter="updateCursorState('CustomCursor--big', 'смотреть')"
            @mouseleave="updateCursorState('', '')"
        >
          <div class="album__cover" :class="{'album__cover--min': shouldAddClass(index) || index === 0}" >
            <div class="shadow"></div>
            <img class="preview" :src="createsPathImage(index)" />
            <div class="cover-filter"></div>
          </div>
          <div class="album__date">{{ album.date }}</div>
          <div class="album__city">{{ album.city }}</div>
        </li>
      </ul>
    </template-page>
    <transition appear name="popup-fade">
      <PopupGallery
          @closePopup="openPopup = !openPopup"
          v-if="openPopup"
          :photos="photosGallery"
      />
    </transition>
  </div>
</template>

<script setup>
  import { changesCursorState } from '@/stores/Cursor';
  const store = changesCursorState();
  const config = useRuntimeConfig();
  const openPopup = ref(false);
  const photosGallery= ref([]);
  const { data: photosData } = await useFetch(`${config.public.API_URL}/api/foto?populate=*`);
  const { data: albumData } = await useFetch(`${config.public.API_URL}/api/foto?populate[albums][populate]=*`);
  const imageSrc = computed(() => {
    return config.public.API_URL + photosData.value.data.attributes.image.data.attributes.url;
  });
  const shouldAddClass = (index) => {
    return index > 0 && ((index - 1) % 4 === 2 || (index - 1) % 4 === 3);
  }

  const createsPathImage = (index) => {
    return config.public.API_URL + albumData.value.data.attributes.albums[index].preview.data.attributes.url;
  }

  const createsArrayPhotos = (index) => {
    photosGallery.value = [];
    (albumData.value.data.attributes.albums[index].photos.data).forEach((item, index) => {
      photosGallery.value.push(config.public.API_URL + item.attributes.url);
    })
  };

  const evenOpenPopup = (index) => {
    openPopup.value = !openPopup.value
    createsArrayPhotos(index);
    store.small = true;
  }
  const updateCursorState = (newClass, text) => {
    store.toggleClass = newClass;
    store.text = text;
  };
</script>

<style lang="scss">
.photos {
  .popup-fade-enter-active,
  .popup-fade-leave-active {
    @include anim(.7s, opacity, transform);
  }
  .popup-fade-enter-from,
  .popup-fade-leave-to {
    transform: scale(.9);
    opacity: 0;
  }
  .filter {
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
  }
  .content {
    margin: 0 29rem;
    .albums {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      row-gap: 9.3rem;
      column-gap: 8.6rem;
      padding-bottom: 10rem;
      .album {
        height: 47.1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
        //opacity: 0;
        //&--left {
        //  transform: translateX(calc((100vw - 100% + 100%) * -1)) rotate(20deg);
        //}
        //&--right{
        //  transform: translateX(calc((100vw - 100% + 100%) * 1)) rotate(-20deg);
        //}
        &:hover {
          .preview {
            transform: scale(1.1);
          }
          .cover-filter {
            background-color: rgba(0, 0, 0, 0);
          }
          .album__city:after {
            width: 100%;
          }
        }
        &__cover {
          position: relative;
          width: 100%;
          height: 38.5rem;
          overflow: hidden;
          .shadow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            box-shadow: 0 0 3rem 1.5rem rgba(0, 0, 0, 0.25);
          }
          &--min {
            height: 36rem;
            margin-top: 2.5rem;
          }
          .preview {
            object-fit: cover;
            height: 100%;
            width: 100%;
            transition: transform 1s;
            will-change: transform;
          }
          .cover-filter {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.4);
            //@include anim(0.3, background-color);
            transition: background-color .5s;
          }
        }
        &__date {
          font-size: 2rem;
        }
        &__city {
          position: relative;
          width: fit-content;
          font-size: 2.4rem;
          text-transform: uppercase;
          font-weight: bold;
          &:after {
            content: '';
            position: absolute;
            background: #fff;
            height: 1px;
            width: 0;
            left: 0;
            bottom: -3px;
            transition: width .7s;
          }
        }
      }
    }
  }
  &.mobile {
    .content {
      margin: 0 8.3rem;
      .albums {
        display: block;
        .album {
          margin-top: 12rem;
          height: 68rem;
          .album__cover {
            margin-top: 0;
            height: 55rem;
          }
          .album__date {
            font-size: 3rem;
          }
          .album__city {
            font-size: 3.4rem;
          }
          &:first-child {
            margin-top: 0;
          }
        }
      }
    }
  }
}
</style>
