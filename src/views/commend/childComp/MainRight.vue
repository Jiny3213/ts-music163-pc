<template>
  <div class="main-right">
    <div class="login">
      <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <a href class="btn-login">用户登录</a>
    </div>
    <!-- 入驻歌手 -->
    <div class="singer">
      <div class="title-bar-min">
        <span>入驻歌手</span>
        <a href>查看全部></a>
      </div>

      <ul class="content">
        <li v-for="(item, index) in singers" :key="index">
          <a href>
            <img :src="item.img1v1Url" alt />
            <div class="info">
              <h4>{{item.name}}</h4>
              <p>最新入驻歌手</p>
            </div>
          </a>
        </li>
      </ul>
      <div class="be-singer">
        <a href class="btn-be-singer">
          <span>申请成为网易音乐人</span>
        </a>
      </div>
    </div>

    <!-- 热门主播 -->
    <div class="hot-dj">
      <div class="title-bar-min">
        <span>热门主播</span>
      </div>

      <ul class="content">
        <li v-for="(item, index) in hotDj" :key="index">
          <a href>
            <img :src="item.avatarUrl" alt />
          </a>
          <div class="info">
            <a href>
              <h4>{{item.nickName}}</h4>
            </a>
            <p>热门的主播</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MainRight extends Vue {
  singers: any[] = [];
  hotDj: any[] = [];
  created() {
    // 获取入驻歌手
    this.$axios
      .request({
        url: "/artist/list",
        params: {
          limit: 5,
          cat: 5001
        }
      })
      .then(res => {
        this.singers = res.data.artists;
      });

    // 获取热门主播
    this.$axios
      .request({
        url: "/dj/toplist/popular",
        params: {
          limit: 5
        }
      })
      .then(res => {
        this.hotDj = res.data.data.list;
        console.log(this.hotDj);
      });
  }
}
</script>

<style lang="scss" scoped>
.main-right {
  width: 250px;
  height: 1425px;
  border-right: 1px solid #d3d3d3;
}
.login {
  width: 250px;
  height: 125px;
  background: url("~@/assets/png/index.png");
  p {
    width: 205px;
    margin: 0 auto;
    padding: 16px 0;
    line-height: 22px;
    color: #666;
    font-size: 12px;
  }
  .btn-login {
    display: block;
    width: 100px;
    height: 31px;
    background: url("~@/assets/png/index.png") 0 -195px;
    margin: 0 auto;
    color: #fff;
    text-shadow: 0 1px 0 #8a060b;
    text-align: center;
    line-height: 31px;
    font-size: 12px;
    &:hover {
      background-position: -110px -195px;
    }
  }
}
// 共享的样式
.title-bar-min {
  height: 23px;
  margin: 0 20px;
  border-bottom: 1px solid #ccc;
  font-size: 12px;
  span {
    float: left;
    color: #333;
    font-weight: bold;
  }
  a {
    float: right;
    color: #666;
    &:hover {
      text-decoration: underline;
    }
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
}

// 入驻歌手
.singer {
  margin-top: 15px;
  .content {
    width: 230px;
    height: 380px;
    margin: 6px 0 14px 20px;
    &::before {
      content: "";
      display: table;
    }
    li {
      margin-top: 14px;
      a {
        background: #fafafa;
        display: block;
        width: 211px;
        &:hover {
          background: #f4f4f4;
        }
        &::after {
          content: "";
          display: block;
          clear: both;
        }
        img,
        .info {
          float: left;
        }
        img {
          height: 62px;
          width: 62px;
        }
        .info {
          padding-left: 14px;
          height: 60px;
          width: 133px;
          border: 1px solid #e9e9e9;
          h4 {
            margin-top: 8px;
            color: #333;
            font-size: 14px;
          }
          p {
            margin-top: 8px;
            color: #666;
            font-size: 12px;
          }
        }
      }
    }
  }
  // 成为入驻歌手
  .be-singer {
    height: 31px;
    width: 250px;
    .btn-be-singer {
      display: block;
      margin-left: 20px;
      padding-right: 5px;
      width: 205px;
      height: 31px;
      border-radius: 4px;
      background: url("~@/assets/png/button2.png") right -100px;
      &:hover {
        background: url("~@/assets/png/button2.png") right -182px;
        span {
          background: url("~@/assets/png/button2.png") 0 -141px;
        }
      }
      span {
        display: block;
        width: 170;
        height: 31px;
        line-height: 31px;
        text-align: center;
        background: url("~@/assets/png/button2.png") no-repeat 0 -59px;
        color: #333;
        font-size: 12px;
        font-weight: bold;
      }
    }
  }
}

// 热门主播
.hot-dj {
  margin: 30px 0 0 0;
  .content {
    margin: 20px 0 0 20px;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    li {
      height: 50px;
      img {
        height: 40px;
        width: 40px;
        float: left;
      }
      .info {
        float: left;
        margin: 0 0 0 10px;
        font-size: 12px;
        line-height: 21px;
        a{
          color: #000;
          &:hover{
            text-decoration: underline;
          }
        }
        p{
          color: #666;
        }
      }
      &::after {
      content: "";
      display: block;
      clear: both;
    }
    }
  }
}
</style>