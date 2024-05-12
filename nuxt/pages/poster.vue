<template>
  <div ref="root" class="page poster" :class="{mobile: !$device.isDesktop}">
    <template-page
        :filterOpacity="0.3"
        :bgImage="imageSrc"
        :titlePage="'Афиша'"
    >
      <ul v-if="posterData.data.attributes.poetryEvenings.length" class="events">
        <template
            v-for="(event, index) in posterData.data.attributes.poetryEvenings"
            :key="`event-${index}`">
          <a
              v-if="checksRelevanceEvent(event.date)"
              class="event"
              :href="event.link"
              target="_blank"
              @mouseenter="updateCursorState('CustomCursor--big', 'купить<br />билет')"
              @mouseleave="updateCursorState('', '')"
          >
            <div ref="eventWrapper" :class="`event_wrapper n${index}`">
              <div class="event__item event__item--date"><div v-html="wrapsSpan(event.date)"></div></div>
              <div class="event__item event__item--time">{{ event.time }}</div>
              <div class="event__item event__item--city">{{ event.city }}</div>
              <div class="event__item event__item--place"><div>{{ event.place }}</div></div>
            </div>
          </a>
        </template>
      </ul>
      <div v-else class="not-events">В настоящее время планета поэзии кажется спокойной и безмятежной,<br />без признаков литературных событий.</div>
    </template-page>
  </div>
</template>

<script setup>
  import Lenis from "@studio-freight/lenis";
  import { gsap } from "gsap";
  import { changesCursorState } from '@/stores/Cursor';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  const store = changesCursorState();
  const  config = useRuntimeConfig();
  const { data: posterData } = await useFetch(`${config.public.API_URL}/api/afisha?populate=*`);
  const date = new Date();

  const month = date.getMonth();
  const day = date.getDate();
  const eventWrapper = ref(null);
  const root = ref(null);
  const main = ref();
  let ctx;

  const imageSrc = computed(() => {
    return config.public.API_URL + posterData.value.data.attributes.image.data.attributes.url;
  });

  const wrapsSpan = ((text) => {
    return text.replace(/^(.{3})(\w{2})/, "$1<span>$2</span>");
  });

  const removesSymbol = ((date) => {
    return Number(date.replace('/', ''));
  });
  const updateCursorState = (newClass, text) => {
    store.toggleClass = newClass;
    store.text = text;
  };

  const checksRelevanceEvent = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(currentDate.getFullYear(), parseInt(date.split('/')[1]) - 1, parseInt(date.split('/')[0]));

    return inputDate > currentDate;
  };

  onBeforeUnmount(() => {
    updateCursorState('', '');
  });

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

    // блокируем скрол до появлени всех элементов
    lenis.stop();
    // навешивание класса в зависимости от того,
    // находиться ли элемент в зоне видимости 1 экрана
    if(eventWrapper.value) {
      const amendment = eventWrapper.value[0].getBoundingClientRect().top > 400 ? innerHeight : 0;
      eventWrapper.value.forEach((el) => {
        let rect = el.getBoundingClientRect();
        const elTop = rect.top - amendment;
        if (elTop < innerHeight) {
          el.classList.add('visible');
          setTimeout(() => {
            el.classList.add('not-transition');
          }, 4000)
        } else {
          el.classList.add('not-anim');
        }
      });
    }
    const visibleElements = document.querySelectorAll('.visible').length;
    const timeShow = 700;
    // время появления всех видимых элементов
    const timeOnScroll = timeShow * visibleElements;
    setTimeout(() => {
      lenis.start();
    }, timeOnScroll);

    const events = gsap.utils.toArray('.event_wrapper');

    events.forEach((event) => {
      gsap.to(event, {
        scale: 1,
        opacity: 1,
        duration: 0.7,
          scrollTrigger: {
              trigger: event,
              start: 'top bottom',
              scroller: '.page.poster',
              scrub: true,
              end: 'bottom 70%',
              markers: true,
          }
      });
    });
  });
</script>

<style lang="scss">
.poster {
  .not-events {
    width: fit-content;
    margin: 0 auto;
    text-align: center;
    font-size: 3rem;
  }
  .events {
    display: flex;
    width: calc(100% - 16.6rem);
    flex-direction: column;
    margin: 0 auto 5rem;
    padding-bottom: 10rem;
    position: relative;
    font-size: 6.4rem;
    font-family: 'Sverdlovsk', Arial, Helvetica, sans-serif;
    .event {
      position: relative;
      padding: initial !important;
      &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @include anim( .7s, background-color, width);
        background-color: rgba(255, 255, 255, 0);
      }
      &:hover {
        &:after {
          width: calc(100% + 16.6rem);
          background: rgb(255,255,255);
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 15%, rgba(255,255,255,0.19931722689075626) 50%, rgba(255,255,255,0.2) 85%, rgba(255,255,255,0) 100%);
        }
      }
      .event_wrapper {
        display: flex;
        justify-content: space-between;
        padding: 4rem 0;
        box-sizing: border-box;
        border-top: 2px solid #fff;
        opacity: 0;
        transform: scale(1.1);
        // написать цикл
        &.n0:not(.not-anim) {
          transition: opacity .7s .7s, transform .7s .7s;
        }
        &.n1:not(.not-anim) {
          transition: opacity .7s 1.2s, transform .7s 1.2s;
        }
        &.n2:not(.not-anim) {
          transition: opacity .7s 1.7s, transform .7s 1.7s;
        }
        &.n3:not(.not-anim) {
          transition: opacity .7s 2.2s, transform .7s 2.2s;
        }
        &.n4:not(.not-anim) {
          transition: opacity .7s 2.7s, transform .7s 2.7s;
        }
        &.n5:not(.not-anim) {
          transition: opacity .7s 3.2s, transform .7s 3.2s;
        }
        &.n6:not(.not-anim) {
          transition: opacity .7s 3.7s, transform .7s 3.7s;
        }
        &.n7:not(.not-anim) {
          transition: opacity .7s 4.2s, transform .7s 4.2s;
        }

        &.visible {
          opacity: 1;
          transform: scale(1);
        }
        &.not-anim {
          opacity: 1;
          scale: 1;
        }
        &.not-transition {
          transition: opacity 0s 0s, transform 0s 0s !important;
        }
      }

      .event__item {
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #fff;
        text-align: center;
        &.event__item--date {
          width: 18%;
          div {
            display: flex;
            align-items: flex-end;
            span {
              font-size: 5rem;
            }
          }
        }
        &.event__item--time {
          width: 15%;
        }
        &.event__item--city {
          width: 28%;
        }
        &.event__item--place {
          width: 53%;
          border: none;
          font-size: 3.6rem;
          div {
            width: 50%;
          }
        }
      }
    }
  }
  &.mobile {
    .events {
      font-size: 4.4rem;
      .event {
        padding: 4rem 0;
        .event__item--place div {
          width: initial;
        }
      }
    }
  }
}
</style>
