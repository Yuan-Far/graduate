import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu.js'
import * as types from './mutation-type.js'
Vue.use(Vuex);
const state = {
    'menuShow': false,
    'showClass': false,
    'auth': false
}
const mutations = {
    [types.UPDATE_MENUSHOW](state) {
        state.menuShow = !state.menuShow;
    },
    [types.UPDATE_CLASSSHOW](state) {
        state.showClass = !state.showClass;
    }
}
export default new Vuex.Store({
    state,
    mutations
})