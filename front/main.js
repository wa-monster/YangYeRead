import Vue from 'vue'
import App from './App'
import {xhr} from './util/request.js'
	
Vue.config.productionTip = false
console.log(xhr)
window.baseUrl='http://localhost:3000/api',
App.mpType = 'app'
window.xhr = xhr
const app = new Vue({
    ...App
})
app.$mount()
