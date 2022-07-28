import request from '@/utils/request'
//分类列表-全部
export const getCateAllList =()=>{
    return request({
        method:'GET',
        url:`admin/ydd_cate/all`,
    })
}
// 分类列表-分页
export const getCateList =(params)=>{
    return request({
        method:'GET',
        url:`admin/ydd_cate/list`,
        params
    })
}
// 分类详情
export const getCateInfo =(params)=>{
    return request({
        method:'GET',
        url:`admin/ydd_cate/rowInfo`,
        params
    })
}
//分类添加
export const addCates =(data)=>{
    return request({
        method:'POST',
        url:`admin/ydd_cate/add`,
        data
    })
}
// 分类修改
export const editCates =(data)=>{
    return request({
        method:'POST',
        url:`admin/ydd_cate/update`,
        data
    })
}
// 分类删除
export const delCates =(params)=>{
    return request({
        method:'GET',
        url:`admin/ydd_cate/del`,
        params
    })
}