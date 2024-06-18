
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'

// import store from './stores/index.js'
import api from './api/index.js'

import {createPinia} from 'pinia'
// 创建 Pinia 实例
const pinia = createPinia()

export function createApp() {
	const app = createSSRApp(App);
	// 挂载到 Vue 根实例
	app.use(pinia)
	app.use(api);
	app.config.globalProperties.$api = api;
	return {
		app,
	};
}
// #endif