<template>
  <div class="svg-background">
    <svg id="svg-bg">
      <g id="svgPanel">
        <g id="grid" />
        <circle fill="red" r="50" cx="100" cy="100" />
      </g>
    </svg>
  </div>
</template>

<script>
import { drawBg } from '@/common/js/svgbg.js'
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted() {
    drawBg()
  }
};
</script>

<style scoped lang="scss">
#svg-bg {
  background: #fafafa;
}
</style>
