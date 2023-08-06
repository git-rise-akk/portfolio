<template>
  <div class="Scroll"  @wheel="scrollEvent">
    <div ref="Scroll__content" class="Scroll__content" :style="`transform: translate(0, ${value}%});`">
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

<script setup>
  const props = defineProps({
    start: {
      type: Number,
      default: 0,
    },
  });
  let value = ref(props.start);
  let direction = ref(0);
  const scrollContent = ref(null);
  const scrollEvent = (e) => {
    if (e.deltaY > 0) {
      direction.value = 1;
    } else
    if (e.deltaY < 0) {
      direction.value = -1;
    }
    value.value = value.value + direction.value;
    // const emit = defineEmits(['changeEvent', e, direction]);
  };
  const setsScrollStyles = (value) => {
    const transformStyle = `transform: translate(0, ${value}%});`;
    const dimensionStyle = `height:${scrollContent.offsetHeight}px;`;
    const style = `${transformStyle} ${dimensionStyle}`;
    console.log(style)
    return style;
  };
</script>
