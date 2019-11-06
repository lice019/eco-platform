/*入口文件*/

import Vue from 'vue'
import App from './App'
import router from './router' //引入路由文件


new Vue({
    el: '#App',
    router,
    template: '<App/>',
    components: {App}

});