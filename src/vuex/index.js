import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu.js'
import * as types from './mutation-type.js'
Vue.use(Vuex);
const state = {
    'menuShow': false,
    'showClass': false,
    'categoryClass': true,
    'auth': false
}
const mutations = {
    [types.UPDATE_MENUSHOW](state) {
        state.menuShow = !state.menuShow;
    },
    [types.UPDATE_CLASSSHOW](state) {
        state.showClass = !state.showClass;
    },
    [types.UPDATE_CATEGORYSHOW](state) {
        state.categoryClass = !state.categoryClass;
    }
}
export default new Vuex.Store({
    state,
    mutations
})