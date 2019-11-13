<template>
  <div class="header">
    <div class="header-main">
      <a href class="logo"></a>

      <!-- 主要导航区域 -->
      <ul class="main-nav">
        <li v-for="(item, index) in mainNav" :key="index">
          <a href @click.prevent="clickMainNav(index)">{{item}}</a>

          <!-- 红色小三角 -->
          <div class="triangle" v-show="currentMainNavIndex == index"></div>
        </li>
      </ul>

      <div class="hot"></div>

      <a href class="login">登录</a>
      <div class="creater-center">创作者中心</div>
      <div class="search">
        <input type="text" placeholder="音乐/视频/电台/用户" />
      </div>
    </div>

    <!-- 不显示红色导航区域时，显示5px红色条 -->
    <div class="red-bar" v-show="currentMainNavIndex !== 0"></div>

    <!-- 红色导航区域 -->
    <div class="red-nav" v-show="currentMainNavIndex === 0">
      <ul>
        <li v-for="(item, index) in redNav" :key="index" @click.prevent="clickRedNav(index)">
          <a href>
            <span
            :class="{'red-nav-active': currentRedNavIndex === index}">
            {{item}}</span>
            <img
            src="~@/assets/png/white-r-icon@3x.png" 
            class="circular-r" 
            v-show="index === 2"/>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class IndexHeader extends Vue {
  @Prop() private msg!: string;
  mainNav: string[] = [
    "发现音乐",
    "我的音乐",
    "朋友",
    "商城",
    "音乐人",
    "下载客户端"
  ];
  redNav: string[] = ["推荐", "排行榜", "歌单", "主播电台", "歌手", "新碟上架"];
  currentMainNavIndex: number = 0;
  currentRedNavIndex: number = 0;
  // 点击主要导航栏，显示/隐藏红色导航条
  clickMainNav(index: number): void {
    this.currentMainNavIndex = index;
  }
  // 点击红色导航栏
  clickRedNav(index: number): void {
    this.currentRedNavIndex = index;
  }
}
</script>

<style lang="scss" scoped>
a:visited {
  color: #ffffff;
}

// 组件
.header {
  width: 100%;
  background: #242424;
}

// 主要区域
.header-main {
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  height: 70px;
  width: 1100px;
  margin: 0 auto;
}

// 首页logo
.logo {
  display: block;
  float: left;
  border-right: 20px;
  height: 70px;
  width: 177px;
  background: url("~@/assets/png/topbar.png");
}

// 主要导航条
.main-nav {
  li {
    position: relative;
    float: left;
    &:hover {
      background: #000000;
    }
    a {
      display: block;
      padding: 0 19px;
      font: 14px/70px Arial, Helvetica, sans-serif;
      color: #ffffff;
    }
    // 红色小三角
    .triangle {
      width: 12px;
      height: 6px;
      margin: 0 auto;
      margin-top: -6px;
      background: url("~@/assets/png/topbar.png") -226px 0 no-repeat;
    }
  }
}
// 下载客户端右侧标记
.hot {
  display: inline-block;
  width: 28px;
  height: 19px;
  margin: 20px 0 0 -5px;
  background: url("~@/assets/png/topbar.png") -192px 0;
  // 防挡
  position: relative;
}
.login,
.creater-center,
.search {
  float: right;
  font: 12px Arial, Helvetica, sans-serif;
}
// 登录
.login {
  color: #787878;
  margin: 26px 22px 0 20px;
  &:visited {
    color: #787878;
  }
  &:hover {
    text-decoration: underline;
  }
}
// 创作者中心
.creater-center {
  color: #cccccc;
  width: 72px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #4f4f4f;
  margin: 19px 0 0 12px;
  padding: 0 0 0 16px;
  border-radius: 16px;
  cursor: pointer;
  &:hover {
    color: lighten(#cccccc, 30%);
    border-color: lighten(#4f4f4f, 30%);
  }
}
// 搜索栏
.search {
  width: 158px;
  height: 32px;
  background: #ffffff;
  border-radius: 16px;
  margin: 19px 0 0 0;
  input {
    border: none;
    background: none;
    outline: none;
    line-height: 32px;
    float: left;
    width: 110px;
  }
  &::before {
    content: "";
    display: block;
    float: left;
    margin: 9px 10px 0 10px;
    width: 13px;
    height: 14px;
    background: url("~@/assets/png/topbar.png") -10px -108px no-repeat;
  }
}
// 红色条
.red-bar {
  background: #c20c0c;
  width: 100%;
  height: 5px;
}
// 红色导航条
.red-nav {
  background: #c20c0c;
  width: 100%;
  height: 34px;
  ul {
    width: 1100px;
    margin: 0 auto;
    li {
      float: left;
      display: block;
      a {
        padding: 0 20px;
        font: 12px/34px Arial, Helvetica, sans-serif;
        color: #ffffff;
        position: relative;
        span {
          padding: 3px 13px;
          border-radius: 10px;
        }
        .circular-r{
           position: absolute;
           left: 58px;
           top: 0px;
           height: 8px;
           width: 8px;
        }
      }
      &:hover{
         a span{
            background: #9b0909;
         }
      }
      &:first-child {
        margin-left: 177px;
      }
    }
    &:after {
      content: "";
      display: block;
      clear: both;
    }
  }
}
// 当点击红色导航栏
.red-nav-active {
  background: #9b0909;
}
</style>

