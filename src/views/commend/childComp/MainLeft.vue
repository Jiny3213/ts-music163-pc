<template>
  <div class="main-left">
    <!-- 热门推荐 -->
    <div class="hot-commend">
      <!-- 标题栏 -->
      <title-bar mainTitle="热门推荐">
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
      </title-bar>

      <!-- 内容部分 -->
      <div class="content">
        <!-- 每个推荐内容 -->
        <div class="song" v-for="(item, index) in commendSongList" :key="index">
          <!-- 图片内容 -->
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

          <!-- 底部文字 -->
          <a href>{{item.name}}</a>
        </div>
      </div>
    </div>

    <!-- 新碟上架 -->
    <div class="new-albums">
      <!-- 标题栏 -->
      <title-bar mainTitle="新碟上架" />

      <!-- 内容 -->
      <div class="content">
        <!-- 左右切换箭头 -->
        <div class="go-left" @click="goLeft"></div>
        <div class="go-right" @click="goRight"></div>

        <!-- 5个推荐专辑 -->
        <div class="albums-outside">
          <!-- 第一页专辑 -->
          <transition :name="slideName">
            <ul class="albums" v-show="currentAlbumsPage == 1">
              <li class="album" v-for="(item, index) in newAlbums.slice(0, 5)" :key="index+10">
                <a class="face">
                  <img :src="item.picUrl" alt />
                  <div class="mask"></div>
                  <a class="start"></a>
                </a>
                <a href>{{item.name}}</a>
                <a href>{{item.artist.name}}</a>
              </li>
            </ul>
          </transition>

          <!-- 第二页专辑 -->
          <transition :name="slideName">
            <ul class="albums" v-show="currentAlbumsPage == 2">
              <li class="album" v-for="(item, index) in newAlbums.slice(5, 10)" :key="index">
                <a class="face">
                  <img :src="item.picUrl" alt />
                  <div class="mask"></div>
                  <a class="start"></a>
                </a>
                <a href>{{item.name}}</a>
                <a href>{{item.artist.name}}</a>
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>

    <!-- 榜单 -->
    <div class="rank-list">
      <title-bar mainTitle="榜单" />

      <div class="content">
        <rank class="rank" :rankData="soarRank"/>
        <rank class="rank" :rankData="newRank"/>
        <rank class="rank" :rankData="originalRank"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TitleBar from "@/components/TitleBar.vue";
import Rank from "./Rank.vue"
// 加了这行就可以访问this.$router,好像是vscode的bug
// import { Route } from 'vue-router'
// import { request } from "@/network/request";

// 榜单接口
interface rankObj {
  rankArray: any[],
  coverImgUrl: string,
  rankTitle: string
}
// 初始化data
let rankObjInit : rankObj = {
  rankArray: [],
  coverImgUrl: '',
  rankTitle: 'loading...'
}

@Component({
  components: {
    TitleBar,
    Rank
  }
})
export default class MainLeft extends Vue {
  // 推荐歌单
  commendSongList: any[] = [];
  // 热门专辑
  newAlbums: any[] = [];
  currentAlbumsPage: number = 1;
  slideName: string = "right";
  isSliding: boolean = false;
  // 飙升榜
  soarRank: rankObj = rankObjInit;
  newRank: rankObj = rankObjInit;
  originalRank: rankObj = rankObjInit;
  // 获取歌单播放数
  getPlayCount(playCount: number): string {
    if (playCount < 10000) {
      return playCount.toString();
    } else {
      return (playCount / 10000).toFixed(0) + "万";
    }
  }
  goLeft(): void {
    if (this.isSliding) return;
    else {
      // 动画的时间是1s,阻止在动画时间内再次点击
      this.isSliding = true;
      setTimeout(() => (this.isSliding = false), 1000);
      this.slideName = "left";
      this.currentAlbumsPage = this.currentAlbumsPage == 1 ? 2 : 1;
    }
  }
  goRight(): void {
    if (this.isSliding) return;
    else {
      // 动画的时间是1s,阻止在动画时间内再次点击
      this.isSliding = true;
      setTimeout(() => (this.isSliding = false), 1000);
      this.slideName = "right";
      this.currentAlbumsPage = this.currentAlbumsPage == 1 ? 2 : 1;
    }
  }
  // 获取榜单信息，并重新封装
  getRankData(idx: number, target: 'soarRank'|'newRank'|'originalRank'):void {
    this.$axios
      .request({
        url: "/top/list",
        params: {
          idx: idx
        }
      })
      .then(res => {
        this[target] = {
          rankArray: res.data.playlist.tracks.slice(0, 10),
          coverImgUrl: res.data.playlist.coverImgUrl,
          rankTitle: res.data.playlist.name
        }
        console.log(this[target].rankArray)
      });
  }
  created() {
    // 获取热门歌单
    this.$axios
      .request({
        url: "/personalized",
        params: {
          limit: 8
        }
      })
      .then(res => {
        this.commendSongList = res.data.result;
      });

    // 获取新碟上架
    this.$axios
      .request({
        url: "/album/newest"
      })
      .then(res => {
        this.newAlbums = res.data.albums;
      });

    // 获取3个榜单
    this.getRankData(3, 'soarRank')
    this.getRankData(0, 'newRank')
    this.getRankData(2, 'originalRank')

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
  font-family: Arial, Helvetica, sans-serif;
}
.hot-commend {
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
.new-albums {
  .content {
    height: 186px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #d3d3d3;
    margin: 20px 0 37px 0;
    background: #f5f5f5;
    position: relative;
    overflow: hidden;
    // 包含多个专辑，用于滑动
    .albums-outside {
      height: 135px;
      width: 640px;
      position: absolute;
      top: 30px;
      margin: 0 20px 0 25px;
      overflow: hidden;
    }
    // 包含5个专辑
    .albums {
      overflow: hidden;
      position: absolute;
      width: 640px;
      left: 0;
      @include clearfix;
      .album {
        float: left;
        margin: 0 10px 0 0;
        .face {
          display: block;
          width: 118px;
          position: relative;
          cursor: pointer;
          img {
            height: 100px;
            width: 100px;
          }
          .mask {
            height: 100px;
            width: 118px;
            position: absolute;
            top: 0;
            background: url("~@/assets/png/coverall.png") 0 -570px;
          }
          .start {
            width: 22px;
            height: 22px;
            background: url("~@/assets/png/iconall.png") 0 -85px;
            position: absolute;
            bottom: 10px;
            right: 25px;
            display: none;
            &:hover {
              background-position: 0 -110px;
            }
          }
          &:hover {
            .start {
              display: block;
            }
          }
        }
        a {
          display: block;
          width: 100px;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:hover {
            text-decoration: underline;
          }
          &:nth-child(2) {
            color: #000000;
          }
          &:nth-child(3) {
            color: #666666;
          }
        }
      }
    }
    .go-left,
    .go-right {
      height: 17px;
      width: 17px;
      position: absolute;
      z-index: 2;
      top: 71px;
      cursor: pointer;
      background: url("~@/assets/png/index.png");
    }
    .go-left {
      left: 3px;
      background-position: -260px -75px;
      &:hover {
        background-position: -280px -75px;
      }
    }
    .go-right {
      right: 3px;
      background-position: -300px -75px;
      &:hover {
        background-position: -320px -75px;
      }
    }
  }
}
.right-enter {
  transform: translateX(100%);
}
.right-leave-to {
  transform: translateX(-100%);
}
.left-enter {
  transform: translateX(-100%);
}
.left-leave-to {
  transform: translateX(100%);
}
.right-enter-active,
.right-leave-active,
.left-enter-active,
.left-leave-active {
  transition: transform 1s;
}

// 榜单
.rank-list{
  .content{
    margin: 20px 0 0 0;
    width: 690px;
    height: 472px;
    overflow: hidden;
    background: url('~@/assets/png/index_bill.png');
    .rank{
      float: left;
    }
  }
}
</style>