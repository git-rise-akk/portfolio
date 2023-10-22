<template>
  <div class="page page-test" :class="{mobile: !$device.isDesktop}">
<!--    <template-page-->
<!--        :filterOpacity="0.1"-->
<!--        :titlePage="'TEST'"-->
<!--    >-->
<!--      <ul class="blocks">-->
<!--        <li v-for="(block, index) in blocks"-->
<!--            :key="`block-${index}`"-->
<!--            ref="block"-->
<!--            :class="[index % 2 === 0 ? 'block&#45;&#45;left' : 'block&#45;&#45;right', 'block']"-->
<!--        >-->
<!--          <div class="block__title">{{ block }}</div>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </template-page>-->
    <section class="section section--n1">1</section>
    <section class="section">2</section>
  </div>
</template>

<script setup>
const blocks = {
  1: 'Block 1',
  2: 'Block 2',
  3: 'Block 3',
  4: 'Block 4',
  5: 'Block 5',
  6: 'Block 6',
  7: 'Block 7',
  8: 'Block 8',
};
onMounted(() => {
});
</script>

<style lang="scss">
.page-test {
  .section {
    width: 100vw;
    height: 100vh;
    background: #ea6262;
    font-size: 10rem;
    text-align: center;
    &.section--n1 {
      background: #13bea0;
    }
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70vw;
    margin: 0 auto;
  }
  .blocks {
    width: 100%;
  }
  .block {
    min-width: 40rem;
    width: 40rem;
    min-height: 40rem;
    background: #d88181;
    margin-bottom: 5rem;
    font-size: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    //transform: translateX(calc((100vh - 100% + 100%) * -1));
    //opacity: 0;
    transform: translateY(50%);
    &--left {
      //transform: translateX(calc((100vw - 100% + 100%) * -1)) rotate(20deg);
    }
    &--right{
      margin-left: auto;
    }
  }
}
</style>
