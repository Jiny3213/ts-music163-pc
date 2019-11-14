<template>
  <div id="app">
    <index-header/>
    <router-view/>
    <index-footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IndexHeader from '@/components/IndexHeader.vue';
import IndexFooter from '@/components/IndexFooter.vue'

@Component({
  components: {
    IndexHeader,
    IndexFooter
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
  font-family: Arial, Helvetica, sans-serif;
}
</style>
