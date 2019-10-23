<template>
  <div class="canvas-background">
    <canvas id="canvas" width="500" height="500"></canvas>
    <img id="img" src="../assets/heart-1.png" alt="">
  </div>
</template>

<script>
import FabricUtil from '@/common/js/fabric.js';
export default {
  name: "Canvas",
  props: {
    msg: String
  },
  mounted() {
    new FabricUtil();
  }
};
</script>

<style scoped lang="scss">
.canvas-background {
  height: 100%;
  background: url('../assets/bg.jpg') no-repeat 100% 100%;
}
#img {
  display: none;
}
</style>
