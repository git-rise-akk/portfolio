<template>
  <div class="Close">
    <div class="lines">
      <div class="line line--one"></div>
      <div class="line line--two"></div>
    </div>
  </div>
</template>

<style lang="scss">
.Close {
  position: absolute;
  position: absolute;
  top: 5.1rem;
  right: 6.3rem;
  width: 10rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  .lines {
    position: relative;
    width: 6rem;
    .line {
      position: absolute;
      top: 50%;
      width: 6rem;
      height: 3px;
      background: #fff;
      transform: translateY(-50%) rotate(45deg);
      &.line--two {
        top: initial;
        bottom: 50%;
        transform: translateY(25%) rotate(-45deg);
      }
    }
  }
}
</style>
