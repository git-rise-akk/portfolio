<template>
  <div class="filter" :style="{ background: `rgba(0, 0, 0, ${filterOpacity})`}"></div>
  <div class="bg-image" :style="{ backgroundImage: 'url(' + bgImage + ')'}"></div>
  <scroll>
    <h1 class="title">{{ titlePage }}</h1>
    <div class="content">
      <slot></slot>
    </div>
  </scroll>
</template>

<script>
export default {
  props: {
    filterOpacity: {
      type: Number,
      default: 0.25
    },
    bgImage: {
      type: String,
      default: '/images/intro/intro.jpg'
    },
    titlePage: {
      type: String,
      default: 'Название раздела'
    }
  },
}
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
  .content {
    position: relative;
    z-index: 1;
    overflow-y: scroll;
    overflow: hidden;
  }
</style>
