<template>
  <div class="banner" @mouseover="stop" @mouseleave="run">
    <!-- 模糊的背景 -->
    <transition-group name="banner">
      <img
        class="blur-bg"
        v-for="(banner, index) in banners"
        :key="index"
        :src="banner.imageUrl + '?imageView&blur=40x20'"
        v-show="currentBannerIndex == index"
      />
    </transition-group>

    <!-- 主体 -->
    <div class="main">
      <!-- 轮播图 -->
      <div class="banner-img">
        <transition-group name="banner">
          <img
            v-for="(banner, index) in banners"
            :key="index"
            :src="banner.imageUrl"
            v-show="currentBannerIndex == index"
          />
        </transition-group>
        <!-- 底部圆点 -->
        <ul class="points">
          <li
            :class="{point: true, active: currentBannerIndex+1 == n}"
            v-for="n in banners.length"
            :key="n"
            @click="goto(n-1)"
          ></li>
        </ul>
      </div>

      <!-- 下载 -->
      <div class="download">
        <a href></a>
        <div class="shadow-left"></div>
        <div class="shadow-right"></div>
      </div>

      <!-- 左右切换轮播图 -->
      <div class="go-left" @click="goLeft"></div>
      <div class="go-right" @click="goRight"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Banner extends Vue {
  banners: any[] = [];
  currentBannerIndex: number = 0;
  timeWait: number = 2000;
  interval: number = 0;
  goLeft(): void {
    if (this.currentBannerIndex > 0) {
      this.currentBannerIndex--;
    } else this.currentBannerIndex = this.banners.length - 1;
  }
  goRight(): void {
    if (this.currentBannerIndex < this.banners.length - 1) {
      this.currentBannerIndex++;
    } else this.currentBannerIndex = 0;
  }
  goto(index: number): void {
    this.currentBannerIndex = index;
  }
  run(): void {
    this.interval = setInterval(() => {
      if (this.banners.length - 1 > this.currentBannerIndex) {
        this.currentBannerIndex++;
      } else this.currentBannerIndex = 0;
    }, this.timeWait);
  }
  stop(): void {
    clearInterval(this.interval);
  }
  created() {
    this.$axios
      .request({
        url: "/banner",
        params: {
          type: 0
        }
      })
      .then(res => {
        this.banners = res.data.banners;
      });
  }
  mounted() {
    this.run();
  }
}
</script>

<style lang="scss" scoped>
.banner {
  height: 285px;
  width: 100%;
  position: relative;
  overflow: hidden;
  .blur-bg {
    position: absolute;
    width: 100%;
    // height: 100%;
  }
}
.main {
  width: 984px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  .banner-img {
    float: left;
    width: 730px;
    height: 100%;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  .download {
    float: left;
    width: 254px;
    height: 100%;
    position: relative;
    background: url("~@/assets/png/download.png");
    a {
      display: block;
      margin: 185px 0 0 19px;
      width: 215px;
      height: 56px;
      &:hover {
        background: url("~@/assets/png/download.png") 0 -289px;
      }
    }
    .shadow-left,
    .shadow-right {
      position: absolute;
      width: 20px;
      height: 100%;
      top: 0;
      background: url("~@/assets/png/banner.png");
    }
    .shadow-left {
      left: -20px;
    }
    .shadow-right {
      right: -20px;
      background-position: -20px 0;
    }
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
}
// 过渡效果
.banner-enter,
.banner-leave-to {
  opacity: 0;
}
.banner-enter-to,
.banner-leave {
  opacity: 1;
}
.banner-enter-active,
.banner-leave-active {
  transition: opacity 1s;
}

// 左右切换箭头
.go-left,
.go-right {
  height: 63px;
  width: 37px;
}
.go-left {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -67px;
  cursor: pointer;
  background: url("~@/assets/png/banner.png") 0 -360px;
  &:hover {
    background: url("~@/assets/png/banner.png") 0 -430px;
  }
}
.go-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -67px;
  cursor: pointer;
  background: url("~@/assets/png/banner.png") 0 -508px;
  &:hover {
    background: url("~@/assets/png/banner.png") 0 -578px;
  }
}

// 底部圆点
.points {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  .point {
    float: left;
    width: 8px;
    height: 8px;
    background: url("~@/assets/png/banner.png") -3px -350px;
    margin: 0 8px;
    cursor: pointer;
  }
}
.active {
  background: url("~@/assets/png/banner.png") -22px -350px !important;
}
</style>