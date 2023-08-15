<template>
  <div class="page poster">
    <template-page
        :filterOpacity="0.3"
        :bgImage="imageSrc"
        :titlePage="'Афиша'"
    >
      <ul class="events">
        <a v-for="(event, index) in contactsData.data.attributes.poetryEvenings"
           :key="`event-${index}`"
           class="event"
           :href="event.link"
           target="_blank"
           @mouseenter="updateCursorState('CustomCursor--big', 'купить<br />билет')"
           @mouseleave="updateCursorState('', '')"
        >
          <div class="event__item event__item--date"><div v-html="wrapsSpan(event.date)"></div></div>
          <div class="event__item event__item--time">{{ event.time }}</div>
          <div class="event__item event__item--city">{{ event.city }}</div>
          <div class="event__item event__item--place"><div>{{ event.place }}</div></div>
        </a>
      </ul>
    </template-page>
  </div>
</template>

<script setup>
  import { changesCursorState } from '@/stores/Cursor';
  const store = changesCursorState();
  const  config = useRuntimeConfig();
  const { data: contactsData } = await useFetch(`${config.API_URL}/api/afisha?populate=*`);

  const imageSrc = computed(() => {
    return config.API_URL + contactsData.value.data.attributes.image.data.attributes.url;
  });

  const wrapsSpan = ((text) => {
    return text.replace(/^(.{3})(\w{2})/, "$1<span>$2</span>");
  });
  const updateCursorState = (newClass, text) => {
    store.toggleClass = newClass;
    store.text = text;
  };
  onBeforeUnmount(() => {
    updateCursorState('', '');
  });
</script>

<style lang="scss">
.poster {
  .events {
    display: flex;
    width: calc(100% - 16.6rem);
    flex-direction: column;
    margin: 0 auto 5rem;
    position: relative;
    font-size: 6.4rem;
    font-family: 'Sverdlovsk', Arial, Helvetica, sans-serif;
    .event {
      border-top: 2px solid #fff;
      display: flex;
      justify-content: space-between;
      min-height: 11.6rem;
      padding: 2.2rem 0;
      &:last-child {
        border-bottom: 2px solid #fff;
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
}
</style>
