<template>
  <div class="Scroll">
    <div ref="Scroll__content" class="Scroll__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .Scroll {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
</style>
