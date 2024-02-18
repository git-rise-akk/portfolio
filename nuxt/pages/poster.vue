<template>
  <div class="page poster" :class="{mobile: !$device.isDesktop}">
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
              v-if="Number(event.date.split('/')[1]) > month && Number(event.date.split('/')[0]) > day"
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
  import { changesCursorState } from '@/stores/Cursor';
  const store = changesCursorState();
  const  config = useRuntimeConfig();
  const { data: posterData } = await useFetch(`${config.public.API_URL}/api/afisha?populate=*`);
  const date = new Date();
  const lenis = inject('lenis');
  const month = date.getMonth();
  const day = date.getDate();
  const eventWrapper = ref(null);
  let vis = ref(false);

  const imageSrc = computed(() => {
    return config.public.API_URL + posterData.value.data.attributes.image.data.attributes.url;
  });

  setTimeout(() => {
    vis.value = true;
  }, 500);

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
  onBeforeUnmount(() => {
    updateCursorState('', '');
  });

  onMounted(() => {
    lenis.lenis.value.resize();
    // блокируем скрол до появлени всех элементов
    lenis.lenis.value.stop();
    // навешивание класса в зависимости от того,
    // находиться ли элемент в зоне видимости 1 экрана
    if(eventWrapper.value) {
      eventWrapper.value.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const topPlusHeight = rect.top + rect.height;
        const heightScreen = document.documentElement.clientHeight;
        console.log(topPlusHeight, heightScreen, topPlusHeight < heightScreen)
        if(topPlusHeight < heightScreen) {
          el.classList.add('visible');
        } else {
          el.classList.add('not-anim');
        }
      });
    }
    const visibleElements = document.querySelectorAll('.visible').length;
    const timeShow = 700;
    const timeOnScroll = timeShow * visibleElements;
    setTimeout(() => {
      lenis.lenis.value.start();
    }, timeOnScroll);
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
      min-height: 11.6rem;
      padding: initial !important;
      animation: offset ease;
      animation-timeline: view(block);
      animation-range: cover 0% cover 30%;
      .event_wrapper {
        display: flex;
        justify-content: space-between;
        padding: 4rem 0;
        box-sizing: border-box;
        border-top: 2px solid #fff;
        opacity: 0;
        transform: scale(1.1);
        &.n1 {
          transition: opacity .7s .7s, transform .7s .7s;
        }
        &.n2 {
          transition: opacity .7s 1.2s, transform .7s 1.2s;
        }
        &.n3 {
          transition: opacity .7s 1.7s, transform .7s 1.7s;
        }
        &.n4 {
          transition: opacity .7s 2.2s, transform .7s 2.2s;
        }
        &.n5 {
          transition: opacity .7s 2.7s, transform .7s 2.7s;
        }
        &.visible {
          opacity: 1;
          transform: scale(1);
        }
        &.not-anim {
          opacity: 1;
          transform: scale(1);
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
      @keyframes offset {
        from { transform: scale(1.1); opacity: 0 }
        to { transform: scale(1); opacity: 1 }
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
