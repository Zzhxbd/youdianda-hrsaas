import request from '@/utils/request'

// 所有菜单
export const getMenuAllList =()=>{
    return request({
        method:'GET',
        url:`admin/sys_menu/allData`,
    })
}
// 添加菜单
export const addMenu =(data)=>{
    return request({
        method:'POST',
        url:`admin/sys_menu/add`,
        data
    })
}
// 删除菜单
export const delMenu =(params)=>{
    return request({
        method:'GET',
        url:`admin/sys_menu/del`,
        params
    })
}
// 菜单修改
export const editMenu =(data)=>{
    return request({
        method:'POST',
        url:`admin/sys_menu/update`,
        data
    })
}
// 菜单详情
export const getMenuInfo =(params)=>{
    return request({
        method:'GET',
        url:`admin/sys_menu/rowInfo`,
        params
    })
}