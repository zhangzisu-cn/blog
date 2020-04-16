import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'ZhangZisu.CN Blog',
    bg: ['https://cdn.buttercms.com/tm5ujWhTvKd03tIJycfE']
  },
  mutations: {
    'title:update' (state, title: string) {
      document.title = title + ' - ZhangZisu.CN Blog'
      state.title = title
    },
    'bg:push' (state, url: string) {
      state.bg.push(url)
    },
    'bg:pop' (state) {
      state.bg.pop()
    }
  },
  actions: {
  },
  modules: {
  }
})
