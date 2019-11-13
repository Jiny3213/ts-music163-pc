<template>
  <dl class="rank">
    <dt>
      <img :src="rankData.coverImgUrl" alt />
      <a href>{{rankData.rankTitle}}</a>
    </dt>

    <dd>
      <ol>
        <li v-for="(item, index) in rankData.rankArray" :key="index">
          <div class="rank-num">{{index + 1}}</div>
          <a href>{{item.name}}</a>
          <div class="open">
            <a href title="播放"></a>
            <a href title="添加到播放列表"></a>
            <a href title="收藏"></a>
          </div>
        </li>
      </ol>
      <a href>查看全部</a>
    </dd>
  </dl>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

// 榜单接口
interface rankObj {
  rankArray: any[],
  coverImgUrl: string,
  rankTitle: string
}

@Component
export default class Rank extends Vue {
  @Prop(Object) readonly rankData: rankObj | undefined;
}
</script>

<style lang="scss" scoped>
.rank{
  dt{
    width: 230px;
    height: 120px;
    padding: 
    img{
      height: 80px;
      width: 80px;
    }
  }
}
</style>