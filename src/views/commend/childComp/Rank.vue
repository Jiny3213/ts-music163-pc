<template>
  <dl class="rank">
    <dt>
      <a href :title="rankData.rankTitle" class="cover">
        <img :src="rankData.coverImgUrl" />
        <div class="mask"></div>
      </a>
      <div class="f-left">
        <a href :title="rankData.rankTitle">{{rankData.rankTitle}}</a>
        <div class="btn-play" title="播放"></div>
        <div class="btn-collection" title="收藏"></div>
      </div>
    </dt>

    <dd>
      <ol>
        <li v-for="(item, index) in rankData.rankArray" :key="index">
          <div class="rank-num">{{index + 1}}</div>
          <a href class="rank-name">{{item.name}}</a>
          <div class="open">
            <a href class="btn-play" title="播放"></a>
            <a href class="btn-add" title="添加到播放列表"></a>
            <a href class="btn-collection" title="收藏"></a>
          </div>
        </li>
      </ol>
      <a href class="see-all">查看全部></a>
    </dd>
  </dl>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {State} from 'vuex-class'

// 榜单接口
interface rankObj {
  rankArray: any[];
  coverImgUrl: string;
  rankTitle: string;
}

@Component
export default class Rank extends Vue {
  @Prop(Object) readonly rankData: rankObj | undefined;
  // @State('currentSong') csong
}
</script>

<style lang="scss" scoped>
.rank {
  width: 230px;

  // 榜单标题和图片
  dt {
    box-sizing: border-box;
    width: 230px;
    height: 120px;
    padding: 20px 0 0 20px;
    .cover {
      position: relative;
      img {
        float: left;
        height: 80px;
        width: 80px;
      }
      .mask {
        height: 80px;
        width: 80px;
        position: absolute;
        background: url("~@/assets/png/coverall.png") -145px -57px;
      }
    }

    .f-left {
      float: left;
      a {
        float: left;
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        margin: 6px 0 0 10px;
        &:hover {
          text-decoration: underline;
        }
      }
      .btn-play,
      .btn-collection {
        float: left;
        height: 22px;
        width: 22px;
        cursor: pointer;
        margin: 10px 0 0 10px;
      }
      .btn-play {
        clear: both;
        background: url("~@/assets/png/index.png") -267px -205px;
        &:hover {
          background-position: -267px -235px;
        }
      }
      .btn-collection {
        background: url("~@/assets/png/index.png") -300px -205px;
        &:hover {
          background-position: -300px -235px;
        }
      }
    }
  }

  // 榜单内容
  dd {
    ol {
      margin: 0 0 0 50px;
      li {
        height: 32px;
        .rank-num {
          float: left;
          width: 35px;
          height: 32px;
          margin: 0 0 0 -35px;
          text-align: center;
          line-height: 32px;
          color: #c10d0c;
          font-size: 16px;
        }
        .rank-name {
          display: block;
          line-height: 32px;
          font-size: 12px;
          color: #000;
          float: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          &:hover {
            text-decoration: underline;
          }
        }
        // 鼠标hover显示三个播放选项
        &:hover {
          .open {
            display: block;
          }
          .rank-name {
            width: 96px;
          }
        }
        .open {
          width: 82px;
          margin-top: 7px;
          float: right;
          display: none;
          .btn-play,
          .btn-add,
          .btn-collection {
            margin: 0 10px 0 0;
            display: block;
            float: left;
            height: 17px;
            width: 17px;
          }
          .btn-play {
            background: url("~@/assets/png/index.png") -267px -268px;
            &:hover {
              background-position: -267px -288px;
            }
          }
          .btn-add {
            margin: 2px 6px 0 0;
            background: url("~@/assets/png/icon.png") 0 -700px;
            &:hover {
              background-position: -22px -700px;
            }
          }
          .btn-collection {
            background: url("~@/assets/png/index.png") -297px -268px;
            &:hover {
              background-position: -297px -288px;
            }
          }
        }
      }
    }
    .see-all {
      height: 32px;
      line-height: 32px;
      font-size: 12px;
      float: right;
      margin: 0 30px 0 0;
      color: #000;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>