import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from "../components/index";
import myMuban from "../components/myMuban";


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/my',
      name: 'myMuban',
      component: myMuban
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})
