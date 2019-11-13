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
    width: 984px;
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