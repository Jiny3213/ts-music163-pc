<template>
  <div id="app">
    <index-header></index-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IndexHeader from './components/IndexHeader.vue';

@Component({
  components: {
    IndexHeader
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
  a{
    text-decoration: none;
    
  }
  li{
    list-style-type: none;
  }
}
#app {
  min-width: 1135px;
}
</style>
