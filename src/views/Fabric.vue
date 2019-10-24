<template>
  <div class="canvas-background">
    <canvas id="canvas" width="500" height="500"></canvas>
    <!-- <img id="img" src="../assets/cloud.png" alt=""> -->
    <!-- <p class="wish-word" id="wishWord">请保佑我的女儿抵抗力提高，扁桃体不要再生病了，不要感冒、不要咳嗽，不要 再生所有的病，身体永远健康！！！请保佑老公赚很多钱，生活无忧！！！诚心 祈愿！！！</p> -->
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
  background: url('../assets/wall-1.png') repeat;
}
#img {
  display: none;
}
</style>
