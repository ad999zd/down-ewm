import Vue from 'vue'
import Router from 'vue-router'
import FramePage from '../views/FramePage.vue'
import putIn from '../views/putIn/putInPage.vue'

Vue.use(Router)

export default  [
    {
      path: '/', component: FramePage, redirect:'/index',
      children:[
          {path: '/index', component: putIn},
      ]
    },
]
