<template>
  <div id="app">
    <index-header />
    <router-view />
    <index-footer />
    <media-player/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IndexHeader from "@/components/IndexHeader.vue";
import IndexFooter from "@/components/IndexFooter.vue";
import MediaPlayer from "@/components/MediaPlayer.vue";

@Component({
  components: {
    IndexHeader,
    IndexFooter,
    MediaPlayer
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
// 引入全局预处理scss
@import url('~@/assets/css/normal.scss');
#app {
  min-width: 1135px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
