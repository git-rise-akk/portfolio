<template>
  <div class="Intro" :class="{ hidden : introHide}">
    <div class="photos" :style="{ backgroundImage: 'url(' + imageSrc + ')'}"></div>
    <div class="filter"></div>
    <div class="content">
      <div class="name">Ольга Сычева</div>
      <div class="subtitle">девочка с голосом<br />«как из кино»</div>
      <div class="loading"><span>{{ loadingPercentage }} %</span></div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    videoLoaded: {
      type: Boolean,
      default: false
    }
  });
  const emit = defineEmits(['playVideo']);

  const config = useRuntimeConfig();
  const loadingPercentage = ref(0);
  const introHide = ref(false);
  let timeLoading = 45;

  setTimeout(() => {
    timeLoading =  props.videoLoaded ? timeLoading : 70;
  }, 0);

  const { data: introData } = await useFetch(`${config.API_URL}/api/intro?populate=*`);

  const imageSrc = computed(() => {
    return config.API_URL + introData.value.data.attributes.image.data.attributes.url;
  });

  let stopWatchEffect = watchEffect(() => {
    if (loadingPercentage.value !== 100) {
      setTimeout(() => {
        loadingPercentage.value += 1;
      }, timeLoading.value);
    } else  {
      emit('playVideo');
      introHide.value = true;
      stopWatchEffect();
    }
  },
{flush: 'post'}
  );

  // if (value !== 100) {
  //   if(!this.videoLoaded && this.loadingPercentage === 98) {
  //     this.clearTimeout.clearTimeout();
  //   } else {
  //     this.clearTimeout = setTimeout(() => {
  //       this.loadingPercentage += 1;
  //     }, this.timeLoading);
  //   }
  //
  // } else {
  //   this.introHide = true;
  //   this.$emit('playVideo');
  // }
</script>

<style lang="scss">
.Intro {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  transition: transform 1s cubic-bezier(0.65, 0.05, 0.36, 1);
  .photos {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .filter {
    background: rgba(0, 0, 0, 0.45);
  }
  .content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .name {
      font-family: Sverdlovsk, Arial, Helvetica, sans-serif;
      font-size: 12.8rem;
    }
    .subtitle {
      margin-top: 0.9rem;
      text-align: center;
      font-size: 2.8rem;
    }
    .loading {
      width: 10rem;
      height: 10rem;
      margin-top: 4.5rem;
      border: 1px solid #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
    }
  }
  &.hidden {
    transform: translateY(-100%);
  }
}
</style>
