<template>
  <div :style="{ backgroundImage: `url(${bg})` }">
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Background extends Vue {
  get bg () {
    const stack = this.$store.state.bg
    return stack[stack.length - 1] || ''
  }
}
</script>

<style scoped>
div {
  z-index: -1;
  position: fixed;
  width: 100%;
  height: 100%;
  transition: .1s;
  background-position: center center;
}
</style>
