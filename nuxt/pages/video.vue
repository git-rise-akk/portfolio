<template>
  <h1 class="title">Видео</h1>
  <video class="video" src="/video/video.mp4" poster="/images/home/preview_video.jpg" playsinline loop muted autoplay></video>
</template>

<style lang="scss">
  .video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
