<template>
  <div class="commend">
    <banner/>
    <div class="main">
      <main-left/>
      <main-right/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Banner from './childComp/Banner.vue'
import MainLeft from './childComp/MainLeft.vue'
import MainRight from './childComp/MainRight.vue'

console.log('todo: 所有的清除浮动，独立用外部global.scss引入')
console.log('todo: 每个模块都用组件封装')
console.log('todo: 所有的a标签加下划线在global中完成')


@Component({
  components: {
    Banner,
    MainLeft,
    MainRight
  },
})
export default class commend extends Vue{
  
}
</script>

<style lang="scss" scoped>
  .main{
    width: 983px;
    margin: 0 auto;
    .main-left,
    .main-right{
      float: left;
    }
    &::after{
      content: '';
      display: block;
      clear: both;
    }
  }
</style>