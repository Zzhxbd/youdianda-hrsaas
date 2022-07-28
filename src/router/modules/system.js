import Layout from "@/views/layout"
export default {
    path: '/system',
    component: Layout,
    redirect: '/system_menu',
    meta: {
        title: '系统设置'
    },
    children: [
        {
            path: '/system_menu',
            component: () => import('@/views/system/menu'),
            meta: {
                title: '菜单管理'
            }
        },
        {
            path: '/system_role',
            component: () => import('@/views/system/role'),
            meta: {
                title: '角色管理'
            }
        },
        {
            path: '/system_user',
            component: () => import('@/views/system/user'),
            meta: {
                title: '用户管理'
            }
        },
        {
            path: '/system_config',
            component: () => import('@/views/system/config'),
            meta: {
                title: '系统配置'
            }
        },
    ]
}