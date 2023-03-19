<template>
  <video ref="homeVideo" class="homeVideo" src="/video/index.mp4" poster="/images/home/preview_video.jpg" loop autoplay muted></video>
  <intro />
</template>

<script>
export default {
  data() {
    return {
      introHide: false
    }
  },
  mounted() {
    // this.$refs.homeVideo.oncanplaythrough = () => {
    //   console.log('Загрузилось');
    //   this.introHide = true;
    // }

    // setTimeout(() => {
    //   this.introHide = true;
    // }, 500);
  },
}
</script>

<style lang="scss">
  .homeVideo {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
