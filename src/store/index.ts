import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)



export interface State {
  songs: string[]
  currentSong: number
  songsArray: number[]
}

const state: State = {
  songs: ['真的爱你', '海阔天空', '新宝岛'],
  currentSong: 0,
  songsArray: []
}

const getters = {
  getCurrentSong(state: State): number {
    return state.currentSong
  }
}

const mutations = {
  // 添加歌曲到播放列表，同时将这首歌曲设置为currentSong
  addSong(state:State, songData: any): void {
    // 暂时不实现歌单功能
    // state.songsArray.push(songData)
    state.currentSong = songData
  }
}

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations
})