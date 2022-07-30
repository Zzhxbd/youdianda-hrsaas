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
// 添加文章
export const addArticle =(data)=>{
    return request({
        method:'POST',
        url:`admin/ydd_article/add`,
        data
    })
}
// 文章详情
export const getArticleInfo =(params)=>{
    return request({
        method:'GET',
        url:'admin/ydd_article/rowInfo',
        params
    })
}
// 修噶文章
export const editArticle =(data)=>{
    return request({
        method:'POST',
        url:'admin/ydd_article/update',
        data
    })
}