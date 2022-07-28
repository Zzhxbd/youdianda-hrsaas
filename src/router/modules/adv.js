import Layout from "@/views/layout"
export default {
    path: '/adv',
    component: Layout,
    redirect: '/adv_pos',
    meta: {
        title: '广告管理'
    },
    children: [
        {
            path: '/adv_pos',
            component: () => import('@/views/adv/pos'),
            meta: {
                title: '广告位管理'
            }
        },
        {
            path: '/adv_img',
            component: () => import('@/views/adv/img'),
            meta: {
                title: '广告图管理'
            }
        },
        {
            path: '/adv_link',
            component: () => import('@/views/adv/link'),
            meta: {
                title: '友情链接管理'
            }
        }
    ]
}