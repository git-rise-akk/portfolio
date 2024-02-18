<template>
  <div class="Intro" :class="[{ hidden : introHide}, { mobile: !$device.isDesktop }]">
    <div class="photos" :style="{ backgroundImage: 'url(' + imageSrc + ')'}"></div>
    <div class="filter"></div>
    <div class="content">
      <div ref="name" class="name">Ольга Сычева</div>
      <div ref="subtitle" class="subtitle">девочка с голосом<br />«как из кино»</div>
      <div class="loading" :class="{visible: loadingActive}"><span>{{ loadingPercentage }} %</span></div>
    </div>
  </div>
</template>

<script setup>
  import { toggleLetters } from '@/mixins/globalMixin.js';
  const props = defineProps({
    videoLoaded: {
      type: Boolean,
      default: false
    }
  });
  const emit = defineEmits(['playVideo']);
  const config = useRuntimeConfig();
  const { data: introData } = await useFetch(`${config.public.API_URL}/api/intro?populate=*`);
  const loadingPercentage = ref(0);
  const introHide = ref(false);
  const timeLoading = ref(5);
  const name = ref(null);
  const subtitle = ref(null);
  const page_title = ref(null);
  const page_text = ref(null);
  const loadingActive = ref(false);

  setTimeout(() => {
    timeLoading.value =  props.videoLoaded ? timeLoading.value : 5;
  }, 0);

  const imageSrc = computed(() => {
    return config.public.API_URL + introData.value.data.attributes.image.data.attributes.url;
  });

  onMounted(() => {
    page_title.value = new toggleLetters({
      duration: 1000,
      frame: name.value,
    })

    page_text.value = new toggleLetters({
      duration: 1000,
      frame: subtitle.value,
    });

  });

  setTimeout(() => {
    page_title.value?.toggle(true, () => {
      page_text.value?.toggle(true, () => {
        loadingActive.value = true;
        setTimeout(() => {
          loadingPercentage.value = 1;
        }, 700);
      });
    });
  }, 100);

  watch(() => loadingPercentage.value, (newValue, oldValue) => {
    if (newValue !== 100) {
      setTimeout(() => {
        loadingPercentage.value += 1;
      }, timeLoading.value);
    } else  {
      emit('playVideo');
      introHide.value  = true;
    }
  });
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
    background-position: center;
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
      border: 2px solid #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      opacity: 0;
      @include anim(.5s, opacity);
      &.visible {
        opacity: 1;
      }
    }
  }
  &.hidden {
    transform: translateY(-100%);
  }
  &.mobile {
    .loading {
      width: 13rem;
      height: 13rem;
      font-size: 3rem;
    }
  }
}
</style>
