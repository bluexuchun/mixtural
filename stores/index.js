import Vue from 'mpVue'
import Vuex from 'vuex'
import app from './app'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        app
    }
})