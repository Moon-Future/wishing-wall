<template>
  <div class="svg-background">
    <div id="svgDemo">
    </div>
  </div>
</template>

<script>
import { SvgEvent } from '@/common/js/svgEvent.js';
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted() {
    new SvgEvent();
  }
};
</script>

<style scoped lang="scss">
#svg-bg {
  background: #fafafa;
}
</style>
