<template>
  <div class="page photos">
    <template-page
        :filterOpacity="0.55"
        :bgImage="imageSrc"
        :titlePage="'Фото'"
    >
      <ul class="albums">
        <li v-for="(album, index) in photosData.data.attributes.albums"
           :key="`album-${index}`"
           class="album"
        >
          <div class="album__cover" :class="{'album__cover--min': shouldAddClass(index) || index === 0}" >
            <img class="preview" :src="createsPathImage(index)" />
            <div class="cover-filter"></div>
          </div>
          <div class="album__date">{{ album.date }}</div>
          <div class="album__city">{{ album.city }}</div>
        </li>
      </ul>
    </template-page>
  </div>
</template>

<script setup>
  const  config = useRuntimeConfig();
  const { data: photosData } = await useFetch(`${config.API_URL}/api/foto?populate=*`);
  const { data: previewData } = await useFetch(`${config.API_URL}/api/foto?populate[albums][populate]=*`);
  const imageSrc = computed(() => {
    return config.API_URL + photosData.value.data.attributes.image.data.attributes.url;
  });
  const shouldAddClass = (index) => {
    return index > 0 && ((index - 1) % 4 === 2 || (index - 1) % 4 === 3);
  }
  const createsPathImage = (index) => {
    return config.API_URL + previewData.value.data.attributes.albums[index].preview.data.attributes.url;
  }
</script>

<style lang="scss">
.photos {
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
      margin-bottom: 10rem;
      .album {
        height: 47.1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
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
}
</style>
