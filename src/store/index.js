import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Authentication: '',
    CurrentUser: '',
    count: 0,
    Emergency: 3
  },
  mutations: {
    CheckAuth(state, status) {
      state.Authentication = status
    },
    countplus(state) {
      state.count++
    },
    countrest(state) {
      state.count = 0
    },
  },
  getters: {
    Auth: state => {
      return state.Authentication
    },
    Emergency: state => {
      return state.Emergency
    },
  },
})
