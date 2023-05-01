<template>
  <div class="MenuBtn">
    <div class="lines">
      <div class="line line--top"></div>
      <div class="line line--bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  // name: "MenuBtn"
}
</script>

<style scoped>
.MenuBtn {
  width: 10rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  .lines {
      position: relative;
      height: 1.8rem;
      width: 6rem;
      .line {
        position: absolute;
        top: 0;
        left: 0;
        width: 6rem;
        height: 3px;
        background: #fff;
        transition: width .3s;
        &.line--bottom {
          top: initial;
          bottom: 0;
        }
      }
  }
  &:hover {
    .line--bottom {
      width: 5rem;
    }
  }
}
</style>
