<template>
  <div class="Intro" :class="{ hidden : introShow}">
    <div class="photos"></div>
    <div class="filter"></div>
    <div class="content">
      <div class="name">Ольга Сычева</div>
<!--      <div class="subtitle">девочка с голосом<br />«как из кино»</div>-->
      <div class="loading"><span>{{ loadingPercentage }} %</span></div>
    </div>
  </div>
</template>

<script>
  export default {
    // props: {
    //   introShow: {
    //     type: Boolean,
    //     default: false,
    //   },
    // },
    data() {
      return {
        loadingPercentage: 0,
        introShow: false,
      }
    },
    watch: {
      loadingPercentage: {
        handler(value) {
          if (value !== 100) {
            setTimeout(() => {
              this.loadingPercentage += 1;
            }, 50);
          } else {
            this.introShow = true;
          }
        },
        immediate: true,
      },
    },
    methods: {
    }
  }
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
  transition: transform .8s ease-in-out;
  .photos {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/images/intro/intro.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    width: 100%;
    height: 100%;
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
