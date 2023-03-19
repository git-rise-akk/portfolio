<template>
  <div class="Menu">
    <div class="close"></div>
    <div class="Menu__left">
      <div class="social-media">
        <div class="social-media__link">youtube</div>
        <div class="social-media__link">telegram</div>
        <div class="social-media__link">vkontakte</div>
        <div class="social-media__link">dzen</div>
      </div>
    </div>
    <div class="Menu__right">
      <NuxtLink
          v-for="(value, index) in items"
          :key="index"
          :to="value.href"
          class="menu-item"
      >
      {{ value.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      items: [
        {
          href: '/',
          title: 'Обо мне',
        },
        {
          href: 'https://osychewa.ru/',
          title: 'Медитации',
        },
        {
          href: '/poster',
          title: 'Афиша',
        },
        {
          href: '/video',
          title: 'Видео',
        },
        {
          href: '/photos',
          title: 'Фото',
        },
        {
          href: '/contacts',
          title: 'Контакты',
        },
      ],
    }
  }
}
</script>

<style lang="scss">
.Menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 32rem 0 0 39.4rem;
  background-color: #004236;
  display: flex;
  z-index: 2;
  transform: translateX(-100%);
  &.Menu--visible {
    transform: translateX(0);
  }
  .Menu__left {
    font-family: 'Gilroy-Bold', Arial, Helvetica, sans-serif;
    font-size: 2.8rem;
    width: 41.3rem;
    .social-media__link {
      margin-bottom: 1.1rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .Menu__right {
    font-family: 'Sverdlovsk', Arial, Helvetica, sans-serif;
    font-size: 8.6rem;
    .menu-item {
      display: block;
      margin-bottom: 2.1rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
