<template>
  <div class="Menu" :class="[{ 'Menu--open': store.menuOpened }, { mobile: !$device.isDesktop }]">
    <div class="close"></div>
    <div class="Menu__wrapper">
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
            :target="value.title === 'Медитации' ? '_blank' : ''"
            class="menu-item"
            :prefetch="true"
            prefetchedClass="prefetched"
            @click="store.menuOpened = !store.menuOpened;"
        >
          {{ value.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useMenuStore } from '@/stores/menu';
  const store = useMenuStore();
  const menuItems = [
      {
        href: '/?section=about',
        title: 'Обо мне',
      },
      {
        href: 'https://osychewa.ru/meditations',
        title: 'Медитации',
      },
      {
        href: '/poster',
        title: 'Афиша',
      },
      {
        href: '/videos',
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #004236;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transform: translateY(-100%);
  transition: transform .8s cubic-bezier(0.65, 0.05, 0.36, 1);
  &.Menu--open {
    transform: translateY(0);
    .Menu__wrapper {
      .Menu__right .menu-item {
        opacity: 1;
        transform: translateY(0);
        //@for $i from 1 through 6 {
        //  &:nth-child(#{$i}) {
        //    transition-delay: #{.01s + .05s * $i};
        //  }
        //}
      }
      .Menu__left .social-media__link {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
  .Menu__wrapper {
    display: flex;
    margin-right: 21vw;
    .Menu__left {
      font-family: 'Gilroy-Bold', Arial, Helvetica, sans-serif;
      font-size: 2.8rem;
      width: 21vw;
      .social-media__link {
        position: relative;
        width: fit-content;
        margin-bottom: 1.1rem;
        display: block;
        opacity: 0;
        transform: translateY(10rem);
        transition: opacity .5s, transform .4s;
        &:last-child {
          margin-bottom: 0;
        }
        @for $i from 1 through 6 {
          &:nth-child(#{$i}) {
            transition-delay: #{.4s + .05s * $i};
          }
        }
        &:hover {
          &:after  {
            width: 100%;
          }
        }
        &:after {
          content: '';
          position: absolute;
          background: #fff;
          height: 1px;
          width: 0;
          left: 0;
          bottom: -5px;
          transition: width .7s;
        }
      }
    }
    .Menu__right {
      font-family: 'Sverdlovsk', Arial, Helvetica, sans-serif;
      font-size: 8.6rem;
      .menu-item {
        position: relative;
        display: block;
        width: fit-content;
        margin-bottom: 2.5rem;
        opacity: 0;
        transform: translateY(10rem);
        transition: opacity .5s, transform .4s;
        &:last-child {
          margin-bottom: 0;
        }
        @for $i from 1 through 6 {
          &:nth-child(#{$i}) {
            transition-delay: #{.4s + .05s * $i};
          }
        }
        &:hover {
          &:after  {
            width: 100%;
          }
        }
        &:after {
          content: '';
          position: absolute;
          background: #fff;
          height: 1px;
          width: 0;
          left: 0;
          bottom: -5px;
          transition: width .7s;
        }
        &.router-link-active {
          &:after  {
            width: 100%;
          }
        }
      }
    }
  }
  &.mobile {
    .Menu__wrapper {
      width: 100%;
      margin: 0 8.3rem;
      .Menu__left {
        width: initial;
        font-size: 3.8rem;
        margin-right: 13rem;
      }
      .Menu__right {
        font-size: 10.6rem;
      }
    }
  }
}
</style>
