import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import App from './App.vue'
import store from './vuex'
import iView from 'iView'
import VueSimplemde from 'vue-simplemde'

import './assets/css/font-awesome.css'
import './assets/css/reset.css'
import './assets/css/common.css'
import 'iview/dist/styles/iview.css';

import routes from './routers/routers'

Vue.use(VueRouter)
Vue.use(iView)
Vue.use(VueSimplemde)
Vue.prototype.$http = Axios


Vue.config.productionTip = false


const router = new VueRouter({
    routes
})
/*router.beforeEach((to, from, next)=>{
	const token = sessionStorage.getItem('Yuan-Token')
	if(to.path === '/login'){
		if(token !== null && token !== 'null' && token !== 'undefined'){
			next('/about')
		}else {
			next()
		}
	}else if(to.path === '/reg') {
		next()
	}else {
		if(token !== null && token !== 'null' && token !== 'undefined') {
			next()
		}else{
			next('/login')
		}
	}
})*/
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})