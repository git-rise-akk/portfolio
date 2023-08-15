<template>
  <div class="page contacts">
    <template-page
        :filterOpacity="0.5"
        :bgImage="imageSrc"
        :titlePage="'Контакты'"
    >
      <div class="parts">
        <div class="part part--one">
          <div class="social-media">
            <a
             v-for="(socialItem, index) in contactsData.data.attributes.socialNetwork"
             :key="`social-media_${index}`"
             class="social-media__link"
             :href="socialItem.link"
             target="_blank"
            >
              {{ socialItem.title }}
            </a>
          </div>
        </div>
        <div class="part part--two">
          <div class="working-contacts">
            <div
                class="working-contacts__item"
                v-for="(contact, index) in contactsData.data.attributes.workingContacts"
                :key="`working-contacts__item_${index}`"
            >
              <div class="working-contacts__item-title">{{ contact.title }}</div>
              <a class="working-contacts__item-link" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
            </div>
          </div>
        </div>
      </div>
    </template-page>
  </div>
</template>

<script setup>
  const  config = useRuntimeConfig();
  const { data: contactsData } = await useFetch(`${config.API_URL}/api/kontakty?populate=*`);

  const imageSrc = computed(() => {
    return config.API_URL + contactsData.value.data.attributes.image.data.attributes.url;
  });
</script>

<style lang="scss">
  .contacts {
    .content {
      display: flex;
      justify-content: center;
      .parts {
        display: flex;
        font-family: 'Gilroy-Bold', Arial, Helvetica, sans-serif;
        .part--one {
          font-size: 4rem;
          font-weight: bold;
          margin-right: 19.7rem;
          a {
            position: relative;
            display: block;
            margin-bottom: 2rem;
            width: fit-content;
            &:last-child {
              margin-bottom: 0;
            }
            &:hover {
              &:after {
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
              bottom: -3px;
              @include anim(.7s, width);
            }
          }
        }
        .part--two {
          .working-contacts__item {
            margin-bottom: 11.1rem;
            &:last-child {
              margin-bottom: 0;
            }
            .working-contacts__item-title {
              font-size: 4.8rem;
              font-weight: bold;
              width: 35rem;
              margin-bottom: 2.3rem;
            }
            .working-contacts__item-link {
              position: relative;
              width: fit-content;
              font-family: 'Gilroy-Regular', Arial, Helvetica, sans-serif;
              font-size: 3.2rem;
              &:hover {
                &:after {
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
                bottom: -3px;
                @include anim(.7s, width);
              }
            }
          }
        }
      }
    }
  }
</style>
