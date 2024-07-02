<template>
  <div ref="root" class="page page-test" :class="{mobile: !$device.isDesktop}">
    <template-page
        :filterOpacity="0.1"
        :titlePage="'TEST'"
    >
      <ul class="blocks">
        <li v-for="(block, index) in blocks"
            :key="`block-${index}`"
            ref="block"
            :class="[index % 2 === 0 ? 'block--left' : 'block--right', 'block']"
        >
          <div class="block__title">{{ block }}</div>
        </li>
      </ul>
    </template-page>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from "@studio-freight/lenis";
const root = ref(null);
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
const block = ref(null);
onMounted(() => {
  const lenis = new Lenis({
    wrapper: root.value,
    content: root.value.querySelector('.scroll-content')
  });

  gsap.registerPlugin(ScrollTrigger);

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const sections = gsap.utils.toArray('.block');
  sections.forEach((block, index) => {
    gsap.to(block, {
      y: '40%',
      duration: 0.2,
      scrollTrigger: {
        trigger: block,
        start: 'top 90%',
        scroller: '.page.page-test',
        scrub: true,
        end: 'bottom top',
        markers: true,
      }
    });
  });
  const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        rootMargin: '0px 750px 0px 750px',
        threshold: 0.5,
      }
  );

  if (block.value) {
    block.value.forEach((el) => observer.observe(el))
  }
  // setTimeout(() => {
  //   lenis.lenis.value.on('scroll',  (e) => {
  //     const block = document.querySelectorAll('.block');
  //     block.forEach((el, index) => {
  //       const scrollValue = window.scrollY;
  //       el.style.transform = `translateY(${103 - scrollValue * 0.2}px)`;
        // el.style.transform = `translateY(${(e.animatedScroll / 5) * (-1 * e.direction)}px)`
  //     })
  //   });
  // }, 0)
});
onUnmounted(() => {
  // ctx.revert(); // <- Easy Cleanup!
});
</script>

<style lang="scss">
.page-test {
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
    //opacity: 0;
    //transform: translateY(0%);
    //transition: 0.8s transform linear, 0.8s opacity linear;
    transition: 0.3s transform linear;
    //&--left {
    //  transform-origin: top right;
    //  transform: translateX(calc(-100% - 30.5rem)) rotate(20deg);
    //}
    &--right {
      margin-left: auto;
      //transform-origin: top left;
      //transform: translateX(calc(100% + 30.5rem)) rotate(-20deg);
    }
    //&.visible {
    //  opacity: 1;
    //  transform: translateX(0) rotate(0deg);
    //}
  }
}
</style>
