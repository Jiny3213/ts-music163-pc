<template>
  <div class="main-left">
    <div class="hot-commend">
      <div class="title">
        <a href>热门推荐</a>
        <div class="tab">
          <a href>华语</a>
          <span>|</span>
          <a href>流行</a>
          <span>|</span>
          <a href>摇滚</a>
          <span>|</span>
          <a href>民谣</a>
          <span>|</span>
          <a href>电子</a>
        </div>
        <div class="more">
          <a href>更多</a>
          <div class="more-bg"></div>
        </div>
      </div>
      <div class="content">
        <div class="song" v-for="(item, index) in commendSongList" :key="index">
          <div class="face">
            <a href>
              <img :src="item.picUrl" alt />
              <div class="mask"></div>
            </a>
            <div class="bottom">
              <div class="hear"></div>
              <div class="viewed">{{getPlayCount(item.playCount)}}</div>
              <div class="start"></div>
            </div>
          </div>
          <a href>{{item.name}}</a>
        </div>
      </div>
    </div>
    <div class="new-plate">
      <title-bar/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TitleBar from "@/components/TitleBar.vue";
// 加了这行就可以访问this.$router
// import { Route } from 'vue-router'
import {request} from '@/network/request'

@Component({
  components: {
    TitleBar
  }
})
export default class MainLeft extends Vue {
  commendSongList: any[] = [];
  getPlayCount(playCount: number): string {
    if (playCount < 10000) {
      return playCount.toString();
    } else {
      return (playCount / 10000).toFixed(0) + "万";
    }
  }
  created() {
    // 获取热门歌单
    this.$axios.request({
        url: "/personalized",
        params: {
          limit: 8
        }
      })
      .then(res => {
        console.log(res.data.result);
        this.commendSongList = res.data.result;
      });
  }
}
</script>

<style lang="scss" scoped>
.main-left {
  box-sizing: border-box;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;

  width: 730px;
  height: 1425px;
  padding: 20px 20px 40px 20px;
  // background: #999999;
  font-family: Arial, Helvetica, sans-serif;
}
.hot-commend {
  .title {
    height: 33px;
    padding: 0 10px 0 34px;
    background: url("~@/assets/png/index.png") -226px -155px no-repeat;
    border-bottom: 2px solid #c10d0c;
    & > a {
      font: 20px/28px "Microsoft Yahei", Arial;
      color: #333;
      float: left;
    }
    .tab {
      float: left;
      margin: 7px 0 0 20px;
      color: #666666;
      font-size: 12px;
      a {
        color: inherit;
      }
      a:hover {
        text-decoration: underline;
      }
      span {
        margin: 0 10px;
        cursor: default;
      }
    }
    .more {
      float: right;
      margin: 7px 0 0 0;
      a {
        color: #666666;
        font-size: 12px;
        &:hover {
          text-decoration: underline;
        }
      }
      .more-bg {
        display: inline-block;
        bottom: 0;
        width: 12px;
        height: 12px;
        margin: 0 0 0 4px;
        transform: translateY(3px);
        background: url("~@/assets/png/index.png") 0 -240px;
      }
    }
  }
  // 图文部分
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0 35px 0;
    // 单个图文
    .song {
      width: 140px;
      display: flex;
      flex-direction: column;
      margin: 0 0 30px 0;
      position: relative;

      // 图片
      .face {
        position: relative;
        img {
          height: 140px;
          width: 140px;
        }
        .mask {
          position: absolute;
          top: 0;
          width: 140px;
          height: 140px;
          background: url("~@/assets/png/coverall.png");
        }
        .bottom {
          position: absolute;
          bottom: 3px;
          width: 100%;
          height: 27px;
          background: url("~@/assets/png/coverall.png") 0 -537px;
          .hear {
            float: left;
            margin: 9px 5px 9px 10px;
            width: 14px;
            height: 11px;
            background: url("~@/assets/png/iconall.png") 0 -24px;
          }
          .viewed {
            float: left;
            margin: 7px 0 0 0;
            font-size: 12px;
            color: #cccccc;
          }
          .start {
            float: right;
            width: 16px;
            height: 17px;
            background: url("~@/assets/png/iconall.png");
            margin: 5px 10px 0 0;
            cursor: pointer;
            &:hover {
              background: url("~@/assets/png/iconall.png") 0 -60px;
            }
          }
        }
      }
      // 文字
      a {
        color: #000000;
        width: 140px;
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>