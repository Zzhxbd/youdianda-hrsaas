import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'
import setting from './modules/setting'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {},
    mutations: {},
    getters: {},
    actions: {},
    modules: {
        user,
        setting
    }
})
export default store