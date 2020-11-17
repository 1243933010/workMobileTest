import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import api from './util/api.js'
import {$Get,$Post,$Toast,$login} from './util/request.js'

Vue.prototype.baseUrl = 'http://192.168.0.117:3000/';
Vue.prototype.api = api.api;

Vue.prototype.$Get = $Get;
Vue.prototype.$Post = $Post;
Vue.prototype.$Toast = $Toast;
Vue.prototype.$login = $login;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
