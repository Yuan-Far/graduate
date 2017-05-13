import * as types from '../mutation-type.js'
const state = {
    'menuShow': false
}
const mutations = {
    [types.UPDATE_MENUSHOW](state) {
        state.menuShow = !state.menuShow;
    }
}
export default {
    state,
    mutations
}
