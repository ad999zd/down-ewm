import Vue from 'vue'
import './assets/reset.css';
import routes from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
const protopost = axios.prototype.constructor.post;
axios.prototype.constructor.post = function(url, data, ...args) {
    // console.log(test);
    if (window.location.protocol === 'file:') {
        console.log('file mode');
        return protopost(url, data, {
            baseURL: 'http://localhost'
        });
    } else {
        console.log('online mode');
        return protopost(url, data, ...args);
    }
}

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
const router = new VueRouter({
  routes       	 // （缩写）相当于 routes: routes
})
const app = new Vue({router})
app.$mount('#app')
