<template>
  <div class="canvas-background">
    <canvas id="canvas" width="500" height="500"></canvas>
    <img id="img" src="../assets/heart-1.png" alt="">
  </div>
</template>

<script>
import canvasEvent from '@/common/js/canvas.js';
export default {
  name: "Canvas",
  props: {
    msg: String
  },
  mounted() {
    new canvasEvent();
  }
};
</script>

<style scoped lang="scss">
.canvas-background {
  height: 100%;
  background: url('../assets/bg.jpg') no-repeat 100% 100%;
}
</style>
