import Vue from 'vue'
import Vuex from 'vuex'
import member from './modules/member'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    member
  }
})

export default store
