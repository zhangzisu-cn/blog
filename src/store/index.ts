import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'ZhangZisu.CN Blog'
  },
  mutations: {
    updateTitle (state, title: string) {
      document.title = title
      state.title = title
    }
  },
  actions: {
  },
  modules: {
  }
})
