<template>
  <div class="wish-wall-container">
    <div v-for="(item, i) in 100" :key="i" class="wish-item" ref="wishItem">
      <img :src="baseUrl + paperList[random(0, 11)].img" alt="" class="wish-note">
    </div>
  </div>
</template>

<script>
import { notepaperList } from '@/common/js/notelist';
export default {
  name: 'home',
  components: {
    
  },
  data() {
    return {
      baseUrl: 'https://wish-wall-1255423800.cos.ap-guangzhou.myqcloud.com/',
      paperList: notepaperList,
      content: '请保佑我的女儿抵抗力提高，扁桃体不要再生病了，不要感冒、不要咳嗽，不要 再生所有的病，身体永远健康！！！请保佑老公赚很多钱，生活无忧！！！诚心 祈愿！！！很多钱，生活无忧！！！诚心 祈愿！！！诚心 祈愿',
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  mounted() {
    this.$refs.wishItem.forEach(item => {
      item.style.left = `${this.random(0, this.width - 200)}px`;
      item.style.top = `${this.random(0, this.height - 200)}px`;
    })
  },
  methods: {
    random(frm, to) {
      return Math.floor((Math.random() * to) + frm);
    },
  }
}
</script>

<style scoped lang="scss">
.wish-item {
  position: absolute;
  .wish-note {
    width: 200px;
    height: 200px;
  }
}

</style>