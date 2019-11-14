<template>
  <div class="index-footer">
    <div class="copy">
      <p class="top">
        <a href>服务条款</a>
        <span>|</span>
        <a href>隐私策略</a>
        <span>|</span>
        <a href>儿童隐私策略</a>
        <span>|</span>
        <a href>版权投诉指引</a>
        <span>|</span>
        <a href>意见反馈</a>
        <span>|</span>
      </p>

      <p class="mid">
        <span>网易公司版权所有©1997-2019</span>
        <span>杭州乐读科技有限公司运营：</span>
        <a href>浙网文[2018]3506-263号</a>
      </p>

      <p class="bot">
        <span>项目地址：</span>
        <a
          href="https://github.com/Jiny3213/ts-music163-pc"
        >https://github.com/Jiny3213/ts-music163-pc</a>
        <span>联系邮箱：149757089@qq.com 梁家晋</span>
      </p>

      <ul class="icons">
        <li v-for="(item, index) in iconSpans" :key="index" class="icon">
          <a href></a>
          <p>{{item}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class IndexFooter extends Vue {
  iconSpans: string[] = [
    '用户认证',
    '独立音乐人',
    '赞赏',
    '视频奖励'
  ]
}
</script>

<style lang="scss" scoped>
.index-footer {
  width: 100%;
  height: 149px;
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;
}
.copy {
  width: 980px;
  height: 91px;
  margin: 15px auto 0;
  font-size: 12px;
  line-height: 24px;
  position: relative;
  .top {
    color: #999;
    a {
      color: inherit;
    }
    span {
      margin: 0 10px;
    }
  }
  .mid,
  .bot {
    color: #666;
    a {
      color: inherit;
    }
  }
  .mid {
    span:first-child {
      margin-right: 14px;
    }
  }
  .bot {
    a {
      margin-right: 14px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.icons {
  position: absolute;
  right: 0;
  top: 0;
  .icon {
    float: left;
    margin-left: 35px;
    width: 60px;
    height: 70px;
    a {
      display: block;
      margin: 0 auto;
      width: 44px;
      height: 44px;
    }
    p{
      color: #999;
      font-size: 12px;
      text-align: center;
    }
    &:nth-child(1) a{
      background: url("~@/assets/png/foot_enter_new.png") no-repeat -60px -100px;
      background-size: 104px 444px;
    }
    &:nth-child(2) a{
      background: url("~@/assets/png/foot_enter_new.png") no-repeat 0 0;
      background-size: 104px 444px;
    }
    &:nth-child(3) a{
      background: url("~@/assets/png/foot_enter_new.png") no-repeat -60px -50px;
      background-size: 104px 444px;
    }
    &:nth-child(4) a{
      background: url("~@/assets/png/foot_enter_new.png") no-repeat 0 -100px;
      background-size: 104px 444px;
    }
  }
}
</style>