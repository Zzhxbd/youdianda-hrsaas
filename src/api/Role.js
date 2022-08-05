import request from '@/utils/request'
// 角色列表-全部
export const getRoleAllList =()=>{
    return request({
        method:'GET',
        url:`admin/sys_role/allData`,
    })
}
//角色列表-分页
export const getRoleList =(params)=>{
    return request({
        method:'GET',
        url:`admin/sys_role/list`,
        params
    })
}
//角色删除
export const delRole =(params)=>{
    return request({
        method:'GET',
        url:`admin/sys_role/del`,
        params
    })
}
//添加角色
export const addRole =(data)=>{
    return request({
        method:'POST',
        url:`admin/sys_role/add`,
        data
    })
}
// 获取角色详情
export const getRoleInfo =(params)=>{
    return request({
        method:'GET',
        url:`admin/sys_role/rowInfo`,
        params
    })
}
// 角色修改
export const editRole =(data)=>{
    return request({
        method:'POST',
        url:`admin/sys_role/update`,
        data
    })
}