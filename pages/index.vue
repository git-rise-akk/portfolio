<template>
  <video ref="video" class="video" :src="srcVideo" poster="/images/home/preview_video.jpg" playsinline loop muted></video>
  <intro
      :video-loaded="videoLoaded"
      @playVideo="this.$refs.video.play()"
  />
</template>

<script>
export default {
  data() {
    return {
      videoLoaded: false,
      srcVideo: '',
    }
  },
  mounted() {
    this.$refs.video.addEventListener('canplay', this.canplayEvent);
    this.srcVideo = '/video/index.mp4';
  },
  beforeUnmount() {
    this.$refs.video.removeEventListener('canplay', this.canplayEvent);
  },
  methods: {
    canplayEvent() {
      this.videoLoaded = true;
    },
  }
}
</script>

<style lang="scss">
  .video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
