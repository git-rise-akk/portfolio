<template>
  <div>
    <NuxtPage />
    <MenuBtn />
    <Menu />
    <Logo />
    <CustomCursor v-if="$device.isDesktop"/>
  </div>
</template>

<style lang="scss">
.MenuBtn {
  position: fixed;
  top: 5.1rem;
  right: 6.3rem;
}
.Logo {
  position: fixed;
  top: 6.1rem;
  left: 8.3rem;
}
</style>

<script setup>
  import CustomCursor from "@/components/CustomCursor.vue";
</script>
