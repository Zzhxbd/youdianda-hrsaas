import request from '@/utils/request'
//用户列表-分页
export const getUserList =(params)=>{
    return request({
        method:'GET',
        url:`admin/sys_user/list`,
        params
    })
}
// 管理员修改
export const editUser =(data)=>{
    return request({
        method:'POST',
        url:`admin/sys_user/update`,
        data
    })
}
//管理员删除
export const deltUser =(params)=>{
    return request({
        method:'GET',
        url:`admin/sys_user/del`,
        params
    })
}
//管理员添加
export const addtUser =(data)=>{
    return request({
        method:'POST',
        url:`admin/sys_user/add`,
        data
    })
}
//管理员详情
export const getUserInfo =(params)=>{
    return request({
        method:'GET',
        url:`admin/sys_user/rowInfo`,
        params
    })
}