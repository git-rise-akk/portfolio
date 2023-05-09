<template>
  <div class="Menu" :class="{ 'Menu--open': store.menuOpened }">
    <div class="close"></div>
    <div class="Menu__left">
      <div class="social-media">
        <a v-for="(value, index) in socialMedia"
           class="social-media__link"
           :href="value.href"
           target="_blank"
        >
          {{ value.title }}
        </a>
      </div>
    </div>
    <div class="Menu__right">
      <NuxtLink
          v-for="(value, index) in menuItems"
          :key="index"
          :to="value.href"
          class="menu-item"
          @click="store.menuOpened = !store.menuOpened;"
      >
      {{ value.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  import { useMenuStore } from '@/stores/menu';
  const store = useMenuStore();
  const menuItems = [
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
  ];
  const socialMedia = [
    {
      href: 'https://www.youtube.com/@osychewa',
      title: 'youtube',
    },
    {
      href: 'https://t.me/sychewa',
      title: 'telegram',
    },
    {
      href: 'https://vk.com/o.sychewa',
      title: 'vkontakte',
    },
    {
      href: 'https://dzen.ru/id/6284e4dee4ef313484ea5929',
      title: 'dzen',
    }
  ]
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
  transform: translateY(-100%);
  transition: transform .8s cubic-bezier(0.65, 0.05, 0.36, 1);
  &.Menu--open {
    transform: translateY(0);
  }
  .Menu__left {
    font-family: 'Gilroy-Bold', Arial, Helvetica, sans-serif;
    font-size: 2.8rem;
    width: 41.3rem;
    .social-media__link {
      margin-bottom: 1.1rem;
      display: block;
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
