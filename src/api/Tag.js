import request from '@/utils/request'
// 标签列表-全部
export const getTagList =()=>{
    return request({
        method:'GET',
        url:`admin/ydd_tag/all`
    })
}
// 标签列表-分页 
export const getTagPageList =(params)=>{
    return request({
        method:'GET',
        url:`admin/ydd_tag/list`,
        params
    })
}
// 标签详情
export const getTagInfo =(params)=>{
    return request({
        method:'GET',
        url:`admin/ydd_tag/rowInfo`,
        params //id
    })
}
// 标签添加
export const addTags =(data)=>{
    return request({
        method:'POST',
        url:`admin/ydd_tag/add`,
        data //tagname
    })
}
// 标签修改
export const editTags =(data)=>{
    return request({
        method:'POST',
        url:`admin/ydd_tag/update`,
        data //tagname id
    })
}
// 标签删除
export const delTags =(params)=>{
    return request({
        method:'GET',
        url:`admin/ydd_tag/del`,
        params // id
    })
}