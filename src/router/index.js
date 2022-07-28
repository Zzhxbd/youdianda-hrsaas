import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/views/layout'
Vue.use(VueRouter)
import SystemRoute from './modules/system'
import ContentRoute from './modules/content'
import UserRoute from './modules/user'
import AdvRoute from './modules/adv'
//静态路由
const constRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        meta: {
            title: '优点达'
        },
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard'),
                meta: {
                    title: '欢迎你'
                },
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/404',
        component: () => import('@/views/notfound'),
        meta: {
            title: '页面不存在'
        }
    },
    {
        path: '/*',
        redirect: '/404',
    }
]
//动态的路由(业务路由)
const asyncRoutes = [SystemRoute, ContentRoute, UserRoute, AdvRoute]
const router = new VueRouter({
    routes: [...asyncRoutes, ...constRoutes]
})

export default router
