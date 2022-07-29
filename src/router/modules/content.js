import Layout from "@/views/layout"
export default {
    path: '/content',
    component: Layout,
    redirect: '/content_cate',
    meta: {
        title: '内容管理'
    },
    children: [
        {
            path: '/content_cate',
            component: () => import('@/views/content/cate'),
            meta: {
                title: '分类管理'
            }
        },
        {
            path: '/content_tag',
            component: () => import('@/views/content/tag'),
            meta: {
                title: '标签管理'
            }
        },
        {
            path: '/content_article',
            component: () => import('@/views/content/article'),
            meta: {
                title: '文章管理'
            },
            children:[
                {
                    path:'add',
                    component:()=>import('@/views/content/article/addArticle'),
                    meta: {
                        title: '添加文章'
                    },
                }
            ]
        }
    ]
}