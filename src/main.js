// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue';
import ckeditor4 from "./components/ckeditor4";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Aside from "./components/aside";
import Header from "./components/header"
import MyMuban from "./components/myMuban"
import Fabu from "./components/Fabu";
import Recently from "./components/Recently";
import Yitou from "./components/Yitou";
import WeiTou from "./components/WeiTou";
import MyFabu from "./components/MyFabu";

Vue.use(ElementUI);
Vue.use( CKEditor );
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
    "ckeditor4":ckeditor4,
    "Aside":Aside,
    "Header":Header,
    "MyMuban":MyMuban,
    "Fabu":Fabu,
    "Recently":Recently,
    "Yitou":Yitou,
    "WeiTou":WeiTou,
    "MyFabu":MyFabu,
  },
  template: '<App/>'
})
