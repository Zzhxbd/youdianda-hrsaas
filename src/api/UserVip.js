import request from '@/utils/request'

// 用户列表
export const getUserList =(params)=>{
    return request({
        method:'GET',
        url:`admin/ydd_user/list`,
        params
    })
}
// 用户添加
export const addUsers =(data)=>{
    return request({
        method:'POST',
        url:`admin/ydd_user/add`,
        data
    })
}
// 用户修改
export const editUsers =(data)=>{
    return request({
        method:'POST',
        url:`admin/ydd_user/update`,
        data
    })
}
//用户详情
export const getUsersInfo =(params)=>{
    return request({
        method:'GET',
        url:`admin/ydd_user/rowInfo`,
        params
    })
}
// 用户删除
export const delUser =(params)=>{
    return request({
        method:'GET',
        url:`admin/ydd_user/del`,
        params
    })
}