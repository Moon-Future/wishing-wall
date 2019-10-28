<template>
  <div class="wish-wall-bg">
    <div class="wish-wall-container" id="wishWall">
      <div v-for="(item, i) in indexList" :key="i" class="wish-item" ref="wishItem">
        <img
          :src="baseUrl + paperList[item.index].img"
          alt
          class="wish-note"
          :style="paperList[item.index].styleImg"
        />
        <div class="wish-content">
          <h2 class="wish-text-wrapper">
            <p class="wish-text">{{ i == 0 ? content : content }}</p>
          </h2>
        </div>
        <div class="wish-footer" :style="paperList[item.index].stylePsn">
          <p class="wish-psn">[88888条] 我是你的巴巴爸爸</p>
          <p>2019.10.23 23:15</p>
        </div>
      </div>

      <!-- <div v-for="(item, i) in 1" :key="i" class="wish-item" ref="wishItem">
        <img :src="baseUrl + paper.img" class="wish-note" :style="paper.styleImg || {width: '250px'}" />
        <div class="wish-content">
          <p class="wish-text">{{ i == 0 ? content : content }}</p>
        </div>
        <div class="wish-footer" :style="paper.stylePsn">
          <p class="wish-psn">[88888条] 我是你的巴巴爸爸</p>
          <p>2019.10.23 23:15</p>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { notepaperList } from "@/common/js/notelist-1";
// let i = 1, timeout;
// document.addEventListener('click', function(e) {
//   i += 0.1;
//   document.getElementById('wishWall').style.transform = 'scale(' + i + ')';
// }, true)

// window.onmousewheel = document.onmousewheel = function(e) {
//   if (!timeout) {
//     e = e || window.event;
//     //e.detail用来兼容 FireFox
//     e.wheelDelta > 0 || e.detail > 0 ? i += 0.1 : i -= 0.1;
//     document.getElementById('wishWall').style.transform = 'scale(' + i + ')';
//   }
//   timeout = setTimeout(() => {
//     clearTimeout(timeout);
//     timeout = null;
//   }, 100);
// }

export default {
  name: "home",
  components: {},
  data() {
    return {
      baseUrl: "https://wish-wall-1255423800.cos.ap-guangzhou.myqcloud.com/",
      paperList: notepaperList,
      content:
        "请保佑我的女儿抵抗力提高，扁桃体不要再生病了，不要感冒、不要咳嗽，不要 再生所有的病，身体永远健康！！！请保佑老公赚很多钱，生活无忧！！！诚心 祈愿！！！很多钱，生活无忧！！！诚心 祈愿！！！诚心 祈愿",
      content1: "恭喜发财！！",
      width: window.innerWidth,
      height: window.innerHeight,
      paper: notepaperList[4],
      indexList: [],
      zIndex: 1,
      scale: 1
    };
  },
  created() {
    for (let i = 0; i < 100; i++) {
      this.indexList.push({
        index: this.random(0, 4)
      });
    }
  },
  mounted() {
    let self = this, downFlag = false, wishWall = document.getElementById("wishWall");
    let wishWallWidth = wishWall.offsetWidth, wishWallHeight = wishWall.offsetHeight;
    let startX, startY, startLeft, startTop, timeout, centerX = self.width / 2, centerY = self.height / 2;
    this.$refs.wishItem.forEach(item => {
      item.style.left = `${this.random(0, this.width - 280)}px`;
      item.style.top = `${this.random(0, this.height - 280)}px`;
    });

    wishWall.addEventListener("mousedown", function(e) {
      e = e || window.event;
      let wishItem = self.closest(e.target, '.wish-item');
      downFlag = true;
      startX = e.clientX;
      startY = e.clientY;
      if (wishItem) {
        startLeft = wishItem.style.left.replace('px', '') * 1;
        startTop = wishItem.style.top.replace('px', '') * 1;
        wishItem.style.zIndex = self.zIndex;
        self.zIndex += 1;
      }
    }, false);

    wishWall.addEventListener("mousemove", function(e) {
      e = e || window.event;
      let target = e.target;
      let wishFooter = self.closest(target, '.wish-footer');
      if (!downFlag || !wishFooter) {
        return;
      }
      let wishItem = self.closest(target, '.wish-item');
      let wishItemWidth = wishItem.offsetWidth, wishItemHeight = wishItem.offsetHeight;
      let clientX = e.clientX, clientY = e.clientY;
      let posX = startLeft + clientX - startX, posY = startTop + clientY - startY;
      posX = Math.max(0, posX);
      posX = Math.min(self.width - wishItemWidth, posX);
      posY = Math.max(0, posY);
      posY = Math.min(self.height - wishItemHeight, posY);
      wishItem.style.left = posX + 'px';
      wishItem.style.top = posY + 'px';
    }, false);

    wishWall.addEventListener("mouseup", function(e) {
      downFlag = false;
    }, false);

    window.onmousewheel = document.onmousewheel = function(e) {
      if (!timeout) {
        e = e || window.event;
        //e.detail用来兼容 FireFox
        e.wheelDelta > 0 || e.detail > 0 ? self.scale += 0.2 : self.scale -= 0.2;
        if (self.scale > 2) {
          self.scale = 2;
        } else if (self.scale < 1) {
          self.scale = 1;
        }
        let clientX = e.clientX, clientY = e.clientY;
        let posX = (0.5 - clientX / self.width) * (wishWallWidth * self.scale - wishWallWidth);
        let posY = (0.5 - clientY / self.height) * (wishWallHeight * self.scale - wishWallHeight);

        // let posX = (0.5 - clientX / self.width) * (wishWall.offsetWidth * self.scale - wishWall.offsetWidth);
        // let posY = (0.5 - clientY / self.height) * (wishWall.offsetHeight * self.scale - wishWall.offsetHeight);
        
        // console.log(wishWallWidth, wishWallWidth * self.scale);
        // console.log(wishWallHeight, wishWallHeight * self.scale);

        wishWall.style.transform = `scale(${self.scale}) translate(${posX}px, ${posY}px)`;
      }
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        timeout = null;
      }, 100);
    };
  },
  methods: {
    random(frm, to) {
      return Math.floor(Math.random() * to + frm);
    },
    closest(el, selector) {
      var matchesSelector =
        el.matches ||
        el.webkitMatchesSelector ||
        el.mozMatchesSelector ||
        el.msMatchesSelector;

      while (el) {
        if (matchesSelector.call(el, selector)) {
          break;
        }
        el = el.parentElement;
      }
      return el;
    }
  }
};
</script>

<style scoped lang="scss">
.wish-wall-bg {
  height: 100%;
  background: url("../assets/wall-1.png") repeat;
  user-select: none;
}
.wish-wall-container {
  width: 100%;
  height: 100%;
}
.wish-item {
  position: absolute;
  cursor: default;
  transform: scale(0.5);
  transform-origin: center;
  .wish-note {
    width: 250px;
  }
  p {
    margin: 0;
    padding: 0;
    font-size: 12px;
  }
  .wish-content {
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    width: 80%;
    text-align: left;
    display: inline-block;
    .wish-text {
      font-weight: bold;
    }
  }
  .wish-footer {
    position: absolute;
    width: 100%;
    bottom: 20px;
    cursor: move;
    .wish-psn {
      color: #3e64ff;
      font-weight: bold;
    }
  }
}
</style>