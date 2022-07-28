import request from '@/utils/request'
// 文章列表-分页
export const getArticleList =(params)=>{
    return request({
        method:'GET',
        url:`admin/ydd_article/list`,
        params
    })
}
//文章删除
export const delArticle =(params)=>{
    return request({
        method:'GET',
        url:`admin/ydd_article/del`,
        params
    })
}