import request from '@/utils/request'
export const loginApi = (data)=>{
    return request({
        method:'POST',
        url:`admin/index/login`,
        data
    })
}
//获取用户资料
export const getUserProfileApi =()=>{
    return request({
        method:'POST',
        url:`admin/index/profile`
    })
}
// 上传接口
export const update = (data) => {
    return request({
      method: 'POST',
      url: 'admin/common/upload?type=images',
      data
    })
  }