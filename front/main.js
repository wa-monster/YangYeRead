import Vue from 'vue'
import App from './App'
import {xhr} from './util/request.js'
	
Vue.config.productionTip = false
// Vue.prototype.$baseUrl='http://localhost:3000/api'
Vue.prototype.$baseUrl='http://www.yangduoduo.xyz/api'
App.mpType = 'app'
Vue.prototype.$xhr = xhr
const app = new Vue({
    ...App
})
app.$mount()
