/*home路由*/

import Home from '@/view/home'

export default [
    {
        path: '/home',
        name: Home,
        component: Home,
        meta: {
            title: '主页',
            keepAlive: true
        }
    }
]