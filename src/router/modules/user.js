import Layout from "@/views/layout"
export default {
    path: '/user',
    component: Layout,
    redirect: '/user_user',
    meta: {
        title: '会员管理'
    },
    children: [
        {
            path: '/user_user',
            component: () => import('@/views/user/user'),
            meta: {
                title: '用户管理'
            }
        }
    ]
}