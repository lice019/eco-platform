/*路由入口文件*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './router/login'
import home from './router/home'

//挂载路由
Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        //一个组件和路由是一个对象
        ...login,
        ...home

    ],
    mode: 'history'
});

