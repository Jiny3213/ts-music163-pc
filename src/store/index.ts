import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)



export interface State {
  songs: number[]
  currentSong: number
}

const state: State = {
  songs: [1, 2, 3],
  currentSong: 1
}

export default new Vuex.Store({
  state: state
})