<template>
  <div class="title-bar">
    <a href>热门推荐</a>
    <div class="tab">
      <slot></slot>
    </div>
    <div class="more">
      <a href>更多</a>
      <div class="more-bg"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class TitleBar extends Vue {
  @Prop(String) readonly title:
}
</script>

<style lang="scss" scoped>
.title-bar {
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
</style>