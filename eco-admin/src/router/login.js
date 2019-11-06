/*登录组件的路由*/

import Login from "@/view/login";

export default [
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录页面',
            keepAlive: true
        }

    }
]